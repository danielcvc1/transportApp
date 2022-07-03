import { logs } from "docker-compose";
import express from "express";
import { getAllStops } from "./getAllStops.js";
import { getStopByName } from "./getStopByName.js";
import { getStopByAdress } from "./getStopByAdress.js";
import { getStopById } from "./getStopById.js";
import { getStopByType } from "./getStopByType.js";
import { getAllRoutes } from "./getAllRoutes.js";
import {getRouteById} from "./getRouteById.js"


const router = express.Router();


router.get("/getAllStops",async (req,res)=>{

    const response=await getAllStops()

    res.json(response)

})


router.get("/getStopByName",async (req,res)=>{

    const data=req.query

    const response=await getStopByName(data)

    res.json(response)

})


router.get("/getStopById",async (req,res)=>{

    const data=req.query

    const response=await getStopById(data)

    res.json(response)

})


router.get("/getStopByType",async (req,res)=>{

    const data=req.query

    const response=await getStopByType(data)

    res.json(response)

})


router.get("/getStopByAdress",async (req,res)=>{

    const data=req.query

    const response=await getStopByAdress(data)

    res.json(response)

})

router.get("/getAllRoutes",async (req,res)=>{

    const data=req.query

    const response=await getAllRoutes(data)

    res.json(response)

})

router.get("/getRouteById",async (req,res)=>{

    const data=req.query

    const response=await getRouteById(data)

    res.json(response)

})

export default router