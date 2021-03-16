import { useState, createContext, useContext, useEffect } from "react";
import products from "../products.json";
import { initiateCheckout } from "../lib/payments";

// initializing the an empty cart object
const defaultCart = {
  products: {},
};

export const CartContext = createContext();

const useCartState = () => {
  const [cart, setCart] = useState(defaultCart);

  //upon initial rendering we are checking local storage for data,
  //if there is data we are grabbing it from local storage, parsing,
  //and updateing cart with it
  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("shop_cart");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      setCart(data);
    }
  }, []);

  //creating a lifecycle to track our cart updates and persist data
  //we are saving our data to the local storage when cart is updated
  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("shop_cart", data);
  }, [cart]);

  //we are mapping through our cart products and creating a clone of the state
  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price,
    };
  });

  //this reducer is calculating the subtotal of the cart
  const subtotal = cartItems.reduce(
    (accumulator, { pricePerItem, quantity }) => {
      return accumulator + pricePerItem * quantity;
    },
    0
  );

  //this reducer is calculating the quantity of the cart
  const itemQuantity = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  //this addToCart function is registering the add to cart and determing if its a repeat
  // quantity, if true it is updating the item quantity, else it is creating the cart item with
  //a default quantity of 1
  const addToCart = ({ id } = {}) => {
    setCart((prev) => {
      let cartState = { ...prev };

      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }
      return cartState;
    });
  };

  //this function is takeing in our cart and sending it to stripe for checkout
  const checkout = () => {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  };

  return {
    cart,
    setCart,
    subtotal,
    itemQuantity,
    addToCart,
    checkout,
  };
};

const useCart = () => {
  const cart = useContext(CartContext);
  return cart;
};

export { useCartState, useCart };
