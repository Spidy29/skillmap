import { NextRequest, NextResponse } from "next/server";

const TAMBO_API_URL = process.env.TAMBO_API_URL || "https://api.tambo.ai/v1";
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
        const response = await fetch(finalUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TAMBO_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("[Proxy] GET Error:", error);
        return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
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
