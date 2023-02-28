import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { auth, db, provider } from "../lib/Firebase";

export const LoginModal = () => {
  const handleClose = () => {
    CloseModal();
  };

  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          CloseModal();
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // toast.error(errorMessage);
      });
  };

  function CloseModal() {
    const modal = document.getElementById("login-modal");
    return modal?.classList.add("hidden");
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      id="login-modal"
      className="w-[100vw] h-[100vh]  top-0 bg-[rgba(0,0,0,.9)] grid place-content-center z-[999] hidden fixed"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[200px] w-[300px] bg-white  grid place-content-center rounded-xl relative"
      >
        <button
          onClick={handleLogin}
          className="w-full text-2xl border-2 px-10 py-3 rounded-lg font-medium"
        >
          Login with <span className="text-red-600">Google</span>
        </button>
        <XMarkIcon
          onClick={handleClose}
          width={25}
          height={25}
          color="black"
          className="absolute top-4 right-4 cursor-pointer"
        />
      </motion.div>
    </motion.div>
  );
};
