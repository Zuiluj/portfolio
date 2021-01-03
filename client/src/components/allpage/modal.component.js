import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ModalConfirm = async (props) => {
    await confirm({
        title: 'Are you sure you want to delete this?',
        icon: <ExclamationCircleOutlined/>,
        content: props.desc,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            props.onConfirm();
        },
        onCancel() {
        },
    })
}

export default ModalConfirm