import React from 'react';
import { Button, Form, Input } from 'antd';
import { BsTrash} from 'react-icons/bs';

import { authDelReq } from '../services/apiReq.component';
import ModalConfirm from '../allpage/modal.component';

const TagList = (props) => {

    function handleDeleteClick(tag) {
        ModalConfirm({ 
            desc: `Tag to be deleted: '${tag.name}'`,
            onConfirm: () => { authDelReq(`/api/auth/blogs/tags/${tag._id}`, {},
                    { message: `Tag Delete Success`, desc: `Tag: '${tag.name}' deleted!` }
                )
            }
        });
    }

    return (
        <div className="admin_tags">
            { props.tags.map( (tag) => 
                    <Tag
                        key={tag._id}
                        tag={tag}
                        handleDeleteClick={ handleDeleteClick }
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
            <button className="admin_single_tag__delete_btn" id="delete_tag" onClick={ () => props.handleDeleteClick(props.tag) } > < BsTrash /> </button>
        </div>
    )
}

export default TagList