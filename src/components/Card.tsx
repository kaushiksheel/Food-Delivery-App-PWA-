import React, { FC } from "react";
import { Rating } from "./Rating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IRestaurant } from "../interfaces/IRestaurant";

export const imgLink =
  "https://b.zmtcdn.com/data/pictures/chains/4/2400014/3357c1aec32aa5c8d646895f8733e6d0_featured_v2.jpg?output-format=webp";

export const IMG_CDN_URL =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";

export const Card: FC<{ data: IRestaurant }> = ({ data }) => {
  const navigate = useNavigate();

  const {
    id,
    cloudinaryImageId,
    lastMileTravelString,
    avgRating,
    address,
    costForTwoString,
    locality,
    name,
    veg,
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      onClick={() => navigate(`/restaurant/${id}`)}
      className="w-full p-5 hover:shadow-2xl rounded-3xl transition-all cursor-pointer group "
    >
      <div className="w-full h-[200px] relative rounded-3xl overflow-hidden transition-all">
        <LazyLoadImage
          src={`${IMG_CDN_URL}${cloudinaryImageId}`}
          width={"100%"}
          height={"100%"}
          alt="food"
          className="card-img object-cover group-hover:scale-[1.1]"
          effect="blur"
          loading="lazy"
        />
        <p className=" text-black absolute bottom-5 right-4 text-xl bg-[#F5F2F0] p-1 px-4 rounded-xl font-medium">
          {lastMileTravelString}
        </p>
      </div>
      <div className="mt-5">
        <div className="flex  justify-between items-center">
          <p className="text-[1.7rem] font-medium">{name}</p>
          <Rating rating={avgRating} isVeg={veg} />
        </div>
        <div className="flex  justify-between items-center text-[1.4rem] text-lighGray mt-2">
          <p>{address.substring(0, 20) + "..."}</p>
          <p>{costForTwoString}</p>
        </div>
        <p className="text-[1.4rem] text-veryLightGray">{locality}</p>
      </div>
    </motion.div>
  );
};
