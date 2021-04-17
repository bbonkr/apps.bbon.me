import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Content } from '../Layouts';

interface AboutContent {
    title: string;
    description: React.ReactNode;
    linkTo?: string;
}

export const About = () => {
    const contents: AboutContent[] = [
        {
            title: 'String Normailzer',
            description: (
                <p>
                    You can find some invisible characters in your string, and
                    copy safe string that removed invisible characters.
                </p>
            ),
            linkTo: '/',
        },
    ];

    return (
        <Content title="About">
            <p>Prodvider some apps</p>
            <div className="container-fluid">
                <h3>PWA apps</h3>
                <div className="row justify-content-center">
                    {contents.map((content) => (
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
