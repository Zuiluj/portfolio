import React from 'react';
import { Button, Form, Input } from 'antd';
import { BsTrash} from 'react-icons/bs'

const TagList = (props) => {

    function handleModalDeleteClick() {
        console.log(`BEEP DELETE TAG`)
    }

    return (
        <div className="admin_tags">
            {
                props.tags.map( (tag) => 
                    <Tag
                        key={tag._id}
                        tag={tag}
                        deleteBtn={handleModalDeleteClick}
                    />
                )
            }
        </div>
    )
}

const Tag = (props) => {

    return (
        <div className="admin_single_tag">
            <div className="admin_single_tag__text">
                { props.tag.name }
            </div>
            <button className="admin_single_tag__delete_btn" id="delete_tag" onClick={ props.handleDeleteBtn } > < BsTrash /> </button>
        </div>
    )
}

export default TagList