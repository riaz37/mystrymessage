import { resend } from "@/lib/resend";
import OtpEmail from "../../../email/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendEmailVerification(
    email: string,
    username: string,
    verifyCode: string,

): Promise<ApiResponse> {
    try {
        await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your email',
      react: OtpEmail({ username, verifyCode }),
        });
        
        return { success: true, message: "Verification email sent" };


        
    } catch (error) {
        console.log(error, "Failed to send verification email");
        return { success: false, message: "Failed to send verification email" };

        
    }
 }
