import Category from "../models/CateogoryModel";

export async function createCategoryController(res, req) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "All fields are necessary" });
  }

  const alreadyExists = await Category.findOne({ name });

  try {
    if (alreadyExists) {
      return res.status(400).json({ message: "This category already exists" });
    }
    const createdCategory = await Category.create({
      name,
    });

    res
      .status(200)
      .json({ message: "Category created successfully", createdCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateCategoryController(res, req) {
  const { id } = req.params;
  const update = { name: update.name };
  update = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "The category doesnot exist" });
    }
    if (!update.name) {
      return res.status(400).json({ message: "There is nothing to update" });
    }
    const updatedCategory = Category.findOneAndUpdate({
      name,
    });
    res
      .status(200)
      .json({ message: "The category is updated", updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCategoryController(req, res) {
  const { id } = req.params;

  try {
    const categoryToDelete = Category.findByIdAndDelete(id);
    if (!categoryToDelete) {
      return res.status(400).json({ message: "category is not available" });
    }
    res.status(200).json({ message: "The category is successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server" });
  }
}
