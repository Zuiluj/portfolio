import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import Fade from 'react-reveal/Fade';

import { Layout } from 'antd';
import 'antd/dist/antd.less';

import '../../style/navbar.css'

const { Header } = Layout;
export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navbarDisplay: "flex",
            navbarBtnAnimationClass: false,
            isMobile: false
        }

        this.updateNavbarDisplay = this.updateNavbarDisplay.bind(this)
        this.showNavBar = this.showNavBar.bind(this)
        this.removeNavAfterClick = this.removeNavAfterClick.bind(this)
    }
    
    componentDidMount() {
        this.updateNavbarDisplay(); 
        window.addEventListener('resize', this.updateNavbarDisplay)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateNavbarDisplay)
    }

    // Update navbar display when window is resized
    updateNavbarDisplay() {

        if (window.innerWidth < 700) {
            this.setState({ 
                navbarDisplay: "none",
                navbarBtnAnimationClass: false,
                isMobile: true 
            }) 
        } else {
            this.setState({ 
                navbarDisplay: "flex",  
                isMobile: false
            })
        }

    }

    // Show navbar when mobile btn is clicked
    showNavBar() {

        if (this.state.navbarDisplay === 'none') {
            this.setState({
                navbarDisplay: "flex",
                navbarBtnAnimationClass: true,
            })
        } else {
            this.setState({
                navbarDisplay: "none",
                navbarBtnAnimationClass: false
            })
        }
        
    }

    // Remove navbar when a link is clicked (mobile mode)
    removeNavAfterClick(e) {
        if ((e.target.tagName === 'LI' || e.target.tagName === 'A') && (this.state.isMobile))  {
            this.setState({
                navbarBtnAnimationClass: false,
                navbarDisplay: "none"
            })
        }
    }

    render() {
        const navbarBtnAnimationClass = this.state.navbarBtnAnimationClass
        return (
            <Header style={{ 
                padding: 0, 
                position: "absolute",
                background: "none",
                width: "100%",
                zIndex: 100
                }}>
                    <div id="nav_btn" 
                        onClick={ this.showNavBar } 
                        className={ navbarBtnAnimationClass ? "nav_btn--animation" : "" }
                    >
                        <IoIosArrowDroprightCircle />
                    </div>
                    <Fade top>
                        <ul className="nav" style={{ 
                            display: this.state.navbarDisplay
                        }}
                            onClick={ this.removeNavAfterClick }
                        >
                            <li> <a href="/#home" className="nav__routers"> HOME </a> </li>
                            <li> <a href="/#works" className="nav__routers"> WORKS </a> </li>
                            <li> <a href="/#about" className="nav__routers"> ABOUT </a> </li>
                            <li> <a href="/#contact" className="nav__routers"> CONTACT </a> </li>
                            <li> <NavLink to="/blogs"  className="nav__routers"> BLOGS </NavLink> </li>
                        </ul>
                    </Fade>
            </Header>
        );
    }
}