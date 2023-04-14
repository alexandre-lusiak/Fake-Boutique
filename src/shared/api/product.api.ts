

import { ref, type Ref } from "vue";
import { boolean } from "zod";
import type { IFilters, IFormProduct, Iproduct } from "../interface";

const BASE_URL = "https://restapi.fr/api/products"
export async function  fetchProducts(filters:IFilters,page :number):Promise <any >{
    
    const  q = new URLSearchParams();

    if(filters.category !=='all'){
        q.append('category',filters.category)
    }

    q.append('limit',20+'')
    if(page !== 1){
        q.append('skip', ((page -  1 ) * 20) + '')
    }
    q.append(
        'price',
        `{"$gte":${filters.priceRange[0]}, "$lte":${filters.priceRange[1]}}`
      );

    const products = await( await fetch(`${BASE_URL}?${q}`)).json()
    return products
}



export function useFetchProducts(): {
  products: Ref<Iproduct[] | null>;
  loading: Ref<boolean>;
  error: Ref<any>;
} {
  const products = ref<Iproduct[] | null>(null);
  const loading = ref<boolean>(true);
  const error = ref<any>(null);

  (async () => {
    try {
      products.value = await (await fetch(BASE_URL)).json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  })();

  return {
    products,
    loading,
    error,
  };
}


export async function fetchAllProducts():Promise<Iproduct[]> {
    return  await (await fetch(BASE_URL)).json();
}


export  async function  deleteProduct(id:string): Promise<string> {
          await  fetch(`${BASE_URL}/${id}`, {
                method:'DELETE'
            })
    return id;
}


export async function addProduct(product:IFormProduct):Promise<Iproduct> {
  
    const newProduct = await( await fetch('https://restapi.fr/api/products', {
            method:'POST',
            body:JSON.stringify(product),
            headers:{
                'Content-Type':'application/json'
            }
        })).json()
       
        return newProduct
} 

export  async function  getProduct(id:string): Promise<Iproduct> {
 const product = await (await fetch(`${BASE_URL}/${id}`)).json();
return product;
}
    

export async function editProduct(
  product: IFormProduct,
  productId: string
): Promise<Iproduct> {
  const updatedProduct = await (
    await fetch(`${BASE_URL}/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
  return updatedProduct;
}