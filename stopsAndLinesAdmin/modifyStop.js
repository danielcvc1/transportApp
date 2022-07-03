import { database } from "../database.js";
import { createStopValidation } from "./validation/createStopValidation.js";

export const modifyStop = async (id, data) => {

    ///add logic to check if admin is making the changges






    //validation of data
    const validated = createStopValidation.validate(data, {
        abortEarly: false,
    });
    if (validated.error) {
        return {
            message: "Error! Please check inputed data!",
            status: 400
        }
    }

    ///check if stop with the same adress exists
    let adressAllrdExists = await database.Stop.findOne({
        where: {
            adress: data.adress,
        },
    });

    if (adressAllrdExists) {
        return {
            message: "Bus stop with that adress is already stored in the database!",
            status: 409
        }
    }

    ////finds the stop that we search in the DB
    const reqStop = await database.Stop.findByPk(id)

    if (!reqStop) {
        return {
            message: `Stop not found!`
        }
    }


    ///changing data
    reqStop.nameOfStop = data.nameOfStop
    reqStop.adress = data.adress
    reqStop.typeOfStop = data.typeOfStop

    await reqStop.save()
    await reqStop.reload()

    return {
        message: `Line with the id of ${id} has been modified!`
    }


}

//////////////dodaj error messages
