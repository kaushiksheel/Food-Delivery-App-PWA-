import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ICartItem } from "../../interfaces/IRestaurant";
import { IUser } from "../../interfaces/IUser";
import { db } from "../../lib/Firebase";

export const firebaseSaveOrder = async (items: ICartItem[]) => {
  const myOrders = collection(db, "my-orders");
  for (let elem of items) {
    const { cloudinaryImageId, description, isVeg, name, price, user } = elem;
    const { displayName, email, photoURL, uid } = user as IUser;
    await addDoc(myOrders, {
      cloudinaryImageId,
      description,
      isVeg,
      name,
      price,
      user: {
        displayName,
        email,
        photoURL,
        uid,
      },
    });
  }
};
