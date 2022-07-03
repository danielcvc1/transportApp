import { database } from "../database.js";
import { generateRandomAlphaNumeric } from "../utils/randomNumberGenerator.js";



//verification token creation
export const createToken = async (userId, type) => {
    //random value creation
    const value = generateRandomAlphaNumeric(6);
  
    //creating expiration date
    const date = new Date();
    
  
  const expirationDate =date.setDate(date.getDate() + 1);
    //create token in db and return it
  
    return await database.userToken.create({
      userId,
      value,
      type,
      expirationDate,
    });
  };
  