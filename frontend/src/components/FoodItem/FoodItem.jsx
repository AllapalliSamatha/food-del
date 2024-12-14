import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

// Import assets from the correct relative paths
import addIconWhite from "../../assets/add_icon_white.png";
import ratingStars from "../../assets/rating_starts.png";
import removeIconRed from "../../assets/remove_icon_red.png";
import addIconGreen from "../../assets/add_icon_green.png";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems={}, addToCart, removeFromCart,url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt={name} />
        { cartItems &&!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={addIconWhite}
            alt="Add icon"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={removeIconRed}
              alt="Remove icon"
            />
            <p>{cartItems[id]}</p> {/* Correctly display the item count */}
            <img
              onClick={() => addToCart(id)}
              src={addIconGreen}
              alt="Add icon"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={ratingStars} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
