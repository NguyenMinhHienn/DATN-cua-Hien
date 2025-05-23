import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000"
})

const dataProvider = {
    ListCategory: async(route:string)=>{
        return await api.get(route)
    },
    createCategory:async <T>(resource:{route:string,data:T})=>{
        return await api.post(resource.route,resource.data)
    },
    updateCategory:async <T>(resource:{route:string,data:T,id:number|string})=>{
        return await api.put(resource.route+`/${resource.id}`,resource.data)
    },
    deleteCategory:async <T>(resource:{route:string,id:number|string})=>{
        return await api.delete(resource.route+`/${resource.id}`)
    }
}

export const {ListCategory,createCategory,updateCategory,deleteCategory} = dataProvider