import { database } from "../database.js";
import { validateActivation } from "../user/validations/validateMail.js";
import {passwordValidation} from "../user/password_service/passwordComparison.js" 

///activation admin 
export const activateAdmin = async (incomingData) => {

    //validate incoming data
    const validated = validateActivation.validate(incomingData, { abortEarly: false });
    if (validated.error) {
        return {
            message: validated.error.details[0].message,
            path: validated.error.details[0].path,
        };
    }
    //check if sender is admin and exist in DB
    const user = await database.User.findOne({
        where: {
            email: incomingData.email,
            isAdmin: 1,
            isVerified: 1,
        },
    });
    if (!user) {
        return {
            message: "User has no authorization for this action!",
            status: 401,
        };
    }
    //password comparison
    const passIsValid = await passwordValidation(user.password, incomingData.password);
    if (passIsValid == false) {
        return {
            response: "Error!",
            message: "Passwords do not match!",
            status: 400,

        };
    }
    //checking the e-mail that is gonna be activated for validity
    const newAdmin = await database.User.findOne({
        where: {
            email: incomingData.activateAccount,
        },
    });
    if (!newAdmin) {
        return {
            message: "User that needs activation does not exist!",
            status: 404,
        };
    }
    if (newAdmin.dataValues.admin == 1) {
        return {
            message: "User that needs activation is already an admin! If the account is not trusted check again for validity with the user.",
            status: 406,
        };
    }
    if (newAdmin.dataValues.verifiedBoolean == 0) {
        return {
            message: "User that needs activation is not verified in the database!",
            status: 406,
        };
    }
    //activation of admin rights
    newAdmin.isAdmin = 1;
    newAdmin.save();
    //return response
    return { verified: true, message: "User succsessfuly verified as admin!", status: 201, };

}


// Deleting user
export const deleteUser = async (id) => {

    ///searching user

    const isDeleted = await database.User.destroy({ where: { id } })


    //deleting
    if (isDeleted) {

        return { message: `User  ${id} deleted` }

    } else {
        return {
            message: "Error please check if user exists",
            status: 201
        }
    }

}


