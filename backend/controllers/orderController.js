// import orderModel from "../models/orderModel.js"

// import userModel from "../models/userModel.js"
// import Stripe from "stripe"


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// //placing using order from frontend

// const placeOrder=async (req,res)=>{

//     const frontend_url="http://localhost:5173";
//     try{
//         const newOrder =new orderModel({
//             userId : req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items = req.body.items.map((item) => ({
//             price_data: { // Wrap price_data in an object
//               currency: "inr",
//               product_data: {
//                 name: item.name,
//               },
//               unit_amount: item.price*100,
//             },
//             quantity: item.quantity, // Correct quantity syntax
//           }));
          
//           line_items.push({
//             price_data: { // Fix price_data syntax
//               currency: "inr",
//               product_data: {
//                 name: "Delivery Charges",
//               },
//               unit_amount: 2 * 100,
//             },
//             quantity: 1, // Place this correctly inside the object
//           });

//           const session =await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:"payment",
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`

//           })
//           res.json({success:true,session_url:session.url})
          

//     }catch(error){

//         console.log(error);
//         res.json({success:false,message:"error"})

//     }

// }

// const verifyOrder =async(req,res)=>{

//   const {orderId,success} =req.body;
//   try{
//     if(success==="true"){
//       await orderModel.findByIdAndUpdate(orderId,{payment:true});
//       res.json({success:true,message:"paid"})

//     }
//     else{
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({success:false,message:"not paid"})

//     }

//   }catch(error){+
//     console.log(error);
//     res.json({success:false,message:"error"});

//   }

// }

// //userOrder for frontend

// const userOrders =async(req,res)=>{

//   try{
//     const userOrders=await orderModel.find({userId:req.body.userId})
//     res.json({success:true,data:userOrders})

//   }catch(error){

//     console.log(error);
//     res.json({success:false,message:"error"})


//   }
// }


// //listing orders for admin panel
// const listOrders=async(req,res)=>{

//   try{
//     const orders=await orderModel.find({});
//     res.json({success:true,data:orders})

//   }catch(error){
//     console.log(error);
//     res.json({suess:false,message:"error"})

//   }

// }


// //api for updating order status

// const updateStatus=async(req,res)=>{

//   try{

//     await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
//     res.json({success:true,message:"status updated"})
//   }catch(error){
//     console.log(error);
//     res.json({success:false,message:"error"})

//   }


// }
// export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing order using order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "https://food-del-frontend-0xl3.onrender.com/";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd", // Currency set to USD
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Price in USD converted to cents
            },
            quantity: item.quantity,
        }));

        // Add delivery charges to line_items (Converted to USD as well)
        line_items.push({
            price_data: {
                currency: "usd", // Currency set to USD
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100, // Delivery charge in USD (converted to cents)
            },
            quantity: 1,
        });

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

// Verify order payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "not paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const userOrders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: userOrders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
