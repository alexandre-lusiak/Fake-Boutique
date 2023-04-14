import type { Iuser } from "@/shared/interface";
import { defineStore } from "pinia";

interface IstateUser{
    currentuser: Iuser |null
}

export const useUser = defineStore('userStore',{
   state: () : IstateUser => ({
    currentuser:null
   })

})