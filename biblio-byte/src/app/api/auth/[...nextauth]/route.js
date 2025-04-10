import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongoDB from '../../../../config/mongodb.ts';
import User from '../../../models/User.js';
import { verifyToken } from '../../../middleware/auth.js';


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                await connectMongoDB();
                const user = await User.findOne({ email });

                if (user && user.password === password) {
                    return { id: user._id, email: user.email };
                }

                return null;
            }

        })
    ],
    pages: {
        signIn: '/login', // optional: custom login page
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

export async function POST(req) {
    const { valid, error } = verifyToken(req);

    if (!valid) {
        return new Response(JSON.stringify({ error }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Proceed with the rest of the logic
    return new Response(JSON.stringify({ message: 'Authorized request' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST() {
    return new Response(JSON.stringify({ message: "Logged out successfully" }), {
        status: 200,
        headers: {
            'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0;',
            'Content-Type': 'application/json',
        },
    });
}