import { ICartItem } from "./IRestaurant";


export interface ICartContext{
    cartItems?:ICartItem[];
    addToCart:(item:ICartItem)=>void
    removeCartItem:(id:number)=>void
    updateCartQuantity:(id:number,qty:number)=>void

}