import { database } from "../database.js"


export const getStopById= async (incomingData)=>{

    let busStopName = await database.Stop.findAndCountAll({
        where: {
            id: incomingData.id,
        },
    });

    return busStopName
}

