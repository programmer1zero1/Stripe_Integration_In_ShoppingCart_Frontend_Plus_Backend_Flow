import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { remove_product } from './reduxToolkit/slices';
import { empty_product } from './reduxToolkit/slices';
import { price_Quantity } from './reduxToolkit/slices';
import { increase_Quantity } from './reduxToolkit/slices';
import { decrease_Quantity } from './reduxToolkit/slices';
import { set_quantity } from './reduxToolkit/slices';
import productsData from './data'
import axios from "axios"


const Cart= () => {  
  let {cart,totalQuantity,totalPrice} = useSelector(state=>state.products)
  let dispatch = useDispatch()
  dispatch(price_Quantity())

  let [inputQuantity,setInputQuantity] = useState({});
  
  const handleInputChange = (productId, quantity) => {
    if (inputQuantity < 1) {
      inputQuantity = 1; // set quantity to 1 if it is less than 1
    }
    setInputQuantity(prevState => ({
      ...prevState, // copy previous state
      [productId]: quantity // update quantity for product with matching ID
    }));
  }


  const handleInputBlur = (productId) => {
    setInputQuantity((prevState) => ({
      ...prevState,
      [productId]: cart.find((item) => item.id === productId).quantity,
    }));
  };


console.log("input",inputQuantity)


// const publishableKey = 'YOUR_STRIPE_PUBLISHABLE_KEY';
let ceckout = async() =>{
  try{
  console.log(cart)
   let res = await axios.post(`http://localhost:3200/user/buyBook`,{
      headers: {
       "Content-type": "multipart/form-data charset=UTF-8",
      },
      data: cart
    })
    let result = res.data.sessionUrl
    if(result){
      // const stripe = window.Stripe(publishableKey);   //these two lines used to do payment management on client server
      //   stripe.redirectToCheckout({ sessionId: result });
      window.location.href=result   //doing payment on stripe server
    }
  }catch(error){
    res.json({msg:error.message})
  }
}

return (
  <>
  <center>
  <h1>Cart items {cart.length}</h1>
  <div class="container">
  { cart.length>0 ?
  
  <table class="table table-sm  table-borderless table-hover table-striped table-dark">
<thead>
  <tr>
    <th scope="col">No</th>
    <th scope="col">Name</th>
    <th scope="col">Email</th>
    <th scope="col">Body</th>
    <th scope="col">Price</th>
    <th scope="col">Quantity</th>
    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
{
  cart.map((val,index)=>{
    const inputquantity = inputQuantity[val.id] ?? val.quantity; // use the quantity from state, or the default value from cart
    return(
      <>
      <tr>
    <th scope="row" key={index}>{index+1}</th>
    <th scope="row">{val.email}</th>
     <td><img src={`http://localhost:3200/uploads/${val.image}`}  className="card-img-top" height={170} width={140} alt="data.name" />
    </td>
    <td>{val.body}</td>
    <td>{val.price}</td>
    <td>
    <button type="submit" className="btn btn-success" onClick={() => {dispatch(increase_Quantity(val.id)); 
    const maxQuantity = productsData.find(item => item.id === val.id).quantity;
    if(inputQuantity[val.id] < maxQuantity){
    setInputQuantity((prevState) => ({...prevState, [val.id]: prevState[val.id] >= 1 ? prevState[val.id] + 1 : 1, }));
    }
    }}>
        +
    </button>
  <br></br>
  <label htmlFor="quantity">Quantity:</label>
  <input 
  id="quantity"
  name="quantity"
  type="number"
  min="1"
  placeholder="Enter quantity"
  value={inputquantity}
  className="form-control"
  onChange={(e) => handleInputChange(val.id, parseInt(e.target.value))}
  onBlur={() => handleInputBlur(val.id)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && inputQuantity[val.id]) {
    dispatch(set_quantity({ productId: val.id, quantity: inputQuantity[val.id] }));
    setInputQuantity([]);
    }
  }}
/>
  <button type="submit" className="btn btn-success" onClick={() => {dispatch(decrease_Quantity(val.id)); 
    const maxQuantity = productsData.find(item => item.id === val.id).quantity;
    if (inputQuantity[val.id] <= maxQuantity){
    setInputQuantity((prevState) => ({...prevState,    [val.id]: prevState[val.id] > 1 ? prevState[val.id] - 1 : 1, }));
    }
    }}>
        -
   </button>
    </td>
    <td><button type="submit" className="btn btn-success"  onClick={()=>dispatch(remove_product(index))}>Remove</button>
    </td>
  </tr>
      </>
    )
  })
}   

<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>total</td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>Quantity: </td>
  <td>
  {totalQuantity}  
  </td>
  <td>
  <button type="submit" className="btn btn-success"  onClick={()=>dispatch(empty_product())}>Empty Cart</button>
  </td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>RS: </td>
  <td>{totalPrice}</td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>
  <button type="submit" className="btn btn-success" onClick={ceckout}>Checkout</button>
  </td>
  <td></td>
</tr>
</tbody>
</table>
  :
  <h1>No Data to Show in Cart</h1>
  }
  </div>
  </center>
  </>
)
}

export default Cart