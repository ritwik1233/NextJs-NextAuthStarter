import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";
import crypto from "crypto";
import axios from "axios";
// import { sendResetPasswordEmail } from "@/lib/email"; // You'll need to implement this

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    let serverUrl = `${process.env.API_URL}`;
    await axios.post(`${serverUrl}/api/send-password-reset-email`, {
      email,
      resetToken,
    });

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
