export async function POST(req) {
    return new Response(JSON.stringify({ message: "Logged out successfully" }), {
        status: 200,
        headers: {
            'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0;',
            'Content-Type': 'application/json',
        },
    });
}
