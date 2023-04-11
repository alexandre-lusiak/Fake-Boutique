
import type { IFilters ,Iproduct} from "@/interface/";

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

    const products = await( await fetch(`https://restapi.fr/api/products?${q}`)).json()
    return products
}


  