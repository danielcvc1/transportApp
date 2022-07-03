import express from "express";
import { createStop } from "./createStop.js";
import { createRoute } from "./createRoute.js";
import { modifyStop } from "./modifyStop.js";

const router = express.Router();


router.post("/addNewStop", async (req, res) => {

  const data = req.body

  try {
    const response = await createStop(data)
    res.json(response);
  } catch (err) {
    console.log(err);
  }
})

router.post("/addNewTransportRoute", async (req, res) => {

  const data = req.body

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


  try {
    const response = await modifyStop(id, data)
    res.send(response);
  } catch (err) {
    console.log(err);
  }





})



export default router