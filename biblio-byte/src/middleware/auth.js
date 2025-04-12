import jwt from "jsonwebtoken";

export default function auth(req) {
    const token = req.headers.get('cookie')?.split('token=')[1]?.split(';')[0];
    if (!token) {
        return { valid: false, error: 'No Token Provided' };
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false, error: 'Invalid Token' };
    }
}