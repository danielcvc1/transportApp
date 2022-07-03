import { database } from "../database.js";
import { createUserValidator } from "./validations/userCreationValidation.js";
import { hashPassword } from "./password_service/hashingPassword.js"
import { createToken } from "../token/tokenCreation.js";
import { sendVerificationEmail } from "../email/email_service.js";
import { passwordValidation } from "./password_service/passwordComparison.js"
import { verifyValidation } from "./validations/verifyValidation.js"
import { validateToken } from "../token/validateToken.js"
import { validateActivation } from "./validations/validateMail.js";


/////User Creation
export const createUser = async (incomingData) => {

    //validation of data
    const validated = createUserValidator.validate(incomingData, {
        abortEarly: false,
    });
    if (validated.error) {
        return {
            message: "Error! Please check youre email or password!",
            status: 400
        }
    }

    //checking if user already exists in db
    let user = await database.User.findOne({
        where: {
            email: incomingData.email,
        },
    });

    if (user) {
        return {
            message: "User already exists with that email!",
            status: 409
        }
    }

    //creating a password(and hashing)
    incomingData.password = await hashPassword(incomingData);

    //creating user in database
    user = await database.User.create(incomingData);


    //generating token
    const token = await createToken(user.id, "VERIFICATION");


    //sending token for verification
    const uniqueToken = token._previousDataValues.value;


    // send email
    sendVerificationEmail(user.email, token.value)

    // return user
    return user

}


/////User Login
export const userLogin = async (incomingData) => {


    if (!incomingData.email) {
        return {
            message: "Error at email input! Check field and try again!",
            status: 400,
        };
    }

    if (!incomingData.password) {
        return {
            message: "Error at password input! Check field and try again!",
            status: 400,
        };
    }

    //check db for user
    const user = await database.User.findOne({
        where: {
            email: incomingData.email,
        },
    });

    //check if user exists
    if (!user) {
        return {
            message: "User with that email does not exist! Please try a valid email.",
            status: 400,
        };
    }

    //check for valid acc
    if (!user.dataValues.verified) {
        return {
            message: "Please verify youre account, so we know you are not a bot!",
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

    //jwt  odraditi


    //return response
    return {
        response: "Succsess!",
        message: `Log in succsesful! Welcome, ${user.firstName}!`,
        // authToken: token
    };



}

/////Verification of the users account

export const verifyUser = async (incomingData) => {
    //validate incoming data
    const validated = verifyValidation.validate(incomingData, { abortEarly: false });
    if (validated.error) {
        return {
            message: validated.error.details[0].message,
            path: validated.error.details[0].path,
        };
    }

    //check if user with inputed email exist
    const user = await database.User.findOne({
        where: {
            email: incomingData.email,
        },
    });

    if (!user) {
        return {
            message: "User not found!",
            status: 404,
        };
    }
    if (user._previousDataValues.verified != null) {
        return {
            message: "User already verified!",
            status: 400,
        };
    }

    //check if token is valid
    const isValid = await validateToken(user.id, incomingData.token, "Verification");
    if (!isValid) {
        return {
            message: "Inputed token is invalid! Please try a valid one.",
            status: 400
        };
    }

    //verification of the user
    user.verified = new Date();
    user.verifiedBoolean = 1;
    user.save();

    return { verified: true, message: "User succsessfuly verified!", status: 201, };


}

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
            admin: 1,
            verifiedBoolean: 1,
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
    if (newAdmin.dataValues.admin==1) {
        return {
            message: "User that needs activation is already an admin! If the account is not trusted check again for validity with the user.",
            status: 406,
        };
    }
    if (newAdmin.dataValues.verifiedBoolean==0) {
        return {
            message: "User that needs activation is not verified in the database!",
            status: 406,
        };
    }
    //activation of admin rights
    newAdmin.admin = 1;
    newAdmin.save();
    //return response
    return { verified: true, message: "User succsessfuly verified as admin!", status: 201, };

}



