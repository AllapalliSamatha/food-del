// import React,{ useEffect,useContext } from 'react'
// import  './Verify.css'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { StoreContext } from '../../context/StoreContext'
// import axios from 'axios';

// const Verify = () => {

//     const [searchParams,setSearchParams]=useSearchParams();
//     const success =searchParams.get("success");
//     const orderId =searchParams.get("orderId");
//     const {url} =useContext(StoreContext);
//     const navigate=useNavigate();

//     const verifyPayment = async() =>{
//         const response =await axios.post(url+"/api/order/verify",{success,orderId});
//         if(response.data.success){

//             navigate("/myorders");

//         }
//         else{
//             navigate("/")
//         }
//     }
//    useEffect(()=>{
//     verifyPayment();
//    })
//   return (
//     <div className='verify'>
//         <div className="spinner">

//         </div>

//     </div>
//   )
// }

// export default Verify

import React, { useEffect, useContext } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div className='verify'>
            <div className="spinner">
                {/* Add your spinner component or animation here */}
            </div>
        </div>
    );
}

export default Verify;
