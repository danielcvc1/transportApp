import { database } from "../database.js"


export const getRouteById= async (incomingData)=>{

    let route = await database.Route.findOne({
        where: {
            id: incomingData.id,
        },
        // include:[
        //     {
        //         model:database.StopRoute,
               
        //     }
        // ],
        include:[
            {
                model:database.Stop,
                as:"Stops"

               
            }
        ]
    });
    return route
}
   