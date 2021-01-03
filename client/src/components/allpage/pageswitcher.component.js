import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { HiRefresh } from 'react-icons/hi';

import '../../style/pageSwitcher.css'

const PageNavigator = (props) => {
    return (
        <div className="page_switcher">
            <button className="page_switcher__btn" onClick={props.prev}> <BsChevronLeft/> </button>
            <button className="page_switcher__btn" onClick={props.next}> <BsChevronRight/> </button>
            <button className="page_switcher__btn" onClick={props.refresh}> <HiRefresh /> </button>
        </div>
    )
}

export default PageNavigator;