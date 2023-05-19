import {createSlice} from '@reduxjs/toolkit'
import productsData from '../data'

let initialState = {
    cart:[],
    // items:productsData,
    totalQuantity:0,
    totalPrice:0,
}

let productSlice = createSlice({   // first slice
    name:"user",           //name of that slice
    // initialState:[],      //initial state of that slice
    initialState,
    reducers:{           //big reducers
      add_product(state,action){
        // state.push(action.payload)
        let find = state.cart.findIndex(item=>item.id===action.payload.id)
        // if (find !== -1) or
        if(find>=0)
        {
          state.cart[find].quantity+=1

        }else{
          // state.cart.push(action.payload)   //it will ahow the exact quantity coming from api
          let newItem = {
            ...action.payload,
            quantity: 1  // set quantity to 1 for new items
          };
          state.cart.push(newItem);
        }
        // localStorage.setItem('wishlist', JSON.stringify(state.cart))
        console.log(action.payload)
      },
      price_Quantity(state,action){
        let {totalQuantity,totalPrice} =state.cart.reduce((total,item)=>{
          console.log("cartTotal",total)
          console.log("cartItme",item)
          let {price,quantity} = item
          console.log(price,quantity)
          let updateditemtotal = price*quantity
          total.totalPrice += updateditemtotal
          total.totalQuantity += quantity
          return total
 
        },{
          totalPrice : 0 ,
          totalQuantity : 0
        }
        )
        state.totalPrice = parseInt(totalPrice.toFixed(2))
        state.totalQuantity = totalQuantity
      },
      increase_Quantity(state, action) {
        const productId = action.payload;
        const product = productsData.find(item => item.id === productId);
        const maxQuantity = product.quantity;
      
        state.cart = state.cart.map(item => {
          if (item.id === productId) {
            let newQuantity = item.quantity + 1;
            if (newQuantity > maxQuantity) {
              newQuantity = maxQuantity;
            }else if(newQuantity === maxQuantity){
              alert(`There Availabel Stocke Of the product is ${maxQuantity}`)
            }
            if (item.quantity < maxQuantity) {
              return {...item, quantity: newQuantity};
            } else {
              return item;
            }
          } else {
            return item;
          }
        });
      },
    
      decrease_Quantity(state,action){
        state.cart = state.cart.map(item=>{
          if(item.quantity>1 ){
            if(item.id===action.payload){
            return {...item,quantity:item.quantity-1}
            }
            return item
          }
          else{
            return item
          }
        })
      },
      remove_product(state,action){
       
      if(action.payload>-1){
        state.cart.splice(action.payload,1)  //here still we are using index system but not the product id to do it with product id search the answere
      }
      },
      empty_product(state,action){
        // return state = []      //first Method
       state.cart = []                //Second Method
      },
      set_quantity(state, action) {
        const { productId, quantity } = action.payload;
        const product = productsData.find(item => item.id === productId);
        const maxQuantity = product.quantity;
      
        if (quantity < 1) {
          alert('Quantity should be at least 1.');
          return;
        }
      
        let newQuantity = quantity;
        if (newQuantity === maxQuantity) {
          alert(`There are only ${maxQuantity} available for this product.`);
        }
        else if (newQuantity > maxQuantity) {
          alert(`There are only ${maxQuantity} available for this product.`);
          newQuantity = maxQuantity;
        } 
      
        state.cart = state.cart.map(item => {
          if (item.id === productId) {
            return { ...item, quantity: newQuantity };
          } else {
            return item;
          }
        });
      }      
       
    }
})

export default productSlice.reducer


export let {add_product} = productSlice.actions
export let {price_Quantity} = productSlice.actions
export let {increase_Quantity} = productSlice.actions
export let {decrease_Quantity} = productSlice.actions
export let {remove_product} = productSlice.actions
export let {empty_product} = productSlice.actions
export let {set_quantity} = productSlice.actions

