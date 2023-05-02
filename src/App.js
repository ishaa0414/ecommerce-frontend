
import './App.css';
import { createContext, useContext, useEffect, useState } from 'react';
const cartContext=createContext();
// const mobiles=[ 
//   {
//         "_id": "63e8f5b9918c8981a0097ea4",
//         "model": "OnePlus 9 5G",
//         "price": 45000,
//         "img": "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
//         "company": "Oneplus"
//     },
//     {
//         "_id": "63e8f5b9918c8981a0097ea5",
//         "model": "Iphone 13 mini",
//         "price": 150000,
//         "img": "https://shop.unicornstore.in/uploads/images/medium/9d6a85b55d277eb058f2a9c14de1ae84.png",
//         "company": "Apple"
//     },
//     {
//         "_id": "63e8f5b9918c8981a0097ea6",
//         "model": "Samsung s21 ultra",
//         "price": 85000,
//         "img": "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
//         "company": "Samsung"
//     },
//     {
//         "_id": "63e8f5b9918c8981a0097ea7",
//         "model": "Xiomi mi 11",
//         "price": 25000,
//         "img": "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
//         "company": "Xiomi"
//     }
// ];
const API='http://localhost:9090'
function App() {
const [mobiles,setMobiles]=useState([]);
const [cart,setCart]=useState([]);

useEffect(()=>{
fetch(`${API}/mobile`)
.then((data)=>data.json())
.then((mobiles)=>setMobiles(mobiles));
},[]);

useEffect(()=>{
  fetch(`${API}/cart`)
  .then((data)=>data.json())
  .then((cart)=>setCart(cart));
  },[]);

 const updateCart=({mobile,type})=>{
fetch(`${API}/cart?type=${type}`,{
  method:"PUT",
  body:JSON.stringify(mobile),
  headers:{
    "Content-Type":"application/json",
  },

}).then((data)=>data.json()).then((cart)=>setCart(cart));
 };
  return (
    <div className="App">
      <header className="App-header">
        <cartContext.Provider value={[mobiles,cart,updateCart]}>
        <PhoneList/>
        <CartList/>
        </cartContext.Provider>
      </header>
    </div>
  );
}
function PhoneList(){
  const [mobiles]=useContext(cartContext);
  return(
    <div className="phone-list-container">
      {mobiles.map((mobile)=>(<Phone mobile={mobile} key={mobile._id} />))}
      
    </div>
  );
  
}

function Phone({mobile}){
  const[ , ,  updateCart]=useContext(cartContext);

  return(
    <div className="phone-container">
    <img src={mobile.img} alt={mobile.model}className="phone-img"/>
    <h2 className="phone-model">{mobile.model} </h2>
    <p className="phone-price">{mobile.price}</p>
    <h4 className="phone-company">{mobile.company}</h4>
    <button className="phone-add-to-cart" onClick={()=>updateCart({mobile,type:"increment"})}>Add-to-cart</button>
    </div>
  );
}
function CartList(){
  const [, cart]=useContext(cartContext);
  useEffect(()=>{},[cart]);
  const total=cart.reduce((acc,mobile)=>acc=acc+(mobile.price*mobile.qty),0)
  return(
    <div className="cart-list-container">
        <h1>Shopping List</h1>
      {cart.map((mobile)=>(<CartItem mobile={mobile} key={mobile._id} />))}
      <h1>Total:{total}</h1>
      <button>Checkout</button>
    </div>
  );
}
function CartItem({mobile}){
const [ , , updateCart]=useContext(cartContext);

  return(
    <div className="cart-item-container">

      <div className="cart-img-container">
    <img src={mobile.img} alt={mobile.model}className="cart-item-img"/></div>
    <div className="cart-details">
    <h2 className="cart-item-model">{mobile.model} </h2>
    <p className="cart-item-price">{mobile.price}</p>
    <h4 className="cart-item-company">{mobile.company}</h4>
   <button onClick={()=>updateCart({mobile,type:"increment"})}>+</button>
   <p>{mobile.qty}</p>
   <button onClick={()=>updateCart({mobile,type:"decrement"})}>-</button></div>
    </div>
  );
}
export default App;
