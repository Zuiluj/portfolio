import axios from 'axios';
import React, { Component } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default class PageSwitcher extends Component {
    constructor(props) {
        super(props)

        this.clickNext = this.clickNext.bind(this)
        this.clickPrev = this.clickPrev.bind(this)
    }

    clickNext() {
        let url = this.props.url + `?page=${this.props.page + 1}`
        axios.get(url)
            .then( (res) => {
                if (res.data.data.length > 0) {
                    this.props.nextPageHandler({
                        blogs: res.data.data, 
                        addPage: 1
                    })
                }
            })
    }

    clickPrev() {
        if (this.props.page > 0) {
            let url = this.props.url + `?page=${this.props.page - 1}`
            axios.get(url)
            .then( (res) => {
                if (res) {
                    this.props.nextPageHandler({
                        blogs: res.data.data, 
                        addPage: -1
                    })
                }
            })
        }
    }

    render() {
        return (
            <div className="page_switcher">
                <button className="page_switcher__btn" onClick={this.clickPrev}> <BsChevronLeft/> </button>
                <button className="page_switcher__btn" onClick={this.clickNext}> <BsChevronRight/> </button>
            </div>
        )
    }
}