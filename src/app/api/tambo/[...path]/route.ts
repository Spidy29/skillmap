import { NextRequest, NextResponse } from "next/server";

const TAMBO_API_URL = process.env.TAMBO_API_URL || "https://api.tambo.co";
const TAMBO_API_KEY = process.env.TAMBO_API_KEY;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathString = path.join("/");
    const url = new URL(request.url);
    const queryString = url.search;
    const finalUrl = `${TAMBO_API_URL}/${pathString}${queryString}`;

    try {
        // Debug logging
        console.log("[Proxy] GET Request to:", finalUrl);
        console.log("[Proxy] API Key Present:", !!TAMBO_API_KEY);
        console.log("[Proxy] API Key (first 10 chars):", TAMBO_API_KEY?.substring(0, 10) + "...");

        const response = await fetch(finalUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TAMBO_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        console.log("[Proxy] Response Status:", response.status);

        // Check if streaming response
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("text/event-stream") || contentType.includes("stream")) {
            return new Response(response.body, {
                status: response.status,
                headers: {
                    "Content-Type": contentType,
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                },
            });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("[Proxy] GET Error:", error);
        return NextResponse.json({ error: "Proxy request failed", details: String(error) }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathString = path.join("/");
    const url = new URL(request.url);
    const queryString = url.search;
    const finalUrl = `${TAMBO_API_URL}/${pathString}${queryString}`;

    // Check if this is a streaming endpoint
    const isStreamEndpoint = pathString.includes("stream");

    try {
        const body = await request.json();
        const response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TAMBO_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        // Handle streaming response
        const contentType = response.headers.get("content-type") || "";
        if (isStreamEndpoint || contentType.includes("text/event-stream") || contentType.includes("stream")) {
            return new Response(response.body, {
                status: response.status,
                headers: {
                    "Content-Type": contentType || "text/event-stream",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                },
            });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("[Proxy] POST Error:", error);
        return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathString = path.join("/");
    const finalUrl = `${TAMBO_API_URL}/${pathString}`;

    try {
        const body = await request.json();
        const response = await fetch(finalUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${TAMBO_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("[Proxy] PUT Error:", error);
        return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathString = path.join("/");
    const finalUrl = `${TAMBO_API_URL}/${pathString}`;

    try {
        const response = await fetch(finalUrl, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${TAMBO_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("[Proxy] DELETE Error:", error);
        return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
    }
}
