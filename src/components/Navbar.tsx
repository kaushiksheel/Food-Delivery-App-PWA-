import React, { useContext, useState } from "react";
import { Container } from "./Container";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginModal } from "../modals/LoginModal";
import { useAuthListener } from "../hooks/useAuthListener";
import { UserDropdown } from "./UserDropdown";
import { CartContext } from "../context/CartContext";
import { ICartContext } from "../interfaces/ICartContext";

const navLinks = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Cart",
    href: "/cart",
  },
  {
    id: 3,
    title: "Orders",
    href: "/orders",
  },
];

export const Navbar = () => {
  const location = useLocation();
  const { cartItems } = useContext<ICartContext>(CartContext);

  const { pathname } = location;

  const handleOpenLoginModal = () => {
    const modal = document.getElementById("login-modal");
    modal?.classList.remove("hidden");
  };

  const { user } = useAuthListener();

  const modifiedNavLinks = user
    ? navLinks
    : navLinks.filter(
        (link) => link.title !== "Cart" && link.title !== "Orders"
      );
  return (
    <>
      <nav className="sticky top-0 w-full h-fit bg-white  z-50">
        <Container>
          <div className="wrapp flex items-center justify-between py-6">
            <Link className="font-semibold text-2xl md:text-4xl" to={"/"}>
              HungryHero
            </Link>
            <div className=" flex space-x-4 md:space-x-8 items-center">
              {modifiedNavLinks.map(({ href, id, title }) => (
                <li
                  style={{
                    borderBottom:
                      href === pathname && ("2px solid #EF4F5F" as any),
                  }}
                  className="hover:border-b-2 border-customRed relative"
                  key={id}
                >
                  <Link className="text-xl md:text-2xl text-lighGray" to={href}>
                    {title}
                  </Link>
                  {cartItems && cartItems.length > 0 && title === "Cart" && (
                    <span className="absolute text-lg bg-customRed  text-white h-7 w-7 rounded-full grid place-content-center font-medium -top-3 -right-4">
                      {cartItems?.length}
                    </span>
                  )}
                </li>
              ))}
              {user ? (
                <li>
                  <UserDropdown imgSrc={user?.photoURL as string} />
                </li>
              ) : (
                <li>
                  <motion.button
                    onClick={handleOpenLoginModal}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="text-2xl text-lighGray text-white bg-customRed px-10 py-4 rounded-lg font-medium"
                  >
                    SignIn
                  </motion.button>
                </li>
              )}
            </div>
          </div>
        </Container>
      </nav>
      <LoginModal />
    </>
  );
};
