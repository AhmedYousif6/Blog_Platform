const mongoose = require('mongoose');
const { __esModule } = require('validator/lib/isAlpha');
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [20, 'Content must be at least 20 characteres long'],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,

    },
});

BlogPostSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

BlogPostSchema.statics.findByAuthor = function(authorId) {
    return this.find({ author: authorId }).sort({ createdAt: -1 });
};

BlogPostSchema.methods.updateContent = function(newContent) {
    this.content = newContent;
    this.updatedAt = Date.now();
    return this.save();
};

module.exports = mongoose.model('BlogPost', BlogPostSchema);
