import { activateAdmin } from "./adminUserService.js";
import { deleteUser } from "./adminUserService.js";
import express from "express";
import { isAdminCheck } from "./validation/checkIf.js";

const router = express.Router();


////verify admin 

router.post("/activateAdmin", async (req, res) => {

  const data = req.body


  //checking header for authorization
  const bearer = req.header("Authorization")

  const checkIfAdmin = await isAdminCheck(bearer)

  if (checkIfAdmin == false) {

    return res.json({
      message: "You dont have the authorization for this action",
      status: 401
    })

  }

  //------------------------//
  
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

//delete user

router.delete('/deleteUser/:id', async (req, res) => {
  const id = req.params.id

  //checking header for authorization
  const bearer = req.header("Authorization")

  const checkIfAdmin = await isAdminCheck(bearer)

  console.log(checkIfAdmin);

  if (checkIfAdmin == false) {

    return res.json({
      message: "You dont have the authorization for this action",
      status: 401
    })

  }

  //------------------------//
  
  try {
    const response = await deleteUser(id)
    res.send(response);
  } catch (err) {
    console.log(err);
  }
})


export default router