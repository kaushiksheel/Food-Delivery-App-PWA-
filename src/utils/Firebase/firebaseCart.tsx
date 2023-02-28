import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { ICartItem } from "../../interfaces/IRestaurant";
import { IUser } from "../../interfaces/IUser";
import { db } from "../../lib/Firebase";

export const firebaseCart = async (item: ICartItem, user: IUser) => {
  const cartItems = collection(db, "cart-items");

  const { cloudinaryImageId, description, isVeg, name, price, quantity } = item;
  const { displayName, email, photoURL, uid } = user;

  await addDoc(cartItems, {
    cloudinaryImageId,
    description,
    isVeg,
    name,
    price,
    quantity:1,
    user: {
      displayName,
      email,
      photoURL,
      uid,
    },
  });
};
