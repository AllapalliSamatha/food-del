
import axios from "axios";

import { createContext, useState ,useEffect } from "react";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url="http://localhost:4000"
  const [token,setToken]=useState("");
  const [food_list,setFoodList]=useState([])

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [String(itemId)]: (prev[String(itemId)] || 0) + 1,
    }));

    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[String(itemId)]) return prev; // Avoid removing non-existing items
      const updatedItems = { ...prev, [String(itemId)]: prev[String(itemId)] - 1 };
      if (updatedItems[String(itemId)] <= 0) delete updatedItems[String(itemId)]; // Remove item if count reaches 0
      return updatedItems;

    });
    
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }

   
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }
 
  

  const fetchFoodList=async()=>{
    const response=await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }

  const loadCartData=async (token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }
  useEffect(()=>{
    
     async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"));
    }
     }
     loadData();
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

