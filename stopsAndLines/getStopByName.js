import { database } from "../database.js"


export const getStopByName= async (incomingData)=>{

    let busStopName = await database.Stop.findAndCountAll({
        where: {
            nameOfStop: incomingData.stopName,
        },
    });

    return busStopName
}

