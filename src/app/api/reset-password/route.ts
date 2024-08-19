import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const body = await req.json();
    const { otp, password, confirmPassword } = body;
    
    await dbConnect();

    try {
        // Find the user by OTP
        const user = await UserModel.findOne({ verifyCode: otp });

        if (!user) {
            return NextResponse.json({ success: false, message: "Invalid OTP or User not found" }, { status: 404 });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return NextResponse.json({ success: false, message: "Passwords do not match" }, { status: 400 });
        }

        // Hash the new password and save
        user.password = await bcrypt.hash(password, 10);
       
        await user.save();

        return NextResponse.json({ success: true, message: "Password updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ success: false, message: "Error updating password" }, { status: 500 });
    }
}
