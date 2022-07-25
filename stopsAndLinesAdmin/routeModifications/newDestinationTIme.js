import { database } from "../../database.js";
import {changeDestinationTimeValid} from "../validation/destintionTimeValid.js"

export const changeDestinationTime=async(id,data)=>{


    //check if data is there
    if(!data || !id){
        return{
            message:"Please check data inputed!",
            status:400
        }
    }
    //finding stop in with the given parameters
    let stop = await database.StopRoute.findOne({
        where: {
            stopId: data.stopId,
            routeId:id.id
        },
    });

    const oldTime=stop.dataValues.timeOfDeparture

    if(!stop){
        return {
            message:"Stop with that id doesnt exist!",
            status:404
        }
    }

    //validation of data 
    const validated = changeDestinationTimeValid.validate(data, {

        abortEarly: false,
    });
    if (validated.error) {
        console.log(validated.error);
        return {
            message: "Error! Please check inputed data!",
            status: 400
        }
    }
    
    //changing time

    stop.timeOfDeparture = data.newDestinationTime


    await stop.save()
    await stop.reload()

    return {
        message: `In route ${id.id}, the stop with id ${data.stopId} had its time changed from ${oldTime} to ${data.newDestinationTime} `,
        status:201
    }













}