import { database } from "../../database.js";
import { routeNameValid } from "../validation/routeNameValidation.js"

export const modifyRouteName = async (data) => {

            if (!data) {
                return {
                    message: "Old route name and new route name required for changing of the name",
                    status: 400

                }
            }
            //checking if same name
            if (data.oldName == data.newName) {
                return {
                    message: "Old name can not be the same as the new name!",
                    status: 400
                }
            }

            /////validate incoming data 
            const validated = routeNameValid.validate(data, {
                abortEarly: false,
            });
            if (validated.error) {
                return {
                    message: "Error! Please check inputed data!",
                    status: 400
                }
            }

            ///change what needs to change 

            //finding in db
            let oldRouteName = await database.Route.findOne({
                where: {
                    nameOfRoute: data.oldName,
                },
            });
            //if exists
            if (!oldRouteName) {
                return {
                    message: "Bus route with that name does not exists!!",
                    status: 409
                }
            }
            ///changing data
            oldRouteName.nameOfRoute = data.newName


            await oldRouteName.save()
            await oldRouteName.reload()

            return {
                message: `Route name has been modified! From ${data.oldName} to ${data.newName}. `
            }


        

}