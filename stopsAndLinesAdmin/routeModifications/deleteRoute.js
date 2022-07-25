import { database } from "../../database.js";


export const deleteRoute =async (id) => {


    //searching in db
    const isDeletedRouteStop = await database.StopRoute.destroy({
        where: {
            routeId: id
        }
    })
    //searching in db

    const isDeletedRoute = await database.Route.destroy({ where: { id } })


    //deleting
    if (isDeletedRoute && isDeletedRouteStop) {

        return { message: `Route ${id} deleted` }

    } else { return { 
        message: "Error please check if route exists" ,
        status:201
} }



}