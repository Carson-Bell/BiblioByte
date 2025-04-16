import connectMongoDB from '../../../../../config/mongodb';
import User from '../../../../models/User';
import auth from '../../../../middleware/auth';

export async function GET(req) {
    const { valid, decoded, error } = auth(req);

    if (!valid) {
        return new Response(JSON.stringify({ error }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    await connectMongoDB();

    const user = await User.findById(decoded.id).lean();

    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 404,
        });
    }

    return new Response(JSON.stringify({
        fullName: user.name,
        email: user.email,
        school: user.university,
        profilePic: user.profilePic
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
