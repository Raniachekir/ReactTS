import axios from "axios";
import { Product } from "../interfaces/product";
import { useState } from "react";



class ProductServices{
    //const [ProductsData, setProductsData] = useState<Array<Product>>([])
  /*  const [ProductsData, setProductsData] = useState<Product>({
        id: 0,
        title: "",
        price: 0,
        description: "",
        published: 0,
        sizeId: 0,
      }); */

  getProduct =async()=>{
        const response = await axios.get("http://localhost:3001/api/products/get-all-products")
    console.log(response)
        return response.data.data
    }
     addProduct = async (data: Product) => {
        const response = await axios.post(
            "http://localhost:3001/api/products/addProduct",
            data
          );
    console.log(response)
        return response.data.data
    }

     deleteProduct = async (id : number) => {
          const response = await axios.delete(`http://localhost:3001/api/products/${id}`);  
          console.log(response)
          return response.data.data
        }



       
        updateProduct = async (id: number,ProductsData:Product) => {
          //let ProductsData : Product;
            const response = await axios.put(
              `http://localhost:3001/api/products/${id}`, ProductsData
            );  
            console.log(response)
            return response.data.data 
            }
}



export default new ProductServices()