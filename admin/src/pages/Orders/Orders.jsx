// import React from 'react'
// import './Orders.css'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import axios from 'axios'
// import toast from 'react-toastify'

// const Orders = ({url}) => {
//   const [orders,setOrders]=useState([]);
//   const fetchAllOrders=async()=>{

//     const response =await axios.get(url+"/api/order/list");
//     if(response.data.success){
//       setOrders(response.data.data);
//       console.log(response.data.data);
//     }else{
//       toast.error("error")

//     }

//   }
//   useEffect(()=>{
//     fetchAllOrders();

//   },[])
//   return (
//     <div>

//     </div>
//   )
// }

// export default Orders




// import React, { useState, useEffect } from 'react';
// import './Orders.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { assets } from '../../assets/assets/assets.js';

// const Orders = ({ url }) => {
//   const [orders, setOrders] = useState([]);

//   // Fetching all orders from the API
//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(`${url}/api/order/list`);
//       if (response.data.success) {
//         setOrders(response.data.data); // Set orders data
//         console.log('Orders data:', response.data.data); // Debugging: logs the fetched orders
//       } else {
//         toast.error('Error fetching orders');
//       }
//     } catch (error) {
//       toast.error('An error occurred while fetching orders');
//       console.error(error); // Logging any errors for debugging
//     }
//   };

//   // Fetch orders on component mount
//   useEffect(() => {
//     fetchAllOrders();
//   }, [url]);

//   return (
//     <div className="order-add">
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order, orderIndex) => (
//           <div key={orderIndex} className="order-item">
//             <img src={assets.parcel_icon} alt="Parcel Icon" />
//             <div>
//               <p className="order-item-food">
//                 {order.items?.map((item, itemIndex) => {
//                   // Safely access item properties and log them for debugging
//                   console.log('Item:', item);
//                   const itemName = item?.name || 'Unknown Item';
//                   const itemQuantity = item?.quantity || 0;
//                   const itemPrice = item?.price || 0;

//                   return (
//                     <span key={itemIndex}>
//                       {itemName} x {itemQuantity} (${itemPrice * itemQuantity})
//                       {itemIndex < order.items.length - 1 && ', '}
//                     </span>
//                   );
//                 })}
//               </p>
//               <p>Total Amount: ${order.amount || '0.00'}</p>
//               <p>Status: <b>{order.status}</b></p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets/assets.js';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetching all orders from the API
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        console.log('API Response:', response.data.data); // Log full response for debugging
        setOrders(response.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('An error occurred while fetching orders');
      console.error('Fetch Error:', error); // Log error for debugging
    }
  };

  const statusHandler=async(event,orderId)=>{
  const response =await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
  })
  if(response.data.success){
    await fetchAllOrders();
  }

  }

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className="order-add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, orderIndex) => (
          <div key={orderIndex} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items?.length > 0 ? (
                  order.items.flat().map((item, itemIndex) => {
                    // Flatten nested arrays and map over individual items
                    const itemName = item?.name || 'Unknown Item';
                    const itemQuantity = item?.quantity || 0;
                   // const itemPrice = item?.price || 0;

                    return (
                      <span key={itemIndex}>
                        {itemName} x {itemQuantity} 
                        {itemIndex < order.items.flat().length - 1 && ', '}
                      </span>
                    );
                  })
                ) : (
                  <span>No items available</span>
                )}
              </p>
              <p className="order-item-name">{order.address.firstName+""+order.address.lastName}</p>
              <div className="order-item-address">
                <p> {order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p> 
                
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>

               
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>

            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>

            
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;



