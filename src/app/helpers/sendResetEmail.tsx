import { resend } from "@/lib/resend";
import resetOtpEmail from "../../../email/resetCodeEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendResetEmail(
    email: string,
    otp: string

): Promise<ApiResponse> {
    try {
        await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your email',
      react: resetOtpEmail({ otp }),
        });
        
        return { success: true, message: "Verification email sent" };


        
    } catch (error) {
        console.log(error, "Failed to send verification email");
        return { success: false, message: "Failed to send verification email" };

        
    }
 }
