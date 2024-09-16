import express from 'express'
import multer from 'multer'
import { addCategory, counts, editCategory, listCategory, removeCategory } from '../controllers/categoryController.js'
import path from 'path'
import {fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const categoryRouter = express.Router()

const uploadPath = path.resolve(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`Uploading file to: ${uploadPath}`);  // Debugging log
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        console.log(`Saving file as: ${Date.now()}-${file.originalname}`);  // Debugging log
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage })
categoryRouter.post('/addCategory', upload.single("image"), addCategory)
categoryRouter.post('/removeCategory', removeCategory)
categoryRouter.get('/listCategory', listCategory)
categoryRouter.get('/countCategory', counts)
categoryRouter.put('/EditCategory',upload.single("image"), editCategory)

export default categoryRouter