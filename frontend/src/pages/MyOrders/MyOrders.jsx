// import React,{ useContext,useState,useEffect } from 'react'
// import './MyOrders.css'
// import { StoreContext } from '../../context/StoreContext';


// import axios from 'axios';
// import { assets } from '../../assets/assets';
// const MyOrders = () => {

//     const {url,token}=useContext(StoreContext);
//     const [data,setData] =useState([]);
//     const fetchOrders =async()=>{
//         const response =await axios.post(url+"/api/order/userorders",{},{headers:{token}});
//         setData(response.data.data);
       
//     }

//     useEffect(()=>{
//         if(token){
//             fetchOrders();
//         }

//     },[token])
//   return (
//     <div className='my-orders'>
//         <h2>My Orders</h2>
//         <div className="container">
//             {data.map((order,index)=>{
//                 return (
//                     <div key={index} className='my-orders-order'>
//                     <img src={assets.parcel_icon} alt=""/>
//                     <p>
//                         {order.items.map((item,index)=>{
//                             if(index === order.items.length-1){
//                                 return item.name+ " x " +item.quantity
//                             }
//                             else{
//                                 return item.name +" x " +item.quantity + " ,"
//                             }
//                         })}
//                     </p>
                  
//     {/*   <p> {order.items.map((itemArray, index) => {
//         const item = itemArray[0]; // Access the first (and only) element in the inner array
//         console.log(`Item ${index}:`, item); // Debug the actual item object
//         return `${item.name || "Unknown"}x${item.quantity || 0}`;
//     }).join(", ")}
// </p> */}



//                     </div>
//                 )
//             })}
//         </div>


        
//     </div>
//   )
// }

// export default MyOrders

// import React, { useContext, useState, useEffect } from 'react';
// import './MyOrders.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { assets } from '../../assets/assets';

// const MyOrders = () => {
//     const { url, token } = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchOrders = async () => {
//         const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
//         setData(response.data.data);
//     };

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         }
//     }, [token]);

//     return (
//         <div className='my-orders'>
//             <h2>My Orders</h2>
//             <div className="container">
//                 {data.map((order, index) => {
//                     // Check the length of items in the order
//                     console.log("Order Items Length:", order.items.length);

//                     // Calculate delivery fee based on the number of items
//                     const deliveryFee = order.items.length === 0 ? 0 : 2;  // Delivery fee is 0 if no items
//                     const totalAmount = order.amount + deliveryFee;         // Add delivery fee to subtotal to get total amount
                    
//                     return (
//                         <div key={index} className='my-orders-order'>
//                             <img src={assets.parcel_icon} alt="" />
//                             <p>
//                                 {order.items.map((item, index) => {
//                                     // Directly access item because it is an object, not an array
//                                     return `${item.name || "Unknown"} x ${item.quantity || 0}`;
//                                 }).join(", ")}
//                             </p>
//                             <p>Subtotal: ${order.amount}.00</p>         {/* Subtotal */}
//                             <p>Delivery Fee: ${deliveryFee}.00</p>       {/* Delivery Fee */}
//                             <p>Total: ${totalAmount}.00</p>              {/* Total Amount */}
//                             <p>Items: {order.items.length}</p>
//                             <p><span>&#x25cf;</span> <b> {order.status}</b></p>
//                             <button>
//                                 Track Orders
//                             </button>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default MyOrders;



import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    // Fetch the orders
    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        console.log(response.data);  // Log the response to see the structure of the data
        setData(response.data.data);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.items && order.items.length > 0 ? (
                                order.items.map((itemArray, index) => {
                                    // Access the first object in the item array and get name and quantity
                                    const item = itemArray[0] || {};  // Safely access the first item in the array
                                    const itemName = item.name || "Unknown";  // Default to "Unknown" if name is missing
                                    const itemQuantity = item.quantity || 0;  // Default to 0 if quantity is missing
                                    return `${itemName} x ${itemQuantity}`;
                                }).join(", ")
                            ) : (
                                "No items in this order"  // Show a message if there are no items in the order
                            )}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b> {order.status}</b></p>
                        <button onClick={fetchOrders}>Track Orders</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;

