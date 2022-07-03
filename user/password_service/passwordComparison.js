import bcrypt from "bcrypt";

export const passwordValidation = async (hashedPass, password) => {
  const response = bcrypt.compareSync(
    password,
    hashedPass,
    function (err, result) {
      if (err) {
        return console.log(err);
      }

      return result;
    }
  );

  return response;
};
