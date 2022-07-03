import { database } from "../database.js";
import { createStopValidation } from "./validation/createStopValidation.js";


export const createStop = async (incomingData) => {

    //validation of data
    const validated = createStopValidation.validate(incomingData, {
        abortEarly: false,
    });
    if (validated.error) {
        return {
            message: "Error! Please check inputed data!",
            status: 400
        }
    }

    //checking if stop already exists at that adress in db
    let busStop = await database.Stop.findOne({
        where: {
            adress: incomingData.adress,
        },
    });

    if (busStop) {
        return {
            message: "Bus stop with that adress is already stored in the database!",
            status: 409
        }
    }
    //creating stop in database
    busStop = await database.Stop.create(incomingData);

    return {message:`New line created named: ${busStop.nameOfStop}!`}

}