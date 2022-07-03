import express from "express"
import userController from "./user/userController.js"
import { database } from "./database.js"
import morgan from "morgan";
import transportLogic from "./stopsAndLinesAdmin/transportLogic.js"
import publicDataLogic from "./stopsAndLines/publicDataLogic.js"

//server setup
const app = express()
app.use(morgan("dev"))

//middleware
app.use(express.json())
app.use("/user", userController)
app.use("/adminTransport",transportLogic)
app.use("/publicTransport",publicDataLogic)



try {
    database.sequelize.authenticate();
    // generate tables in database
    database.sequelize.sync()
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
export const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})




