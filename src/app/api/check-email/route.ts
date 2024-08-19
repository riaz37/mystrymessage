import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import { NextResponse } from "next/server";
import {sendResetEmail} from "@/app/helpers/sendResetEmail";



export async function POST(request: Request) {
    const body = await request.json();
    const { email } = body;

    await dbConnect();

    try {
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" },{ status: 404 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        await user.updateOne({ verifyCode: otp, verifyCodeExpiry: new Date(Date.now() + 10 * 60 * 1000) });

        

        // Send email

        const emailResponse = await sendResetEmail(email, otp);

        if (!emailResponse.success) {
            return NextResponse.json({ success: false, message: "Error sending OTP" },{ status: 500 });
        }

        return NextResponse.json({ success: true, message: "OTP sent successfully" },{ status: 200 });
        
        
        
        
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error sending OTP" },{ status: 500 });
        
    }
}