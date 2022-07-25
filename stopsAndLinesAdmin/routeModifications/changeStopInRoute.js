import { database } from "../../database.js";
import {validateStopRoute} from "../validation/validateStopRoute.js"

export const changeStopInRoute= async (id,data)=>{
///check incoming data
if (!data) {
    return {
        message: "No data inputed!",
        status: 400

    }
}
///check if same 
if (data.oldStopId === data.newStopId) {
    return {
        message: "Old stop can not be the same as the new stop!",
        status: 400
    }
}
//checking if new stop exists in db
let oldStopInStopTable = await database.Stop.findOne({
    where: {
        id: data.oldStopId,
    },
});

if (!oldStopInStopTable) {
    return {
        message: "Stop with that id does not exist!",
        status: 409
    }
}



///validate
const validated = validateStopRoute.validate(data, {
    abortEarly: false,
});
if (validated.error) {
    return {
        message: "Error at validation! Please check inputed data!",
        status: 400
    }
}

//search stop in db 
let oldStop = await database.StopRoute.findOne({
    where: {
        stopId: data.oldStopId,
        routeId:id.id
    },
});

if (!oldStop) {
    return {
        message: "Bus stop with that id is not found!",
        status: 409
    }
}
//change data and return

oldStop.stopId = data.newStopId
oldStop.timeOfDeparture = data.newTimeOfArrival

console.log(oldStop);
await oldStop.save()
await oldStop.reload()

return {
    message: `Stop changed at route ${id.id} at row ${oldStop.dataValues.id}! `
}


}