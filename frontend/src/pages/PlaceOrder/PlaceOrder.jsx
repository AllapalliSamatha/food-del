import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    // Iterate through food_list and create items with quantity
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {
          id: item._id, // Item ID
          name: item.name, // Item name
          price: item.price, // Item price
          quantity: cartItems[item._id], // Quantity from cart
        };
        orderItems.push(itemInfo); // Add item to orderItems
      }
    });

    const deliveryFee = 2; // Define delivery fee in USD

    const orderData = {
      address: data, // User address
      items: orderItems, // Items with quantities
      amount: getTotalCartAmount() + deliveryFee, // Include delivery fee in the total amount
    };

    try {
      // Send the orderData to the backend
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to Stripe payment page
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            {food_list.map((item) => {
              const itemQuantity = cartItems[item._id] || 0;
              if (itemQuantity > 0) {
                return (
                  <div key={item._id} className="cart-total-details">
                    <p>{item.name} (x{itemQuantity})</p>
                    <p>${(item.price * itemQuantity).toFixed(2)}</p> {/* Display USD */}
                  </div>
                );
              }
              return null;
            })}
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${(2).toFixed(2)}</p> {/* Delivery fee in USD */}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${(getTotalCartAmount() + 2).toFixed(2)}</p> {/* Total in USD */}
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;





// import React, { useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';
// import { useNavigate } from 'react-router-dom';

// const PLACEHOLDER_CURRENCY_CONVERSION_RATE = 83; // Example conversion rate from USD to INR (adjust as needed)

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];

//     // Iterate through food_list and create items with quantity
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = {
//           id: item._id, // Item ID
//           name: item.name, // Item name
//           price: item.price, // Item price
//           quantity: cartItems[item._id], // Quantity from cart
//         };
//         orderItems.push(itemInfo); // Add item to orderItems
//       }
//     });

//     const deliveryFee = 2; // Define delivery fee in USD

//     const orderData = {
//       address: data, // User address
//       items: orderItems, // Items with quantities
//       amount: getTotalCartAmount() + deliveryFee, // Include delivery fee in the total amount
//     };

//     try {
//       // Send the orderData to the backend
//       let response = await axios.post(url + "/api/order/place", orderData, {
//         headers: { token },
//       });

//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.replace(session_url); // Redirect to Stripe payment page
//       } else {
//         alert("Error placing order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Error placing order");
//     }
//   };

//   const convertToINR = (amountInUSD) => {
//     return amountInUSD * PLACEHOLDER_CURRENCY_CONVERSION_RATE;
//   };

//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!token) {
//       navigate('/cart');
//     }
//     else if (getTotalCartAmount() === 0) {
//       navigate('/cart');
//     }

//   }, [token]);

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zip"
//             onChange={onChangeHandler}
//             value={data.zip}
//             type="text"
//             placeholder="Zip code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             {food_list.map((item) => {
//               // Ensure the item is in the cart and has a quantity greater than 0
//               const itemQuantity = cartItems[item._id] || 0; // Default to 0 if undefined
//               if (itemQuantity > 0) {
//                 const itemAmountInINR = convertToINR(item.price * itemQuantity).toFixed(2); // Convert to INR
//                 return (
//                   <div key={item._id} className="cart-total-details">
//                     {/* Display the item name and its quantity */}
//                     <p>{item.name} (x{itemQuantity})</p> {/* Display the quantity */}
//                     <p>₹{itemAmountInINR}</p> {/* Display amount in INR */}
//                   </div>
//                 );
//               }
//               return null; // Don't render if quantity is 0
//             })}
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{convertToINR(2).toFixed(2)}</p> {/* Delivery fee in INR */}
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Total</p>
//               <p>₹{convertToINR(getTotalCartAmount() + 2).toFixed(2)}</p> {/* Total amount in INR */}
//             </div>
//           </div>
//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;









// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';

// const PLACEHOLDER_CURRENCY_CONVERSION_RATE = 83; // Example conversion rate from USD to INR (adjust as needed)

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];

//     // Iterate through food_list and create items with quantity
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = {
//           id: item._id, // Item ID
//           name: item.name, // Item name
//           price: item.price, // Item price
//           quantity: cartItems[item._id], // Quantity from cart
//         };
//         orderItems.push(itemInfo); // Add item to orderItems
//       }
//     });

//     const deliveryFee = 2; // Define delivery fee in USD

//     const orderData = {
//       address: data, // User address
//       items: orderItems, // Items with quantities
//       amount: getTotalCartAmount() + deliveryFee, // Include delivery fee in the total amount
//     };

//     try {
//       // Send the orderData to the backend
//       let response = await axios.post(url + "/api/order/place", orderData, {
//         headers: { token },
//       });

//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.replace(session_url); // Redirect to Stripe payment page
//       } else {
//         alert("Error placing order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Error placing order");
//     }
//   };

//   const convertToINR = (amountInUSD) => {
//     return amountInUSD * PLACEHOLDER_CURRENCY_CONVERSION_RATE;
//   };

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="Zip code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             {food_list.map((item) => {
//               if (cartItems[item._id] > 0) {
//                 return (
//                   <div key={item._id} className="cart-total-details">
//                     <p>{item.name} (x{cartItems[item._id]})</p>
//                     <p>₹{convertToINR(item.price * cartItems[item._id]).toFixed(2)}</p>
//                   </div>
//                 );
//               }
//               return null;
//             })}
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{convertToINR(2).toFixed(2)}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Total</p>
//               <p>₹{convertToINR(getTotalCartAmount() + 2).toFixed(2)}</p>
//             </div>
//           </div>
//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;






// 

// import React, { useContext, useState } from 'react';
// import axios from "axios";
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];

