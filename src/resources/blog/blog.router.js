import { Router } from 'express'
import{ getOneBlog, getManyBlog, createBlog, updateBlog, deleteBlog, uploadPhotoForBlog, getAllTags, createTag,updateTag, deleteTag } from './blog.controller'

const pubBlogRouter = Router()
const authBlogRouter = Router()
const authUploadRouter = Router()
const pubTagRouter = Router()
const authTagRouter = Router()

// Blogs 
pubBlogRouter
    .route('/')
    .get(getManyBlog)
    
pubBlogRouter 
    .route('/:id/:slug')
    .get(getOneBlog)

authBlogRouter
    .route('/')
    .post(createBlog)

authBlogRouter
    .route('/:id')
    .put(updateBlog)
    .delete(deleteBlog)

authUploadRouter
    .route('/upload')
    .get(uploadPhotoForBlog)

// Blog tags
pubTagRouter
    .route('/')
    .get(getAllTags)

authTagRouter
    .route('/')
    .post(createTag)

authTagRouter
    .route('/:id')
    .put(updateTag)
    .delete(deleteTag)

export { authBlogRouter, pubBlogRouter, authUploadRouter, pubTagRouter, authTagRouter }