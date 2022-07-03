import { database } from "../database.js";

export const validateToken = async (userId, tokenValue, type) => {
  const token = await database.userToken.findOne({
    where: {
      userId,
      value: tokenValue,
      type,
    },
  });
  if (!token) {
    return  false
  }

  // delete token
database.userToken.destroy({
    where: { id: token.id },
  });

  return true;
};
