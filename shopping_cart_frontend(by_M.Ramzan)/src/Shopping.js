import './App.css';
import productsData from "./data"
import { useDispatch } from 'react-redux';
import { add_product } from './reduxToolkit/slices';
import { price_Quantity } from './reduxToolkit/slices';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';



function Shopping() {
  let {cart,totalQuantity} = useSelector(state=>state.products)

  let dispatch = useDispatch()
  
  useEffect(()=>{
  dispatch(price_Quantity())
  },[cart])


  return (
    <>
    <Link to={"/cart"}>
    <h1>Cart ({totalQuantity}) </h1>
    </Link>
   
    <hr/>
    <div className='App'>
    <div className="container">
        <h1>All Product Info</h1>
        <div className="row">    
    {
      productsData.map(val=>{
        return(
          <>
              <div className="col-lg-4 p-2" key={val}>
                <div className="card p-3" style={{ width: '18rem' }}>
                    <img src={`http://localhost:8000/src/uploads/${val.imagePath}`} className="card-img-top" alt="Loading Error"/>
                    <div className="card-body">
                        <h5 className="card-title">{val.id}</h5>
                        <p className="card-text">{val.price}</p>
                        <p className="card-text">{val.email}</p>
                        <p className="card-text">{val.body}</p>

                        <div> 
                           <button className='bg-primary' onClick={()=>dispatch(add_product(val))} >AddCart</button>
                        </div>
                    </div>
                </div>
            </div>
    </>
   )
}
        )}
        </div>
        </div>
        </div>

    </>
  );
}

export default Shopping;
