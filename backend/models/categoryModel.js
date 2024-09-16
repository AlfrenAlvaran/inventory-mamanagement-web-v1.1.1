import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Fields are required!"],
        unique: true
    },
    image: {
        type: String,
        required: [true, "Fields are required"],
        default: 'DefaultImage.jpg'
    }
}, {
    timestamps: true
})

categorySchema.pre('save', function (next) {
    if (!this.image) {
        this.image = 'default-image.jpg';
    }
    next();
})

const CateogryModel = mongoose.model("Category", categorySchema)

export default CateogryModel