import fs from 'fs';
import asyncHandler from 'express-async-handler';
import CategoryModel from '../models/categoryModel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.body;
    const file = req.file?.filename || 'DefaultImage.jpg';

    const categoryExist = await CategoryModel.findOne({ categoryName });

    if (categoryExist) {
        return res.status(400).json({ error: true, message: 'Category already exists' });
    }

    const category = new CategoryModel({
        categoryName,
        image: file
    });

    await category.save();

    res.status(200).json({ error: false, message: 'Added Successfully!' });
});

const listCategory = asyncHandler(async (req, res) => {
    const categories = await CategoryModel.find({});
    res.status(200).json(categories);
});

const removeCategory = asyncHandler(async (req, res) => {
    const category = await CategoryModel.findById(req.body.id);

    if (!category) {
        return res.status(404).json({ error: true, message: 'Category not found' });
    }

    try {
        if (category.image && category.image !== 'DefaultImage.jpg') {
            fs.unlink(path.join(__dirname, 'uploads', category.image), err => {
                if (err) console.error('Error deleting file:', err);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }

    await CategoryModel.findByIdAndDelete(req.body.id);
    return res.status(200).json({ error: false, message: 'Successfully deleted category' });
});

const editCategory = asyncHandler(async (req, res) => {
    try {
        const { _id, categoryName } = req.body;
        let photoPath = null;
        const category = await CategoryModel.findById(_id);
        if (!category) {
            return res.status(404).json({ error: true, message: 'Category not found' });
        }
        if (req.file) {
            photoPath = req.file.filename;

            if (category.image && category.image !== 'DefaultImage.jpg') {
                const oldFile = path.join(__dirname, 'uploads', category.image);
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile);
                }
            }
        } else {
            photoPath = category.image;
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            _id,
            {
                categoryName,
                image: photoPath
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(400).json({ error: true, message: 'Failed to update category' });
        }

        res.status(200).json({ error: false, message: 'Updated successfully', category: updatedCategory });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
});
const counts = asyncHandler(async (req, res) => {
    const count = await CategoryModel.countDocuments();
    res.status(200).json({ count });
});

export {
    addCategory,
    removeCategory,
    listCategory,
    counts,
    editCategory
};
