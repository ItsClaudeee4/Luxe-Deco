import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("حدد لون المنتج", {
        position: "top-right", // Show error message in the top-right corner
        autoClose: 3000, // The toast will disappear after 3 seconds
        hideProgressBar: true, // Hide the progress bar
        closeOnClick: true, // Close the toast on click
        pauseOnHover: true, // Pause the toast on hover
        draggable: true, // Make the toast draggable
        progress: undefined, // No progress bar
      });
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    // Show a success message in the top-right corner
    toast.success("انتقلت إلى السلة", {
      position: "top-right", // Show success message in the top-right corner
      autoClose: 3000, // The toast will disappear after 3 seconds
      hideProgressBar: true, // Hide the progress bar
      closeOnClick: true, // Close the toast on click
      pauseOnHover: true, // Pause the toast on hover
      draggable: true, // Make the toast draggable
      progress: undefined, // No progress bar
      style: {
        // Custom style for green color and look
        backgroundColor: "white", // Green background
        color: "black", // White text color
        borderRadius: "5px", // Rounded corners
        padding: "10px 20px", // Padding inside the toast
        fontWeight: "bold", // Bold text
      },
    });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          /* empty */
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmout = () => {
    let totalAmout = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmout += itemInfo.price * cartItems[items][item];
          }
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          /* empty */
        }
      }
    }
    return totalAmout;
  };

  const currency = "DA";
  const delivery_fee = 500;
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmout,
  };

  return (
    // eslint-disable-next-line react/prop-types
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
