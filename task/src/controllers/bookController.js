import Book from "../models/BooksModel.js";

export async function createBookController(res, req) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "All fields are necessary" });
  }

  const alreadyExists = await Book.findOne({ name });

  try {
    if (alreadyExists) {
      return res.status(400).json({ message: "This book already exists" });
    }
    const createdBook = await Book.create({
      name,
      description,
    });

    res.status(200).json({ message: "Book created successfully", createdBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateBookController(res, req) {
  const { id } = req.params;
  const update = { name: update.name, description: update.description };
  update = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "The book doesnot exist" });
    }
    if (!update.name && !update.description) {
      return res.status(400).json({ message: "There is nothing to update" });
    }
    const updatedBook = Book.findOneAndUpdate({
      name,
      description,
    });
    res.status(200).json({ message: "The book is updated", updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteBookController(req, res) {
  const { id } = req.params;

  try {
    const bookToDelete = Book.findByIdAndDelete(id);
    if (!bookToDelete) {
      return res.status(400).json({ message: "book is not available" });
    }
    res.status(200).json({ message: "The book is successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server" });
  }
}
