import { database } from "../database.js";
import nodemailer from "nodemailer";
import { createToken } from "./tokenCreation.js";


export const resendToken = async (incomingData) => {
    //check database for user
    let user = await database.User.findOne({
        where: {
            email: incomingData.email,
        },
    });
    if (user === null) {
        return {
            message: "Given user does not exist in database!",
            status: 404
        };
    }
    // deleting previous token
    database.userToken.destroy({
        where: { user_id: user.id },
    });
    //new token creation
    const newToken = await createToken(user.id, "VERIFICATION")

    //////email sending
    const data = {
        title: "Token re-send!",
        description: "Here is youre new token! Try to use it. ",
    };

    return await sendEmail([user.email], "Verification", data, newToken);
};


///email template for this function (token resending)
const sendEmail = async (emails, subject, data, uniqtoken) => {
    const receivers = emails.join(", ").toString();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "9c8ed8256f3b59", ////delete when on github
            pass: "fe0d0c7cde5ba2", ////delete when on github
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Verify Bot" <dont-reply@jsguru.net>', // sender address
        to: receivers, // list of receivers
        subject: subject, // Subject line
        // text:text, // plain text body
        html: verificationTemplate(data, uniqtoken.dataValues.value, receivers), // html body
    });
    return { message: `New token successfully send to ${receivers}` }

};
