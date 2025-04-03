import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongoDB from '../../../../config/mongodb.ts';
import User from '../../../models/User.js';

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
