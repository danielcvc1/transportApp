import { database } from "../database.js"


export const getStopByAdress= async (incomingData)=>{

    let busStopName = await database.Stop.findAll({
        where: {
            adress: incomingData.adress,
        },
    });

    return busStopName
}

