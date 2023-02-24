import { Photo } from "./photo";
import { User } from "./user";

export interface Product {
    id :  Number ; 
    title : string ;
    price : Number;
    description : string;
    categorieName : string;
    created : Date;
    user : User
    photos : Photo[]
}