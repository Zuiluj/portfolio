import React, { Component } from 'react';
import { Button, Form, Input, Modal, notification} from 'antd';
import axios from 'axios';
import { BsTrash} from 'react-icons/bs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'antd/dist/antd.less';

import '../../style/adminpage.css';

export default class AdminBlogModifyTags extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: [],
            currentTagId: '',
            modalVisible: false,
            modalConfirmLoading: false
        }
        this.handleModalDeleteClick = this.handleModalDeleteClick.bind(this)
        this.handleModalCancel = this.handleModalCancel.bind(this)
        this.handleModalConfirm = this.handleModalConfirm.bind(this)
        this.updateComponentByTagId = this.updateComponentByTagId.bind(this)
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentTagId !== this.state.currentTagId) {
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
    }

    updateComponentByTagId(props) {
        this.setState({
            currentTagId: props.tag_id
        })
    }

    // -- Notification --//
    openNotif(msg, type, desc) {
        notification[type]({
            message: msg,
            description: desc
        })
    }

    // -- Modal methods --// 
    handleModalDeleteClick(props) {
        this.setState({
            currentTagId: props.tag_id,
            modalVisible: true
        })
    }
    
    handleModalCancel(event) {
        this.setState({
            modalVisible: false
        })
    }

    handleModalConfirm(event) {
        this.setState({
            modalConfirmLoading: true
        })
        axios.delete(`/api/auth/blogs/tags/${this.state.currentTagId}`)
            .then( (response) => {
                if (response.status === 200) {
                    this.setState({
                        modalConfirmLoading: false,
                        modalVisible: false,
                        currentTagId: ''
                    })
                }
                this.openNotif('Tag deleted!', 'success', 'Blog was successfully deleted! Klik-klank!')
                
            })
            .catch( (err) => {
                this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
            })

        this.setState({
            modalVisible: false
        })
    }
    
    render() {
        return(
            <div className="admin_tags">
                <div className="admin_create_tags">
                    <AdminBlogCreateTag updateTagId={this.updateComponentByTagId}/>
                </div>
                <div className="admin_modify_tags">
                    <Modal
                        title="Delete Tag"
                        visible={ this.state.modalVisible }
                        onOk={ this.handleModalConfirm }
                        confirmLoading={ this.state.modalConfirmLoading }
                        onCancel={ this.handleModalCancel } 
                        >
                        <p> Do you really want to delete this tag? </p>
                    </Modal>
                    {
                        this.state.tags.map( (tag) => 
                            <AdminBlogSingleTag
                            key={tag._id}
                            tag_id={tag._id}
                            tagName={tag.name}
                            deleteBtn={this.handleModalDeleteClick}
                            />
                        )
                    }
                    
                </div>
            </div>
        )
    }

}

class AdminBlogCreateTag extends Component {
    tagFormRef = React.createRef();

    constructor(props) {
        super(props)

        this.openNotif = this.openNotif.bind(this)
        this.clearCurrentTag = this.clearCurrentTag.bind(this)
        this.submitTag = this.submitTag.bind(this)
        this.updateCurrentTagId = this.updateCurrentTagId.bind(this)
    }

    openNotif(msg, type, desc) {
        notification[type]({
            message: msg,
            description: desc
        })
    }

    updateCurrentTagId() {
        // Change curretTagId state from parent to update component
        this.props.updateTagId({
            tag_id: undefined
        })
    }

    clearCurrentTag(props) {
        this.tagFormRef.current.setFieldsValue({
            tag_name: ''
        })
    }

    submitTag(props) {
        axios.post('/api/auth/blogs/tags', {
                name: props.tag_name
            })
                .then( (response) => {
                    if (response.status === 201) {
                        this.updateCurrentTagId()
                        this.clearCurrentTag()
                        this.openNotif('Tag Created!', 'success', 'You successfully created a new tag for your blogs!')
                    }
                })
                .catch( (err) => {
                    console.log(err)
                    this.openNotif('Error!', 'error', err || JSON.stringify(err.message) )
                })
    }

    render() {
        return (
            <Form className="create_tag_form" onFinish={ this.submitTag } layout="vertical" ref={this.tagFormRef}>
                <h2> Create Tag </h2>
                <Form.Item 
                    name="tag_name"
                    rules={[
                        {
                            required: true,
                            message: 'Tag name required',
                        },
                    ]}
                >
                    <Input 
                        placeholder="Tag name" 
                        className="tag_name__input" 
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="secondary" className="create_tag__btn" onClick={ this.clearCurrentTag }>
                        Clear
                    </Button>
                    <Button type="primary" htmlType="submit" className="create_tag__btn">
                        Create Tag
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

class AdminBlogSingleTag extends Component {
    constructor(props) {
        super(props)

        this.handleDeleteBtn = this.handleDeleteBtn.bind(this)
    }

    handleDeleteBtn(props) {
        this.props.deleteBtn({
            tag_id: this.props.tag_id
        })
    }

    render() {
        return(
            <div className="admin_single_tag">
                <div className="admin_single_tag__text">
                    { this.props.tagName }
                </div>
                <button className="admin_single_tag__delete_btn" id="delete_tag" onClick={ this.handleDeleteBtn } > < BsTrash /> </button>
            </div>
        )
    }
}