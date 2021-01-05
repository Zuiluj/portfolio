import React from 'react';
import { Layout, Divider, Tag } from 'antd';
import { FiChevronsDown } from 'react-icons/fi';
import { RiFacebookCircleLine, RiTwitterLine, RiLinkedinLine } from 'react-icons/ri';
import { Location } from '@reach/router';
import ReactMarkdown from 'react-markdown';

import SEO from "../components/seo";
import '../../style/blogpage.css'

const { Content } = Layout

const SingleBlog = (props) =>{

    return (
        <Content className="singleBlogParent">
            <SEO title={props.blog.title}/>
            <div className="singleblog">    
                <div className="singleblog_title"> 
                    { props.blog.title } 
                </div>
                <div className="singleblog_tags">
                    { props.blog.tags.map( (tag) => <Tag> { tag } </Tag> ) }
                </div>
                <div className="singleblog_share">
                    <Location>
                        { locationProps => <ShareButtons {...locationProps}/> }
                    </Location>
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
                    Created at: { new Date(props.blog.created_at).toDateString() } <br/>
                    Updated at: { new Date(props.blog.updated_at).toDateString() }
                </div>
                
                <div className="singleblog_content">
                    <ReactMarkdown source={ props.blog.content }/>
                </div>
            </div>
        </Content>
    );
}

const ShareButtons = (props) => {
    const { location } = props;
    const currentUrl = location.href;
    
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`;
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`;

    return (
        <div style={{
            textAlign: props.textAlign || "center",
            color: props.color || "black",
            fontSize: props.fontSize || 25
        }}>
            <a href={ facebookUrl } target="_blank" rel="noopener noreferrer"> <RiFacebookCircleLine /> </a>
            <a href={ twitterUrl } target="_blank" rel="noopener noreferrer"> <RiTwitterLine /> </a>
            <a href={ linkedinUrl } target="_blank" rel="noopener noreferrer"> <RiLinkedinLine /> </a>
        </div>
    )
}

export default SingleBlog