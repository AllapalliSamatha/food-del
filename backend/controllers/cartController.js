// import userModel from  "../models/userModel.js"

// //add items to user cart
// const addToCart =async (req,res)=>{
// try{
//     let userData=await userModel.findById(req.body.userId);
//     let cartData=  userData.cartData || {};
//     if (!userData) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
  
//     if(!cartData[req.body.itemId]){
//         cartData[req.body.itemId]=1;
//     }
//     else{
//         cartData[req.body.itemId]+=1;
//     }
//     await userModel.findByIdAndUpdate(req.body.userId,{ cartData });
//     res.json({success:true,message:"added to cart"});

// }catch(error){
//     console.log(error);
//     res.json({success:false,message:"error"})

// }


// }

// //remove items from user cart
// const removeFromCart =async(req,res)=>{
// try{
//     let userData=await userModel.findById(req.body.userId);
//     let cartData= userData.cartData || {};
//     if(cartData[req.body.itemId]>0){
//         cartData[req.body.itemId]-=1;
//     }
//     await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//     res.json({success:true,message:"remove from cart"})

    

// }catch(error){
//     console.log(error);
//     res.json({success:false,message:"error"})

// }

// }

// //fetch user cart data
// const getCart =async(req,res)=>{

//     try{

//         let userData=await userModel.findById(req.body.userId);
//         let cartData=await userData.cartData;
//         res.json({success:true,cartData})

//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false,message:"error"})

//     }

// }
// export { addToCart,removeFromCart,getCart}


import userModel from  "../models/userModel.js"



//add items to user cart
const addToCart =async (req,res)=>{
  try{
    let userData=await userModel.findById(req.body.userId);
    if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    
    let cartData = userData.cartData || {};  // Initialize cartData to an empty object if it's not present

    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
    }
    else{
        cartData[req.body.itemId]+=1;
    }
    
    await userModel.findByIdAndUpdate(req.body.userId,{ cartData });
    res.json({success:true,message:"added to cart"});
  } catch(error){
    console.log(error);
    res.json({success:false,message:"error"})
  }
}

//remove items from user cart
const removeFromCart =async(req,res)=>{
  try{
    let userData=await userModel.findById(req.body.userId);
    if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    
    let cartData = userData.cartData || {};  // Initialize cartData to an empty object if it's not present

    if(cartData[req.body.itemId] > 0){
        cartData[req.body.itemId]-=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"removed from cart"})
  } catch(error){
    console.log(error);
    res.json({success:false,message:"error"})
  }
}

//fetch user cart data
const getCart =async(req,res)=>{
  try{
    let userData=await userModel.findById(req.body.userId);
    if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    
    let cartData = userData.cartData || {};  // Initialize cartData to an empty object if it's not present

    res.json({success:true,cartData})
  } catch(error){
    console.log(error);
    res.json({success:false,message:"error"})
  }
}

export { addToCart, removeFromCart, getCart }
