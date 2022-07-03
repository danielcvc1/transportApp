import { database } from "../database.js"


export const getAllStops = async () => {

   return database.Stop.findAndCountAll()
}

