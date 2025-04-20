import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: {
        type: String, // Name or ID of the reviewer
        required: true,
        trim: true,
    },
    title: {
        type: String, // Title of the review
        required: true,
        trim: true,
    },
    rating: {
        type: Number, // Rating out of 5
        required: true,
        min: 0.5,
        max: 5,
    },
    comment: {
        type: String, // Optional comment
        trim: true,
    },
});

const findsSchema = new mongoose.Schema({
    name: {
        type: String, // Name of the find
        required: true,
        trim: true,
    },
    file: {
        type: String, // URL or path to the file
        required: false,
        trim: true,
    },
    url: {
        type: String, // URL to the find
        required: false,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }
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
    description: {
        type: String,
        required: false,
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
    finds: [findsSchema],
    thumbnail: String,

});

export default mongoose.models.Book || mongoose.model("Book", bookSchema);