import React, { Component } from 'react';
import { Layout, Divider, Tag, notification } from 'antd';
import axios from 'axios';
import { convertFromRaw, EditorState } from 'draft-js';
import { FiChevronsDown } from 'react-icons/fi';
import { Editor } from 'react-draft-wysiwyg';
import { RiFacebookCircleLine, RiTwitterLine, RiLinkedinLine } from 'react-icons/ri'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import '../../style/blogpage.css'

const { Content } = Layout

export default class SingleBlog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            date: "",
            tags: [],
            content: ""
        }

        this.openNotif = this.openNotif.bind(this)
    }

    openNotif(msg, type, desc) {
        notification[type]({
            message: msg,
            description: desc
        })
    }

    componentDidMount() {
        axios.get(`/api/blogs/${this.props.match.params.id}/${this.props.match.params.slug}`)
            .then( response => {
                this.setState({
                    title: response.data.data.title,
                    createdDate: new Date(response.data.data.created_at).toUTCString(),
                    updatedDate: new Date(response.data.data.updated_at).toUTCString(),
                    tags: response.data.data.tags,
                    content: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.data.content)))
                })
            })
            .catch( err => {
                this.openNotif('Error!', 'error', JSON.stringify(err.response.data) || JSON.stringify(err.message))
            })

    }

    render() {
        return (
            <Content className="singleBlogParent">
                <div className="singleblog">    
                    <div className="singleblog_title"> 
                        { this.state.title } 
                    </div>
                    <div className="singleblog_tags">
                        { this.state.tags.map( (tag) => <Tag> { tag } </Tag> ) }
                    </div>
                    <div className="singleblog_share">
                        <ShareButtons />
                    </div>
                    <Divider orientation="center" style={{ 
                        color: '#33968B', 
                        fontSize: '40px', 
                        lineHeight: '50px',
                        mixBlendMode: 'darken',
                        margin: '3rem 0',
                        fontFamily: 'Unica One'
                    }}> <FiChevronsDown /> </Divider> 
                    <div className="singleblog_date"> 
                        Created at: { this.state.createdDate } <br/>
                        Updated at: { this.state.updatedDate }
                    </div>
                    
                    <div className="singleblog_content">
                        <Editor
                            toolbarHidden
                            editorState={ this.state.content }
                            editorClassName="singleblog_content__editor"
                            readOnly={true}
                        />
                    </div>
                </div>
            </Content>
        );
    }

}

class ShareButtons extends Component {

    render() {
        const currentUrl = window.location.href;
        
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        const twitterUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`;
        const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`;

        return (
            <div style={{
                textAlign: this.props.textAlign || "center",
                color: this.props.color || "black",
                fontSize: this.props.fontSize || 25
            }}>
                <a href={ facebookUrl } target="_blank" rel="noopener noreferrer"> <RiFacebookCircleLine /> </a>
                <a href={ twitterUrl } target="_blank" rel="noopener noreferrer"> <RiTwitterLine /> </a>
                <a href={ linkedinUrl } target="_blank" rel="noopener noreferrer"> <RiLinkedinLine /> </a>
            </div>
        )
    }
}