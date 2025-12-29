import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  comments: {type: String}
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
