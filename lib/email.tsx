import nodemailer from "nodemailer"

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendOTPEmail(email: string, code: string) {
  try {
    const mailOptions = {
      from: `"Linowares" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Linowares Login Code",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Login Code</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f0; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #8b7355 0%, #6b5744 100%); padding: 40px 20px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600; letter-spacing: 2px;">LINOWARES</h1>
                        <p style="margin: 10px 0 0; color: #f5f5f0; font-size: 14px; letter-spacing: 1px;">Premium Cotton-Linen Shirts</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="margin: 0 0 20px; color: #2c2c2c; font-size: 24px; font-weight: 600;">Your Login Code</h2>
                        <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 1.6;">
                          Use the code below to sign in to your Linowares account. This code will expire in 10 minutes.
                        </p>
                        
                        <!-- OTP Code -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px; background-color: #f5f5f0; border-radius: 8px;">
                              <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #8b7355; font-family: 'Courier New', monospace;">
                                ${code}
                              </div>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 30px 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
                          If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f5f5f0; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                        <p style="margin: 0 0 10px; color: #999999; font-size: 14px;">
                          © ${new Date().getFullYear()} Linowares. All rights reserved.
                        </p>
                        <p style="margin: 0; color: #999999; font-size: 12px;">
                          Premium cotton-linen shirts crafted with care
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      text: `Your Linowares login code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, you can safely ignore this email.`,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("[v0] Email sent successfully:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

// Verify email configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    console.log("[v0] Email server is ready to send messages")
    return true
  } catch (error) {
    console.error("[v0] Email server verification failed:", error)
    return false
  }
}
