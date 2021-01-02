import React from 'react';

const SampleWork = (props) => {
    return (
        <div style={{ background: props.background }} className="works_single">
            <div className="works_single__text">
                <a href={ props.link }target="_blank" rel="noopener noreferrer"> { props.name } </a>
            </div>
        </div>
    )
}

export default SampleWork