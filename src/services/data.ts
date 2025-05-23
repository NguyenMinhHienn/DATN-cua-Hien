import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000"
})

const dataProvider = {
    ListData: async(route:string)=>{
        return await api.get(route)
    },
    createData:async <T>(resource:{route:string,data:T})=>{
        return await api.post(resource.route,resource.data)
    },
    updateData:async <T>(resource:{route:string,data:T,id:number|string})=>{
        return await api.put(resource.route+`/${resource.id}`,resource.data)
    },
    deleteData:async <T>(resource:{route:string,id:number|string})=>{
        return await api.delete(resource.route+`/${resource.id}`)
    }
}

export const {ListData,createData,updateData,deleteData} = dataProvider