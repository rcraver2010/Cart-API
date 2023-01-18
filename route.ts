import {Router, Request, Response} from "express";
import {Item} from "./item"

//hard coded data
let itemsArray:Item[] = [
    { id: 1, quantity:20, price:10, product: "Eggs"},
    { id: 2, quantity:5, price:10, product: "mustard"},
    { id: 3, quantity:50, price:15, product: "paper towels"},
    { id: 4, quantity:100, price:10, product: "toilet paper"}
];

export const itemRouter = Router();

itemRouter.get("/", async (req:Request, res:Response) : Promise<Response> =>{
   if(req.query.maxPrice !== undefined) {
    let underArray = itemsArray.filter((x) => x.price <= Number(req.query.maxPrice));
    return res.status(200).json(underArray);
   }
   else if(req.query.prefix !== undefined) {
    let startsWithArray = itemsArray.filter((x) => x.product.startsWith(String(req.query.prefix)))
    return res.status(200).json(startsWithArray);
   }
   else if() {

   }
   else {
    return res.status(200).json(itemsArray);
   }
});

itemRouter.get("/:id", async (req:Request, res:Response) : Promise<Response> => {
    let itemIWantToFind = itemsArray.find((x) => x.id === Number(req.params.id));

    if(itemIWantToFind === undefined) {
        return res.status(404).send("ID not found");
    }
    else {
        return res.status(200).json(itemIWantToFind);
    }
})

//CRUD Create red update delete

itemRouter.post("/", async (req:Request, res:Response) : Promise<Response> => {
    let newItem:Item = {
        id: GetNextId(),
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    };
    itemsArray.push(newItem);

    return res.status(201).json(newItem);
});

itemRouter.put("/:id", async (req:Request, res:Response) : Promise<Response> => {
    let itemChange = itemsArray.find((x) => x.id === Number(req.params.id));
    if(itemChange !== undefined){
        itemChange.quantity = Number(req.body.quantity);
        itemChange.price = Number(req.body.price);
        itemChange.product = String(req.body.product);

        return res.status(200).json(itemChange);
    }
    else {
        return res.status(404).send("unable to locate");
    }

    
});

itemRouter.delete("/:id", async (req:Request, res:Response) : Promise<Response> => {
    let itemFound = itemsArray.find((x) => x.id === Number(req.params.id));

    if(itemFound === undefined){
    return res.status(404).send("what");
    }
    else {
        return res.status(204).send("Deleted");
    }
});

function GetNextId(){
    //spread operator ... dots
    return Math.max(...itemsArray.map((x) => x.id)) + 1;
}