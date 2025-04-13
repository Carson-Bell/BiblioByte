import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: String, // Name or ID of the reviewer
        required: true,
        trim: true,
    },
    rating: {
        type: Number, // Rating out of 5
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String, // Optional comment
        trim: true,
    },
    date: {
        type: Date, // Date of the review
        default: Date.now,
    },
});

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
    className: {
        type: String,
        required: false,
        trim: true,
    },
    school: {
        type: String,
        required: false,
        trim: true,
    },
    reviews: [reviewSchema], // Array of reviews

});

export default mongoose.models.Book || mongoose.model("Book", bookSchema);