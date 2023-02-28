import {
  collection,

  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthListener } from "../hooks/useAuthListener";
import { ICartContext } from "../interfaces/ICartContext";
import { ICartItem } from "../interfaces/IRestaurant";
import { IUser } from "../interfaces/IUser";
import { db } from "../lib/Firebase";
import { firebaseCart } from "../utils/Firebase/firebaseCart";

export const CartContext = createContext({} as ICartContext);

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuthListener();

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "cart-items"),
      where("user.uid", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc: DocumentData) => ({
        data: doc.data(),
      }));

      setCartItems(data.map((item: { data: ICartItem }) => item.data));
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  // adding item to cart
  const addToCart = (item: ICartItem) => {
    firebaseCart(item, user as IUser);
    setCartItems([...cartItems, item]);
  };


  //deleting item from cart
  const removeCartItem = async(id: number) => {
    setCartItems(cartItems.filter((item, index) => index !== id));

  };


  const updateCartQuantity = (id: number, qty: number) => {
    setCartItems(
      cartItems.map((item, index) =>
        index === id ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeCartItem, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
