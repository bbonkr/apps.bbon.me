import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Content } from '../Layouts';
import { appModules } from '../../appModules';

export const About = () => {
    return (
        <Content title="About">
            <p>Prodvider some apps</p>
            <div className="container-fluid">
                <h3>PWA apps</h3>
                <div className="row justify-content-center">
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
                                {app.description}
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </Content>
    );
};
