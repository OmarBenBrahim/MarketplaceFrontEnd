import { Photo } from "./photo";

export interface Product {
    id :  Number ; 
    title : string ;
    price : Number;
    description : string;
    categorie : string;
    created : Date;
    photos : Photo[]
}