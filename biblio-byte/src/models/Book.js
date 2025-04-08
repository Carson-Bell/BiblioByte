import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    class: {
        type: String,
        required: true,
        trim: true,
    },
    school: {
        type: String,
        required: true,
        trim: true,
    },

});

export default mongoose.models.Books || mongoose.model("Book", bookSchema);