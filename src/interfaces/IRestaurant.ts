import { IUser } from "./IUser";

export interface IRestaurantMenuItem {
  id: number;
  cloudinaryImageId: string;
  description: string;
  name: string;
  price: number;
  isVeg: number;
  area: string;
  avgRating: number;
  costForTwoMsg: string;
  costForTwo: number;
  sla: {
    slaString: string;
  };
  offerMeta: [];
  menu: {
    items: [];
  };
  cuisines: [];
  quantity?: number;
}

export interface IRestaurantDetail {
  data: IRestaurantMenuItem;
}

export interface IRestaurant {
  id:number
  cloudinaryImageId:string
  lastMileTravelString:string
  avgRating:string|number
  address:string
  costForTwoString:string
  locality:string;
  veg:boolean;
  name:string
}


export interface ICartItem{
  name:string
                cloudinaryImageId:string
                description:string
                price:number
                isVeg:number
                quantity:number,
                user?:IUser
}


