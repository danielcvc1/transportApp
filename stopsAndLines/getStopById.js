import { database } from "../database.js"


export const getStopById= async (incomingData)=>{

    let busStopName = await database.Stop.findAll({
        where: {
            id: incomingData.id,
        },
    });

    return busStopName
}

