const axios = require('axios');
axios.defaults.baseURL = `http://localhost:${process.env.PORT}`;

const getAllBlogs = async (page = 0) => {
    return await axios.get(`/api/blogs?page=${page}`)
        .then(res => res.data.data || [])
        .catch(err => console.log(err))
}

const getAllTags = async (page = 0) => {
    return await axios.get(`/api/blogs/tags`)
        .then(res => res.data.data || [])
        .catch(err => console.log(err))
}

const processBlog = (blog, createNodeId, createContentDigest) => {
    let processedBlog = {
        id: createNodeId(blog._id),
        parent: null,
        children: [],
        internal: {
            type: `Blog`,
            mediaType: `text/html`,
            content: JSON.stringify(blog),
            contentDigest: createContentDigest(blog)
        },
    }

    return {
        ...blog,
        ...processedBlog
    }
}

const processBlogTag = (tag, createNodeId, createContentDigest) => {
    let processedBlog = {
        id: createNodeId(tag._id),
        parent: null,
        children: [],
        internal: {
            type: `BlogTag`,
            mediaType: `text/html`,
            content: JSON.stringify(tag),
            contentDigest: createContentDigest(tag)
        },
    }

    return {
        ...tag,
        ...processedBlog
    }
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest}) => {
    const { createNode } = actions

    let allTags = await getAllTags();
    let allBlogs = []
    let blogList = await getAllBlogs();
    let i = 1;
    while ( blogList.length != 0 ) {
        allBlogs.push(...blogList)
        blogList = await getAllBlogs(i);
        i += 1;
    }

    allTags.forEach( (tag) => createNode(processBlogTag(tag, createNodeId, createContentDigest)))
    allBlogs.forEach( (blog) => createNode(processBlog(blog, createNodeId, createContentDigest)))

    return
}

exports.createPages = async ({ graphql, actions: { createPage }}) => {
    const result = await graphql(`
        query {
            allBlog {
                nodes {
                    id
                    slug
                    tags
                    title
                    content
                    created_at
                    updated_at
                }
            }
        }
    `);

    result.data.allBlog.nodes.forEach(blog => {
        createPage({
            path: `/blogs/${blog.slug}`,
            component: require.resolve("./src/templates/singleBlog.template.js"),
            context: { blog }
        })
    })

}
