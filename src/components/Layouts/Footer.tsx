import React from 'react';
import { GenericLink } from '../GenericLink';
import { ScrollToTop } from '../ScrollToTop';
import { config } from '../../config';

interface FooterProps {
    onClickScrollToTop?: () => void;
}

export const Footer = ({ onClickScrollToTop }: FooterProps) => {
    return (
        <nav className="navbar navbar-fixed-bottom">
            <div className="navbar-content">
                <div className="dropdown dropup with-arrow">
                    <button
                        id="btn-contact-dropdown"
                        className="btn"
                        data-toggle="dropdown"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Contact
                        <i
                            className="fa fa-angle-down ml-5"
                            aria-hidden="true"
                        ></i>
                    </button>
                    <div
                        className="dropdown-menu dropdown-menu-left"
                        aria-labelledby="btn-contact-dropdown"
                    >
                        {/* {record.home.links?.map((link) => (
                            <GenericLink
                                key={link.href}
                                className="dropdown-item"
                                record={link}
                            />
                        ))} */}
                    </div>
                </div>
            </div>
            <span className="navbar-text ml-auto">
                &copy; {config.author.name}, All rights reserved
            </span>
            <ScrollToTop
                containerClassName="navbar-content"
                show
                onClick={onClickScrollToTop}
            />
        </nav>
    );
};