//     // Iterate through food_list and create items with quantity
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = {
//           id: item._id, // Item ID
//           name: item.name, // Item name
//           price: item.price, // Item price
//           quantity: cartItems[item._id], // Quantity from cart
//         };
//         orderItems.push(itemInfo); // Add item to orderItems
//       }
//     });

//     const orderData = {
//       address: data, // User address
//       items: orderItems, // Items with quantities
//       amount: getTotalCartAmount() + 2, // Include delivery fee in the total amount
//     };

//     try {
//       // Send the orderData to the backend
//       let response = await axios.post(url + "/api/order/place", orderData, {
//         headers: { token },
//       });

//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.replace(session_url); // Redirect to Stripe payment page
//       } else {
//         alert("Error placing order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Error placing order");
//     }
//   };

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="Zip code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>$2</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Total</p>
//               <p>${getTotalCartAmount() + 2}</p>
//             </div>
//           </div>
//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;


// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];

//     // Iterate through food_list and create items with quantity
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = {
//           id: item._id, // Item ID
//           name: item.name, // Item name
//           price: item.price, // Item price
//           quantity: cartItems[item._id], // Quantity from cart
//         };
//         orderItems.push(itemInfo); // Add item to orderItems
//       }
//     });

//     const deliveryFee = 2; // Define delivery fee

//     const orderData = {
//       address: data, // User address
//       items: orderItems, // Items with quantities
//       amount: getTotalCartAmount() + deliveryFee, // Include delivery fee in the total amount
//     };

//     try {
//       // Send the orderData to the backend
//       let response = await axios.post(url + "/api/order/place", orderData, {
//         headers: { token },
//       });

//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.replace(session_url); // Redirect to Stripe payment page
//       } else {
//         alert("Error placing order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Error placing order");
//     }
//   };

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="Zip code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             {food_list.map((item) => {
//               if (cartItems[item._id] > 0) {
//                 return (
//                   <div key={item._id} className="cart-total-details">
//                     <p>{item.name} (x{cartItems[item._id]})</p>
//                     <p>${item.price * cartItems[item._id]}</p>
//                   </div>
//                 );
//               }
//               return null;
//             })}
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Total</p>
//               <p>${getTotalCartAmount() + 2}</p>
//             </div>
//           </div>
//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;



// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';

// const PLACEHOLDER_CURRENCY_CONVERSION_RATE = 83; // Example conversion rate from USD to INR (adjust as needed)

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];

//     // Iterate through food_list and create items with quantity
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = {
//           id: item._id, // Item ID
//           name: item.name, // Item name
//           price: item.price, // Item price
//           quantity: cartItems[item._id], // Quantity from cart
//         };
//         orderItems.push(itemInfo); // Add item to orderItems
//       }
//     });

//     const deliveryFee = 2; // Define delivery fee in USD

//     const orderData = {
//       address: data, // User address
//       items: orderItems, // Items with quantities
//       amount: getTotalCartAmount() + deliveryFee, // Include delivery fee in the total amount
//     };

//     try {
//       // Send the orderData to the backend
//       let response = await axios.post(url + "/api/order/place", orderData, {
//         headers: { token },
//       });

//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.replace(session_url); // Redirect to Stripe payment page
//       } else {
//         alert("Error placing order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Error placing order");
//     }
//   };

//   const convertToINR = (amountInUSD) => {
//     return amountInUSD * PLACEHOLDER_CURRENCY_CONVERSION_RATE;
//   };

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="Zip code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             {food_list.map((item) => {
//               if (cartItems[item._id] > 0) {
//                 return (
//                   <div key={item._id} className="cart-total-details">
//                     <p>{item.name} (x{cartItems[item._id]})</p>
//                     <p>₹{convertToINR(item.price * cartItems[item._id]).toFixed(2)}</p>
//                   </div>
//                 );
//               }
//               return null;
//             })}
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{convertToINR(2).toFixed(2)}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Total</p>
//               <p>₹{convertToINR(getTotalCartAmount() + 2).toFixed(2)}</p>
//             </div>
//           </div>
//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;
