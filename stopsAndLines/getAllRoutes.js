import { database } from "../database.js"


export const getAllRoutes = async () => {

   return database.Route.findAndCountAll()
   
}

