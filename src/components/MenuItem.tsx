import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  ICartItem,
  IRestaurantDetail,
  IRestaurantMenuItem,
} from "../interfaces/IRestaurant";
import { IMG_CDN_URL } from "./Card";
import { VegIcon } from "./VegIcon";
import { motion } from "framer-motion";
import { useAuthListener } from "../hooks/useAuthListener";
import { toast } from "react-hot-toast";

export const MenuItem: FC<{
  item: IRestaurantMenuItem;
  data: IRestaurantDetail;
  addToCart: (item: ICartItem) => void;
}> = ({ item, addToCart }) => {
  const { name, cloudinaryImageId, description, price, isVeg, quantity } = item;

  const { user } = useAuthListener();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card flex justify-between items-center mb-10"
    >
      <div className="info">
        <VegIcon isVeg={isVeg} />
        <p className="text-[1.7rem] font-medium mt-2 ">{name}</p>
        <p className="text-[1.4rem]">Rs {price / 100}</p>
        <p className="text-[1.4rem] text-lighGray">{description}</p>
      </div>

      <div className="img relative flex justify-center">
        <LazyLoadImage
          src={`${IMG_CDN_URL}${cloudinaryImageId}`}
          width={118}
          height={96}
          alt="food"
          className="object-cover rounded-xl"
          effect="blur"
          loading="lazy"
        />
        <div className="box border-2 bg-white flex items-center justify-between absolute  bottom-1 w-[70%]  p-2">
          <button
            onClick={() => {
              user
                ? addToCart({
                    name,
                    cloudinaryImageId,
                    description,
                    price,
                    isVeg,
                    quantity: quantity as number,
                  })
                : toast.error("Login required");
            }}
            className="text-green-600  mx-auto font-medium text-xl "
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};
