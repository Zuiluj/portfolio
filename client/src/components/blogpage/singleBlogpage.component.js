import React, { Component } from 'react';
import { Layout, Divider, Tag, notification } from 'antd';
import { FiChevronsDown } from 'react-icons/fi';
import { RiFacebookCircleLine, RiTwitterLine, RiLinkedinLine } from 'react-icons/ri'
import ReactMarkdown from 'react-markdown';


import '../../style/blogpage.css'

const { Content } = Layout

export default class SingleBlog extends Component {

    constructor(props) {
        super(props);
        this.openNotif = this.openNotif.bind(this)
    }

    openNotif(msg, type, desc) {
        notification[type]({
            message: msg,
            description: desc
        })
    }

    render() {
        let blog = this.props.blog;
        return (
            <Content className="singleBlogParent">
                <div className="singleblog">    
                    <div className="singleblog_title"> 
                        { blog.title } 
                    </div>
                    <div className="singleblog_tags">
                        { blog.tags.map( (tag) => <Tag> { tag } </Tag> ) }
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
                        Created at: { new Date(blog.created_at).toDateString() } <br/>
                        Updated at: { new Date(blog.updated_at).toDateString() }
                    </div>
                    
                    <div className="singleblog_content">
                        <ReactMarkdown source={ blog.content }/>
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