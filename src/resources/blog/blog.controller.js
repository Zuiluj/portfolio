import { Blog, BlogTag } from './blog.model'


export const getOneBlog = async function(req, res) {
    try {
        const doc = await Blog
            .findOne({ _id: req.params.id })
            .lean()
            .exec()

        if (!doc) {
            return res.status(400).end()
        }

        res.status(200).json({ data: doc })
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
}

export const getManyBlog = async function(req, res) {
    let rawQueries = [
        req.query.tags ? {tags: {$in: decodeURIComponent(req.query.tags).split(",") }} : undefined,
        req.query.searchTerms ? {title: {$in: decodeURIComponent(req.query.searchTerms) }} : undefined,
        req.query.date ? {created_at: {$gte: decodeURIComponent(req.query.date) }} : undefined
    ]

    let page = req.query.page ? decodeURIComponent(req.query.page) : undefined
    let limit = 5
    
    let queries = []
    for (let query of rawQueries) {
        if (query == undefined) {
            continue
        } else {
            queries.push(query)
        }
    }
    
    let fullQuery = undefined
    queries[0] != undefined ? fullQuery = { $and: queries } : undefined

    try {
        const docs = await Blog
            .find(fullQuery)
            .sort({updated_at: 'descending'})
            .skip(parseInt(page) * limit)
            .limit(limit)
            .lean()
            .exec()

        res.status(200).json({ data: docs })
    } catch(err) {
        console.error(err)
        res.status(400).send(JSON.stringify(err))
    }
}

export const createBlog = async function(req, res) {
    try {
        const doc = await Blog.create({ ...req.body })
        res.status(201).json({ data: doc })
    } catch (err) {
        console.error(err)
        res.status(400).send({ errors: err.message })
    }
}

export const updateBlog = async function(req, res) {
    try {
        const doc = await Blog.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body,
            { new: true }
        )

        if (!doc) {
            return res.status(400).end()
        }

        res.status(200).send({ data: doc })
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
}

export const deleteBlog = async function(req, res) {
    try {
        const removed = await Blog.findOneAndRemove({ _id: req.params.id })
        
        if (!removed) {
            return res.status(400).end()
        }

        return res.status(200).json({ data: removed })
    } catch (err) {
        console.error(err)
        return res.status(400).end()
    }
}

export const getAllTags = async function(req, res) {
    try {
        const docs = await BlogTag
            .find()
            .lean()
            .exec()
        res.status(200).json({ data: docs })
    } catch(err) {
            console.error(err)
            res.status(400).end()
    }
}

export const updateTag = async function(req, res) {
    try {
        const doc = await BlogTag.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body,
            { new: true }
        )

        if (!doc) {
            return res.status(400).end()
        }

        res.status(200).send({ data: doc })
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
}

export const createTag = async function(req, res) {
    try {
        const doc = await BlogTag.create({ ...req.body })
        res.status(201).json({ data: doc })
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
}

export const deleteTag = async function(req, res) {
    try {
        const removed = await BlogTag.findOneAndRemove({ _id: req.params.id })

        if (!removed) {
            return res.status(400).end()
        }

        return res.status(200).json({ data: removed })
    } catch (err) {
        console.error(err)
        return res.status(400).end()
    }
}

export const uploadPhotoForBlog = async function(req, res) {
    try {
        return res.status(200).send({ imgUploadKey: process.env.IMGUR_CLIENT_ID })

    } catch (err) {
        console.error(err)
        return res.status(400).end()
    }
}