import axios from "axios";

export const getRestaurants = async () => {
  const { data } = await axios.get(
    "https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
  );
  return data;
};

export const getRestaurantsById = async (id: number) => {
  const { data } = await axios.get(
    `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/v4/full?lat=21.1702401&lng=72.83106070000001&menuId=${id}`
  );
  return data;
};
