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
                    {appModules.map((content) => (
                        <div className="col-sm-6 col-md-5 col-lg-4">
                            <Card
                                title={content.title}
                                footer={
                                    content.linkTo && (
                                        <Link
                                            to={content.linkTo}
                                            className="btn"
                                        >
                                            Navigate to app
                                        </Link>
                                    )
                                }
                            >
                                {content.description}
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </Content>
    );
};
