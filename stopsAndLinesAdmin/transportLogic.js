import express from "express";
import { createStop } from "./createStop.js";
import { createRoute } from "./createRoute.js";
import { modifyStop } from "./modifyStop.js";
import { modifyRouteName } from "./routeModifications/modifyRouteName.js"
import { changeDestinationTime } from "./routeModifications/newDestinationTIme.js"
import { changeStopInRoute } from "./routeModifications/changeStopInRoute.js";
import { isAdminCheck } from "./validation/checkIf.js";

const router = express.Router();


router.post("/addNewStop", async (req, res) => {

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

    const response = await createStop(data)
    res.json(response);
  } catch (err) {
    console.log(err);
  }
})

router.post("/addNewTransportRoute", async (req, res) => {

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
    const response = await createRoute(data)
    res.json(response);
  } catch (err) {
    console.log(err);
  }

})

router.put("/modifyStops/:id", async (req, res) => {

  const id = req.params.id
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
    const response = await modifyStop(id, data)
    res.send(response);
  } catch (err) {
    console.log(err);
  }
})


router.put("/modifyRoute/changeRouteName", async (req, res) => {

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
    const response = await modifyRouteName(data)
    res.send(response);
  } catch (err) {
    console.log(err);
  }
})



router.put("/modifyRoute/changeDestinationTime/:id", async (req, res) => {

  const data = req.body
  const id = req.params


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
    const response = await changeDestinationTime(id, data)
    res.send(response);
  } catch (err) {
    console.log(err);
  }
})




router.put("/modifyRoute/changeStopInRoute/:id", async (req, res) => {

  const data = req.body
  const id = req.params


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
    const response = await changeStopInRoute(id, data)
    res.send(response);
  } catch (err) {
    console.log(err);
  }
})


router.put("/modifyRoute/changeStopInRoute/:id", async (req, res) => {

  const data = req.body
  const id = req.params


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
    const response = await changeStopInRoute(id, data)
    res.send(response);
  } catch (err) {
    console.log(err);
  }
})

//delete route

router.delete('/modifyRoute/deleteRoute/:id', async (req, res) => {
  const id = req.params.id

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
    const response = await deleteRoute(id)
    res.send(response);
  } catch (err) {
    console.log(err);
  }
})


export default router