import connectMongoDB from '../../../../../config/mongodb';
import User from '../../../../models/User';
import auth from '../../../../middleware/auth';

export async function POST(req) {
    const { valid, decoded, error } = auth(req);
    if (!valid) {
        return new Response(JSON.stringify({ error }), { status: 401 });
    }

    const { fullName, email, school, password, profilePic } = await req.json();

    await connectMongoDB();

    try {
        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            {
                name: fullName,
                email,
                school,
                ...(password && { password }),
                profilePic
            },
            { new: true }
        );

        return new Response(JSON.stringify({ message: 'Profile updated', user: updatedUser }), {
            status: 200,
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Update failed' }), { status: 500 });
    }
}