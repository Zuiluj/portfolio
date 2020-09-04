import React, { Component } from 'react';
import { Layout, Button, Form, Input, Divider, Modal, notification, Select } from 'antd';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import { BsTrash, BsPen } from 'react-icons/bs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'antd/dist/antd.less';

import LogoutButton from './adminpage_logout.component';
import PageTitle from '../allpage/pageTitle.component';
import AdminBlogModifyTags from './adminpage_tags.component';
import PageSwitcher from './pageswitcher.component'
import '../../style/adminpage.css';

axios.defaults.withCredentials = true;
const { Content } = Layout

export default class AdminPage extends Component {
    blogFormRef = React.createRef();
    
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            currentBlogId: '',
            currentBlogTitle: '',
            currentBlogTags: '',
            currentBlogPage: 0,
            isUpdateReq: false,
            blogs: [],

            modalVisible: false,
            confirmLoading: false,
            modalErrors: ''
        };

        this.textEditorOnChange = this.textEditorOnChange.bind(this)
        this.submitBlog = this.submitBlog.bind(this)
        this.editBlog = this.editBlog.bind(this)
        this.clearCurrentBlog = this.clearCurrentBlog.bind(this)
        this.handleBlogImgUpload = this.handleBlogImgUpload.bind(this)
        this.openNotif = this.openNotif.bind(this)
    
        this.handleModalDeleteClick = this.handleModalDeleteClick.bind(this)
        this.handleModalConfirm = this.handleModalConfirm.bind(this)
        this.handleModalCancel = this.handleModalCancel.bind(this)

        this.handleBlogPage = this.handleBlogPage.bind(this)
    }
    

    componentDidMount() {
        // Call the api and reload this.state.blogs
        axios.get('/api/blogs?page=0')
        .then( (response) => {
            this.setState({
                blogs: response.data.data
            })
        })
        .catch( (err) => {
            this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
        })
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentBlogId !== this.state.currentBlogId) {
            axios.get('/api/blogs/')
                .then( (response) => {
                    this.setState({
                        blogs: response.data.data
                    })
                })
                .catch( (err) => {
                    this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
                })
        }
    }

    openNotif(msg, type, desc) {
        notification[type]({
            message: msg,
            description: desc
        })
    }


    // -- Blog methods -- //
    textEditorOnChange(textEditorState) {
        this.setState({
            editorState: textEditorState
        });
    }

    editBlog(props) {
        this.blogFormRef.current.setFieldsValue({
            blog_title: props.blog_title,
            blog_tags: props.blog_tags
          });
        this.setState({
            editorState: EditorState.createWithContent(props.blog_content),
            currentBlogId: props.blog_id,
            isUpdateReq: true
        })

    }

    clearCurrentBlog(props) {
        this.setState({
            editorState: EditorState.createEmpty(),
            currentBlogId: '',
            currentBlogTitle: '',
            currentBlogTags: undefined,
            isUpdateReq: false,
        })

        this.blogFormRef.current.setFieldsValue({
            blog_title: this.state.currentBlogTitle,
            blog_tags: this.state.currentBlogTags
        })
    }

    submitBlog(props) {  
        let textContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
        let blog_id = this.state.currentBlogId

        if (this.state.isUpdateReq) {
            axios.put(`/api/auth/blogs/${blog_id}`, {
                title: props.blog_title,
                tags: props.blog_tags,
                content: textContent
                })
                    .then( (response) => {
                        if (response.status === 200) {
                            this.setState({
                                editorState: EditorState.createEmpty(),
                                currentBlogId: '',
                                currentBlogTitle: '',
                                currentBlogTags: undefined,
                                isUpdateReq: false
                            })
                            
                            this.blogFormRef.current.setFieldsValue({
                                blog_title: this.state.currentBlogTitle,
                                blog_tags: this.state.currentBlogTags
                            })
                            

                            this.openNotif('Blog updated!', 'success', 'You successfully updated a blog!')
                        }
                    })
                    .catch( (err) => {
                        this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
                    })
        } else {
            axios.post('/api/auth/blogs/', {
                title: props.blog_title,
                tags: props.blog_tags,
                content: textContent
            })
                .then( (response) => {
                    if (response.status === 201) {
                        this.setState({
                            currentBlogTitle: '',
                            editorState: EditorState.createEmpty(),
                            currentBlogTags: undefined,
                            currentBlogId: undefined // HACK: set to undefined for the component to update ('' != undefined)
                        })

                        this.blogFormRef.current.setFieldsValue({
                            blog_title: this.state.currentBlogTitle,
                            blog_tags: this.state.currentBlogTags
                        })

                        this.openNotif('Blog Created!', 'success', 'You successfully created a blog!')
                    }

                })
                .catch( (err) => {
                    this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message) )
                })
        }
    }

    async handleBlogImgUpload(file) {
        var clientId = ''
        await axios.get('/api/auth/photos/upload')
            .then( (response) => {
                clientId = response.data.imgUploadKey
            })
        
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.open('POST', 'https://api.imgur.com/3/image')
                xhr.setRequestHeader('Authorization', 'Client-ID ' + clientId)
                const data = new FormData()
                data.append('image', file)
                xhr.send(data)
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText)
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText)
                    reject(error)
                });
            }
          )
    }


    // -- Modal methods --// 
    handleModalDeleteClick(props) {
        this.setState({
            currentBlogId: props.blog_id,
            modalVisible: true
        })
    }

    handleModalConfirm(event) {
        this.setState({
            confirmLoading: true
        })
        axios.delete(`/api/auth/blogs/${this.state.currentBlogId}`)
            .then( (response) => {
                if (response.status === 200) {
                    this.setState({
                        confirmLoading: false,
                        modalVisible: false,
                        currentBlogId: ''
                    })
                }
                this.openNotif('Blog deleted!', 'success', 'Blog was successfully deleted! Klik-klank!')
                
            })
            .catch( (err) => {
                this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
            })

        this.setState({
            modalVisible: false
        })
    }

    handleModalCancel(event) {
        this.setState({
            currentBlogId: '',
            modalVisible: false
        })
    }


    /* ------------- */
    /* Page switcher */
    /* ------------- */
    handleBlogPage(props) {
        let page = this.state.currentBlogPage + props.addPage
        this.setState({
            blogs: props.blogs,
            currentBlogPage: page
        })
    }

    render() {
        return (
            <Layout>
                <PageTitle 
                    classPageHeader="admin_header"
                    classPageHeaderTitle="admin_header__title"
                    title="Admin"
                />
                <LogoutButton reactHistory={this.props.history}/>


                <Divider orientation="center" style={{ 
                        color: '#33968B', 
                        fontSize: '40px', 
                        lineHeight: '50px',
                        mixBlendMode: 'darken',
                        margin: '3rem 0',
                        fontFamily: 'Unica One'
                }}> BLOGS </Divider>

                <Content>
                    <Form className="submit_blog" onFinish={ this.submitBlog } ref={ this.blogFormRef }>
                        <Form.Item 
                            name="blog_title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Blog title required',
                                },
                            ]}
                            shouldUpdate={ this.changeBlogTitle }
                        >
                            <Input 
                                placeholder="Blog Title" 
                                className="blog_title__input" 
                            />
                        </Form.Item>

                        <AdminBlogTags />

                        <Editor
                            editorState={ this.state.editorState }
                            toolbarClassName="textedit_toolbar"
                            wrapperClassName="textedit_wrapper"
                            editorClassName="textedit_editor"
                            onEditorStateChange={ this.textEditorOnChange }
                            toolbar={{
                                image: { 
                                    uploadCallback: this.handleBlogImgUpload, 
                                    alt: { present: true, mandatory: true },
                                    alignmentEnabled: true,
                                    previewImage: true
                                },
                                fontSize: {
                                    options: [19, 20, 22, 24, 25, 26, 28, 30]
                                }
                            }}
                        />

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="create_blog__submit_btn">
                                Create Blog
                            </Button>
                            <Button type="secondary" className="create_blog__submit_btn" onClick={ this.clearCurrentBlog }>
                                Clear
                            </Button>
                        </Form.Item>
                    </Form>
                
                <Divider orientation="center" style={{ 
                        color: '#33968B', 
                        fontSize: '40px', 
                        lineHeight: '50px',
                        mixBlendMode: 'darken',
                        margin: '3rem 0',
                        fontFamily: 'Unica One'
                }}> MODIFY TAGS </Divider>

                <AdminBlogModifyTags/>

                <Divider orientation="center" style={{ 
                        color: '#33968B', 
                        fontSize: '40px', 
                        lineHeight: '50px',
                        mixBlendMode: 'darken',
                        margin: '3rem 0',
                        fontFamily: 'Unica One'
                }}> MODIFY BLOGS </Divider>

                    <div className="modify_blogs">
                        <Modal
                            title="Delete Blog"
                            visible={ this.state.modalVisible }
                            onOk={ this.handleModalConfirm }
                            confirmLoading={ this.state.confirmModalLoading }
                            onCancel={ this.handleModalCancel }
                            >
                            <p> Do you really want to delete this blog? </p>
                            <p className="modal_errors">{ this.state.modalErrors } </p>
                        </Modal>

                        <AdminBlogList blogs={ this.state.blogs } editBlog={ this.editBlog } openNotif={ this.openNotif} deleteBlog={ this.handleModalDeleteClick } />
                        <PageSwitcher 
                            page={this.state.currentBlogPage}
                            nextPageHandler={this.handleBlogPage}
                            url={`/api/blogs`}
                        />
                    </div>
                </Content>

            </Layout>
        );
    }
}





