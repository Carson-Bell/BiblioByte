import auth from '../../../../middleware/auth';

export async function GET(req) {

    const { valid, error } = auth(req);

    if (valid) {
        return new Response(JSON.stringify({ authenticated: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify({ authenticated: false, error: error || 'Not authenticated' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
