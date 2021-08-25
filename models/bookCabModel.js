import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const bookCabSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
        },
        pickup_lat: {
            type: String,
            required: true,
        },
        pickup_lon: {
            type: String,
            required: true,
        },
        drop_lat: {
            type: String,
            required: true,
        },
        drop_lon: {
            type: String,
            required: true,
        },
        cab_id: {
            type: String,
            required: "Cab_id is required",
            minlength: [2, "Too short"]
        }
    },
    { timestamps: true }
);

const BookCab = mongoose.model('BookCab', bookCabSchema);

export default BookCab;
