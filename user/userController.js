import express from "express";
import { database } from "../database.js";
import { createUser } from "./userService.js"
import { userLogin } from "./userService.js"
import { verifyUser } from "./userService.js";
import { resendToken } from "../token/tokenResend.js";
import { activateAdmin } from "./userService.js";

const router = express.Router();

//////REGISTER//////
router.post("/register", async (req, res) => {


  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Error in input of data! Please check your data!"
    })
  }
  try {

    const response = await createUser(req.body);
    res.json(response);
  } catch (err) {
    console.log(err);
  }

})

//////LOGIN//////
router.post("/login", async (req, res) => {

  const data = req.body

  const response = await userLogin(data);

  res.status(200).json({ response: response });


})

//////ACCOUNT VERIFICATION//////
router.post("/verification", async (req, res) => {

  const data = req.body;
  if (!data.email || !data.token) {
    res.status(404).json({
      key: "NOT_FOUND",
      message:
        "Error at data input! Please check youre data and then proceed to next step.",
    });
    return;
  }
  try {
    const response = await verifyUser(data);
    if (!response) {
      return res.status(502).json({ message: "Error at user verification! Please try again in a little while." })
    }
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
  }


})

//////RESENDING VERIFICATION TOKEN////// link for this action is found in the e-mail that you get when you make an account
router.post("/resendToken", async (req, res) => {

  const data = req.query;

  const resend = await resendToken(data);
  if (!resendToken) {
    return { message: "Error at resend" };
  }
  res.send({ message: resend });

})

router.post("/activateAdmin", async (req, res) => {

  const data = req.body
  try {
    const response = await activateAdmin(data);
    if (!response) {
      return res.status(502).json({ message: "Error at user activation! Please try again in a little while." })
    }
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
  }


})














export default router