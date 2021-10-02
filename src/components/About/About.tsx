import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Content } from '../Layouts';
import { appModules } from '../../appModules';
import { Helmet } from 'react-helmet-async';

import './style.css';

export const About = () => {
    const title = 'About';

    return (
        <Content title={About}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <p>Prodvides some apps</p>
            <div className="container-fluid">
                <h3>PWA apps</h3>
                <div className="row">
                    {appModules.map((app) => (
                        <div
                            key={app.title}
                            className="col-sm-6 col-md-5 col-lg-4"
                        >
                            <Card
                                title={app.title}
                                footer={
                                    app.linkTo && (
                                        <Link to={app.linkTo} className="btn">
                                            Navigate to app
                                        </Link>
                                    )
                                }
                            >
                                <p className="description">{app.description}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </Content>
    );
};
