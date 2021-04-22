import React, { useEffect, useRef, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { useStringReplaceModule } from '../../hooks';
import { Card, Container, Content, Row } from '../Layouts';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './style.css';
import { Helmet } from 'react-helmet';

export const TextNormalizerApp = () => {
    const title = 'Text Normalizer';
    const [text, setText] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const replacedParagraph = useRef<HTMLPreElement>(null);

    const {
        verify,
        replace,
        unescape,
        replaceResult,
        verifyResults,
    } = useStringReplaceModule();

    const handleChangeText = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setText((_) => event.target.value);
    };

    const handleCopied = (text: string, result: boolean) => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    useEffect(() => {
        verify(text);
        replace(text);
    }, [text]);

    return (
        <Content title={title}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Container>
                <Row equalsInBetweenSpacing="sm">
                    <div className="col-sm-12">
                        <Content>
                            <div className="form-group">
                                <label htmlFor="text-here">Text:</label>
                                <textarea
                                    className="form-control"
                                    id="text-here"
                                    onChange={handleChangeText}
                                    value={text}
                                    placeholder=""
                                ></textarea>
                            </div>
                        </Content>
                    </div>
                </Row>
                {!text ? (
                    <hr />
                ) : verifyResults.filter((x) => x.hit).length > 0 ? (
                    <Card title="⚠ Warnings" useTitleBorder>
                        <div>
                            <p>Found below.</p>
                            {verifyResults.map((x, index) => {
                                return (
                                    <div
                                        key={x.label}
                                        className="custom-checkbox"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`checkbox-${index}`}
                                            checked={x.hit}
                                            readOnly
                                        />
                                        <label
                                            htmlFor={`checkbox-${index}`}
                                            className="checkbox-1"
                                        >
                                            {x.label}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                ) : (
                    <Card title="Notification" useTitleBorder>
                        <p>Does not find anything strange.</p>
                    </Card>
                )}

                <Row equalsInBetweenSpacing="sm" className="output">
                    <div className="col-sm-6 output-verification">
                        <Card title="Verification" useTitleBorder>
                            <pre
                                className="text-smoothing-antialiased-lm"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        verifyResults.find(
                                            (x, i, arr) => i === arr.length - 1,
                                        )?.text ?? '',
                                }}
                            ></pre>
                        </Card>
                    </div>
                    <div className="col-sm-6 output-replaced">
                        <Card
                            title="Replaced"
                            useTitleBorder
                            footer={
                                replaceResult.find(
                                    (x, i, arr) => i === arr.length - 1,
                                )?.text && (
                                    <CopyToClipboard
                                        text={unescape(
                                            replaceResult.find(
                                                (x, i, arr) =>
                                                    i === arr.length - 1,
                                            )?.text ?? '',
                                        )}
                                        onCopy={handleCopied}
                                    >
                                        <button
                                            className="btn"
                                            disabled={!text || isCopied}
                                        >
                                            <span className="">
                                                <FaRegCopy />
                                            </span>{' '}
                                            {isCopied ? 'Copied' : 'Copy'}
                                        </button>
                                    </CopyToClipboard>
                                )
                            }
                        >
                            <pre
                                ref={replacedParagraph}
                                className="text-smoothing-antialiased-lm"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        replaceResult.find(
                                            (x, i, arr) => i === arr.length - 1,
                                        )?.text ?? '',
                                }}
                            ></pre>
                        </Card>
                    </div>
                </Row>
            </Container>
        </Content>
    );
};
