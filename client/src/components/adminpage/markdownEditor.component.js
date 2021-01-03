import React, { Component, useState } from 'react';
import MDEditor, { commands, ICommand, TextState, TextApi } from '@uiw/react-md-editor';

const BlogEditor = (props) => {

    return (
        <div>
            <MDEditor 
                id="md_editor" 
                value={props.value || ""}
                onChange={props.changeFormValues}
                height={500}
            />
        </div>
    )
}

export default BlogEditor