class AdminBlogTags extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: []
        }
    }

    componentDidMount() {
        axios.get('/api/blogs/tags')
        .then( (response) => {
            this.setState({
                tags: response.data.data
            })
        })
        .catch( (err) => {
            this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
        })
    }

    render() {
        return (
            <div>
            <Form.Item
                name="blog_tags"
                label="Topic Tags"
                rules={[{ required: true, message: 'Please select the tags!', type: 'array' }]}
            >
                    <Select mode="multiple" placeholder="Please select the tags.">
                    {
                        this.state.tags.map( (tag) => {
                            return <Select.Option key={tag._id} value={tag.name}> { tag.name } </Select.Option>
                        })
                    }
                    </Select>
            </Form.Item>
            </div>
        )
    }
}


class AdminBlogList extends Component {

    render() {
        return (
            <div className="admin_blogs">
                { this.props.blogs.map( (blog) => {
                        return <AdminSingleBlog 
                            key={ blog._id }
                            blogId={ blog._id }
                            blogTitle={ blog.title } 
                            blogTags={ blog.tags }
                            blogCreatedDate={ blog.created_at }
                            blogUpdatedDate={ blog.updated_at }
                            blogContent={ blog.content }
                            editBlog={ this.props.editBlog }
                            openNotif={ this.props.openNotif }
                            deleteBlog={ this.props.deleteBlog }
                            />
                    }) 
                }               
            </div>
        )
    }
}


class AdminSingleBlog extends Component {
    constructor(props) {
        super(props)

        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleEditClick(event) {
        this.props.editBlog({
            blog_id: this.props.blogId,
            blog_title: this.props.blogTitle,
            blog_tags: this.props.blogTags,
            blog_content: convertFromRaw(JSON.parse(this.props.blogContent))
        })
    }

    handleDeleteClick(event) {
        this.props.deleteBlog({
            blog_id: this.props.blogId
        })
    }

    render() {
        return (
            <div className="admin_single_blog">
                <div className="admin_single_blog__date">
                    Created: { new Date(this.props.blogCreatedDate).toUTCString() }
                    <br />
                    Updated: { new Date(this.props.blogUpdatedDate).toUTCString() }
                </div>
                <div className="admin_single_blog__title">
                    { this.props.blogTitle }
                </div> 
                <div className="admin_single_blog__modify">
                    <button className="admin_single_blog__modify_btn" id="edit_blog" onClick={ this.handleEditClick } > < BsPen /> </button>
                    <button className="admin_single_blog__modify_btn" id="delete_blog" onClick={ this.handleDeleteClick } > < BsTrash /> </button>
                </div>
            </div>
        )
    }
}
