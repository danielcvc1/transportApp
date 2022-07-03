import { database } from "../database.js"


export const getStopByType= async (incomingData)=>{

    let busStopName = await database.Stop.findAndCountAll({
        where: {
            typeOfStop: incomingData.type,
        },
    });

    return busStopName
}

