import type { IFormuser, Iuser } from "../interface"




export async function addProduct(user:IFormuser):Promise<Iuser> {
  
    const newProduct = await( await fetch('https://restapi.fr/api/users', {
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })).json()
       
        return newProduct
} 