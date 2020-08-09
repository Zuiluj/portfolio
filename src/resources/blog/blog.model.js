import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug);

const blogTagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
)

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true
        },
        slug: {
            type: String,
            slug: "title"
        },
        content: {
            type: Object,
            required: true
        },
        tags: [String]
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export const Blog = mongoose.model('blog', blogSchema)
export const BlogTag = mongoose.model('blogTag', blogTagSchema)