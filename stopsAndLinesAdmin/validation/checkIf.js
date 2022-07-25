import { getJwtData } from "../../auth/auth.service.js";



export const isAdminCheck = async (incomingData) => {


    const bearerToken = incomingData.split(' ')[1];

    const auth = await getJwtData(bearerToken)

    if (auth.isAdmin == null || auth.isVerified==null) {
        return false
    }

    else {
        return true
    }

}