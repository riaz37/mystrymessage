import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: userNameValidation
});
  


export async function GET(request: Request) {

    await dbConnect();



    try {

        const { searchParams } = new URL(request.url);

       const queryParam = {
            username: searchParams.get("username")
        };
        
        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(result);
        if (!result.success) {
            return new Response("Invalid username", { status: 400 });
        }
        const { username } = result.data;
        const existingUser = await UserModel.findOne({ username: username, isVerified: true });
        if (existingUser) {
            return new Response("Username already exists", { status: 400 });
        }

        else {
            return Response.json({
                success: true,
                message: "Username is available"
            }, {
                status: 200
            })
        }
  
        
    } catch (error) {
        console.log(error, "Error while checking username");
        return new Response("Error while checking username", { status: 500 });
        
    }
}