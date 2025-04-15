import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../config/mongodb';
import User from '../../../../models/User';
import auth from '../../../../middleware/auth';

export async function POST(req) {
    const { valid, error, decoded } = auth(req);
    if (!valid) {
        return NextResponse.json({ message: error }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
        return NextResponse.json({ message: 'No image file provided' }, { status: 400 });
    }

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type || 'image/jpeg';
        const base64 = `data:${mimeType};base64,${buffer.toString('base64')}`;


        await connectMongoDB();

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            { profilePic: base64 },
            { new: true }
        );

        return NextResponse.json({ message: 'Profile picture updated', imageUrl: updatedUser.profilePic }, { status: 200 });
    } catch (err) {
        console.error('Error uploading profile picture:', err);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
