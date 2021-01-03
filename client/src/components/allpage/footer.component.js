import React, { Component } from 'react';
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'

import '../../style/footer.css';

export default class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <div className="footer__contact">
                    <h2> CONTACT </h2>
                    christianllanillo@gmail.com
                </div>
            
                <div className="footer__social">
                    <h2> SOCIAL </h2>
                        <div className="footer__social_badges">
                            <div className="footer__social_badge"> 
                                <a href="https://twitter.com/JuliuzLlanillo" target="_blank" rel="noopener noreferrer"> 
                                    <AiFillTwitterCircle/>
                                </a> 
                            </div>
                            <div className="footer__social_badge"> 
                                <a href="https://github.com/Zuiluj" target="_blank" rel="noopener noreferrer"> 
                                    <AiFillGithub/>
                                </a> 
                            </div>
                        </div>
                </div>

                <div className="footer__copyright">
                    COPYRIGHT © 2020 JULIUZ CHRISTIAN LLANILLO <br />
                    ALL RIGHTS RESERVED 
                </div>
            </div>
        )
    }
}