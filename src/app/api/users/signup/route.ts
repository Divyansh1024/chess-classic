import { NextRequest, NextResponse } from "next/server";
import { toast } from "react-hot-toast";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });    }
}