import React, { FC, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMG_CDN_URL } from "../components/Card";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { ICartContext } from "../interfaces/ICartContext";
import "react-lazy-load-image-component/src/effects/blur.css";
import { TrashIcon } from "@heroicons/react/24/outline";
import ReactSelect from "react-select";
import { ICartItem, IRestaurantMenuItem } from "../interfaces/IRestaurant";
import { motion } from "framer-motion";
import { CustomScrollbar } from "../lib/CustomScrollbar";
import { EmtypCartAnimation } from "../components/EmtypCartAnimation";
import { firebaseSaveOrder } from "../utils/Firebase/firebaseSaveOrder";
import { useNavigate } from "react-router-dom";

export const HorizontalLine = () => {
  return <hr className="w-full h-[1px] bg-[#E4E4E7]" />;
};

const options = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
];

export const CartItem: FC<{
  item: IRestaurantMenuItem;
  removeCartItem: (id: number) => void;
  updateCartQuantity: (id: number, qty: number) => void;
  index: number;
}> = ({ item, removeCartItem, index, updateCartQuantity }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="item flex items-center justify-between my-8 "
    >
      <div className="left flex items-center space-x-5">
        <LazyLoadImage
          src={`${IMG_CDN_URL}${item.cloudinaryImageId}`}
          width={62}
          height={40}
          alt="food"
          className="object-cover rounded-lg"
          effect="blur"
          loading="lazy"
        />
        <p className="text-2xl font-medium ">{item.name}</p>
      </div>
      <div className="right flex items-center space-x-10">
        <ReactSelect
          onChange={(e) => updateCartQuantity(index, e?.value as number)}
          placeholder={item.quantity}
          options={options}
          className="text-xl"
        />
        <p className="text-2xl font-medium">Rs.{item.price / 100}</p>
        <TrashIcon
          onClick={() => removeCartItem(index)}
          color="#B8B8BF"
          width={20}
          height={20}
          className="hover:text-black cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

const Cart = () => {
  const { cartItems, removeCartItem, updateCartQuantity } =
    useContext<ICartContext>(CartContext);

const navigate=useNavigate()

  function getCartInfo() {
    return {
      totalQuantity: cartItems
        ?.map((item) => item.quantity)
        .reduce((a, b) => a + b, 0),
      subtotal: cartItems
        ?.map((item) => (item.quantity * item.price) / 100)
        .reduce((a, b) => a + b, 0),
    };
  }

  const { totalQuantity, subtotal } = getCartInfo();

  return (
    <>
      <Navbar />
      <main className="mt-9">
        <Container>
          <div className="wrapper flex flex-col lg:flex-row justify-between space-x-11">
            {cartItems && cartItems.length > 0 ? (
              <div className="cartItem flex-1">
                <header className="flex items-center justify-between mb-8">
                  <h1 className="font-semibold text-3xl">Your Cart</h1>
                  <p className="text-2xl">{cartItems?.length} Items in cart</p>
                </header>
                <HorizontalLine />
                <CustomScrollbar height={490}>
                  <div className="body mt-8 ">
                    {cartItems?.map((item: unknown, index: number) => (
                      <>
                        <CartItem
                          key={index}
                          index={index}
                          item={item as IRestaurantMenuItem}
                          removeCartItem={removeCartItem}
                          updateCartQuantity={updateCartQuantity}
                        />
                        <HorizontalLine />
                      </>
                    ))}
                  </div>
                </CustomScrollbar>
              </div>
            ) : (
              <EmtypCartAnimation />
            )}
            <div className="cartTotal w-[341px] bg-[#FAFAFA] h-fit p-11 mt-10 lg:mt-0">
              <div className="flex items-center justify-between text-2xl font-medium text-lighGray mb-8">
                <p>Quantity</p>
                <p>{totalQuantity}</p>
              </div>
              <div className="flex items-center justify-between text-2xl font-medium text-lighGray mb-8">
                <p>Subtotal</p>
                <p>Rs.{subtotal}</p>
              </div>
              <HorizontalLine />
              <motion.button
              onClick={()=>{firebaseSaveOrder(cartItems as ICartItem[])
              navigate('/orders')
              }}
                whileTap={{
                  scale: 0.9,
                }}
                className="bg-customRed text-3xl font-semibold border-none rounded-lg text-white w-full py-5  mt-6"
              >
                Order Food
              </motion.button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Cart;
