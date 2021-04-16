import React, { useEffect, useRef, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { useStringReplaceModule } from '../../hooks';
import { Card, Content } from '../Layouts';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './style.css';

export const StringNormalizer = () => {
    const [text, setText] = useState('');
    const replacedParagraph = useRef<HTMLParagraphElement>(null);

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

    const handleClickCopy = () => {};

    useEffect(() => {
        verify(text);
        replace(text);
    }, [text]);

    return (
        <Content title="String Normalizer">
            <div className="container-fluid ">
                <div className="form-group">
                    <label htmlFor="text-here">Text:</label>
                    <textarea
                        className="form-control"
                        id="text-here"
                        onChange={handleChangeText}
                        value={text}
                    ></textarea>
                </div>
                {!text ? (
                    <React.Fragment></React.Fragment>
                ) : verifyResults.filter((x) => x.hit).length > 0 ? (
                    <Card title="⚠ Warnings">
                        <div>
                            <p>Found below.</p>
                            {verifyResults.map((x) => {
                                return (
                                    <div
                                        key={x.label}
                                        className="custom-checkbox"
                                    >
                                        <input
                                            type="checkbox"
                                            id="checkbox-1"
                                            checked={x.hit}
                                            readOnly
                                        />
                                        <label className="checkbox-1">
                                            {x.label}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                ) : (
                    <Card title="404">
                        <p>Does not find anything strange.</p>
                    </Card>
                )}

                <div className="row row-eq-spacing-sm output">
                    <div className="col-sm-6 output-verification">
                        <Card title="Verification">
                            <p
                                className="text-smoothing-antialiased-lm"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        verifyResults.find(
                                            (x, i, arr) => i === arr.length - 1,
                                        )?.text ?? '',
                                }}
                            ></p>
                        </Card>
                    </div>
                    <div className="col-sm-6 output-replaced">
                        <Card
                            title="Replaced"
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
                                    >
                                        <button
                                            className="btn"
                                            onClick={handleClickCopy}
                                        >
                                            <span className="">
                                                <FaRegCopy />
                                            </span>{' '}
                                            Copy
                                        </button>
                                    </CopyToClipboard>
                                )
                            }
                        >
                            <p
                                ref={replacedParagraph}
                                className="text-smoothing-antialiased-lm"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        replaceResult.find(
                                            (x, i, arr) => i === arr.length - 1,
                                        )?.text ?? '',
                                }}
                            ></p>
                        </Card>
                    </div>
                </div>
            </div>
        </Content>
    );
};
