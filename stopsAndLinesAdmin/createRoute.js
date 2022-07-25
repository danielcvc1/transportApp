import { database } from "../database.js";
import { createRouteValidation } from "./validation/createRouteValidation.js";




export const createRoute = async (incomingData) => {

    //validation of data
    const validated = createRouteValidation.validate(incomingData, {
        abortEarly: false,
    });
    if (validated.error) {
        return {
            message: "Error! Please check inputed data!",
            error: validated.error.details[0],
            status: 400
        }
    }

    //checking if items in the array match
    if (incomingData.stopsPassingBy.length !== incomingData.timeOfDeparture.length) {

        return {
            message: "Items in stops passing by and time of departure dont match! Please fix this and try again.",
            status: 400

        }


    }

    //Searching in DB to see if route already exists

    let newTransportLine = await database.Route.findOne({
        where: {
            nameOfRoute: incomingData.nameOfRoute,
        },
    });

    if (newTransportLine) {
        return {
            message: "This route alredy exists in the database!",
            status: 409
        }
    }


    //checking if stop exist in db

    for (let i = 0; i < incomingData.stopsPassingBy.length; i++) {

        let findStop = await database.Stop.findOne({
            where: {
                adress: incomingData.stopsPassingBy[i]
            },
        });
        if (!findStop)
            return {
                message: `Stop ${incomingData.stopsPassingBy[i]} does not exist in stops database!`

            }
    }



    //creating route table

    const nameOfRoute=incomingData.nameOfRoute
    let newData = { nameOfRoute }

    newTransportLine = await database.Route.create(newData)


    ///creating routeStop (connection between table Route and table Stop)

    for (let i = 0; i < incomingData.stopsPassingBy.length; i++) {
        //getting the id of the stop

        let findingId = await database.Stop.findOne({
            where: {
                adress: incomingData.stopsPassingBy[i]
            },
        });

        //////
        const routeId = newTransportLine.dataValues.id
        const stopId = findingId.id
        const timeOfDeparture = incomingData.timeOfDeparture[i]

        const data = { routeId, stopId, timeOfDeparture }


        const stopRoute = await database.StopRoute.create(data)



    }
    
    return {
        message: "Line created!",
        Route_name: incomingData.nameOfRoute
    }


}
