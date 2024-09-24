import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password, adminPassword } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 12);

    await dbConnect();

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const user = new User({
      name,
      email,
      profileData: {},
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred while registering the user" }, { status: 500 });
  }
}