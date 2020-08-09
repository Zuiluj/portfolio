import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

export default class PageTitle extends Component {
    render() {
        return (
            <Fade top>
                <div className={this.props.classPageHeader}>
                    <div className={this.props.classPageHeaderTitle}> 
                        { this.props.title }
                    </div>
                </div>
            </Fade>
        )
    }
}
