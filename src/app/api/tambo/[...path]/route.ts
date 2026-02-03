import { NextRequest, NextResponse } from "next/server";

const TAMBO_API_URL = process.env.NEXT_PUBLIC_TAMBO_URL || "https://api.tambo.ai/v1";
const TAMBO_API_KEY = process.env.TAMBO_API_KEY || process.env.NEXT_PUBLIC_TAMBO_API_KEY;

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    if (!TAMBO_API_KEY) {
        return NextResponse.json(
            { error: "Missing Tambo API Key" },
            { status: 500 }
        );
    }

    const { path } = await params;
    // Join path segments to form the target endpoint
    const endpoint = path.join("/");
    const url = `${TAMBO_API_URL}/${endpoint}`;

    try {
        const body = await req.json();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TAMBO_API_KEY}`,
            },
            body: JSON.stringify(body),
        });

        // Check if the response is a stream
        if (response.headers.get("Content-Type")?.includes("text/event-stream")) {
            return new NextResponse(response.body, {
                headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    Connection: "keep-alive",
                },
            });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    if (!TAMBO_API_KEY) {
        return NextResponse.json(
            { error: "Missing Tambo API Key" },
            { status: 500 }
        );
    }

    const { path } = await params;
    const endpoint = path.join("/");
    const url = `${TAMBO_API_URL}/${endpoint}`;
    const searchParams = req.nextUrl.searchParams.toString();
    const finalUrl = searchParams ? `${url}?${searchParams}` : url;

    try {
        const response = await fetch(finalUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TAMBO_API_KEY}`,
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
