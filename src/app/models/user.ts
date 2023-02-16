import { Product } from "./products"

export interface User{
    userName : string;
    firstNme : string;
    lastName : string;
    country : string;
    city : string;
    photoUrl : string;
    phoneNumber : string;
    products : Product[] ;
}