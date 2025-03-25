export interface Card {
    name:String,
    price:Number,
    image:String,
    stock:Number,
    description:String,
    reviews:[
        rating:Number,
        comment:String
    ],



}