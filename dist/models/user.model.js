import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favourites: { type: [String], default: [] },
});
export const User = mongoose.model("User", userSchema);
