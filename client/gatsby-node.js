const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:5000';

const getAllBlogs = async (page = 0) => {
    return await axios.get(`/api/blogs?page=${page}`)
        .then(res => res.data.data)
        .catch(err => console.log(err))
}

const getAllTags = async (page = 0) => {
    return await axios.get(`/api/blogs/tags`)
        .then(res => res.data.data)
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
    let currentPage = await getAllBlogs();
    let allBlogs = [...currentPage];
    let i, prevPage, nextPage = [1, [], []]
    while (!nextPage || currentPage === prevPage)  {
        prevPage = currentPage;
        currentPage = await getAllBlogs(i);
        nextPage = await getAllBlogs(i + 1);
        allBlogs.push(currentPage);
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
