import React, { useContext, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getRestaurantsById } from "../api/request";
import { Container } from "../components/Container";
import { Rating } from "../components/Rating";
import { HeaderLoadingSkeleton } from "../components/HeaderLoadingSkeleton";
import { MenuItemSkeleton } from "../components/MenuItemSkeleton";
import { CartContext } from "../context/CartContext";
import { ICartContext } from "../interfaces/ICartContext";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import {
  IRestaurantDetail,
  IRestaurantMenuItem,
} from "../interfaces/IRestaurant";
import { MenuItem } from "../components/MenuItem";

function RestaurantMenu() {
  const params = useParams();
  const { addToCart } = useContext<ICartContext>(CartContext);
  const [foodType, setFoodType] = useState<string>("all");

  const { id } = params as unknown as {
    id: number;
  };

  const { data, isLoading } = useQuery<IRestaurantDetail>(
    ["restaurant-menu", id],
    () => getRestaurantsById(id),
    {
      enabled: id.toString().length > 0,
      staleTime: Infinity,
    }
  );

  const filterByFoodType = () => {
    const items = Object.values(
      data?.data?.menu?.items as IRestaurantMenuItem[]
    );

    switch (foodType) {
      case "all":
        return items;
      case "veg":
        return items.filter((item) => item.isVeg !== 0);
      case "non-veg":
        return items.filter((item) => item.isVeg === 0);
      default:
        return items;
    }
  };

  return (
    <>
      <Navbar />
      <header className="bg-white mt-3 sticky top-5 h-fit pb-10 z-20">
        <Container>
          {isLoading ? (
            <HeaderLoadingSkeleton />
          ) : (
            <div className=" py-10 gap-x-10 h-fit">
              <div className="flex flex-row gap-x-10">
                <div className="info text-black leading-10  mt-20 md:mt-10">
                  <h2 className="text-5xl font-mediumxd">{data?.data?.name}</h2>

                  <p className="text-[1.4rem] text-[#838383]">
                    {data?.data?.cuisines?.join(",")}
                  </p>
                  <p className="text-[1.4rem] text-[#838383]">
                    {data?.data?.area}
                  </p>
                  <div className="flex  gap-x-5 text-xl mt-5 items-center">
                    <Rating
                      isVeg={true}
                      rating={data?.data?.avgRating as number}
                    />
                    <div className="h-5 w-[.9px] bg-[#333333]" />
                    <p>{data?.data?.sla?.slaString}</p>
                    <div className="h-5 w-[.9px] bg-[#333333]" />
                    <p>{data?.data?.costForTwoMsg}</p>
                  </div>
                </div>
              </div>
              <div className="filter mt-7 flex space-x-5">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFoodType("all")}
                  className={`text-2xl font-normal border border-veryLightGray px-7 py-3 rounded-lg bg-${
                    foodType === "all" ? "gray-100" : "white"
                  } `}
                >
                  All
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFoodType("veg")}
                  className={` text-2xl font-normal border border-veryLightGray px-7 py-3 rounded-lg bg-${
                    foodType === "veg" ? "gray-100" : "white"
                  }`}
                >
                  Veg
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFoodType("non-veg")}
                  className={`text-2xl font-normal border border-veryLightGray px-7 py-3 rounded-lg bg-${
                    foodType === "non-veg" ? "gray-100" : "white"
                  }`}
                >
                  Non-veg
                </motion.button>
              </div>
            </div>
          )}
        </Container>
      </header>
      <main className="mt-10">
        <Container>
          <div className="wrap">
            <header className="">
              <h1 className="font-semibold text-3xl">Recommended</h1>
              <p className="text-medium text-xl text-lighGray mt-2">12 Items</p>
            </header>
            {isLoading ? (
              <div className="md:max-w-6xl mt-5">
                {[...new Array(4)].map((item, index) => (
                  <MenuItemSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="md:max-w-6xl mt-5">
                {filterByFoodType().map(
                  (item: IRestaurantMenuItem, index: number) => (
                    <MenuItem
                      key={index}
                      item={item as IRestaurantMenuItem}
                      addToCart={addToCart}
                      data={data as IRestaurantDetail}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </Container>
      </main>
    </>
  );
}

export default RestaurantMenu;
