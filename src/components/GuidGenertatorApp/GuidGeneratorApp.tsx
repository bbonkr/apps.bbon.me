import React, { useState } from 'react';
import { Content } from '../Layouts';
import { v4 as uuidv4 } from 'uuid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy } from 'react-icons/fa';
import { useNotification } from '../../hooks';

export const GuidGeneratorApp = () => {
    const { notify } = useNotification();
    const [value, setValue] = useState('');
    const [uppercase, setUppercase] = useState(true);
    const [hasBraces, setHasBraces] = useState(true);
    const [hasHyphens, setHasHyphens] = useState(true);
    const [isCopied, setIsCopied] = useState(false);

    const handleInputchange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();

        switch (event.target.name) {
            case 'uppercase':
                setUppercase(event.target.checked);
                break;
            case 'braces':
                setHasBraces(event.target.checked);
                break;
            case 'hyphens':
                setHasHyphens(event.target.checked);
                break;
            default:
                break;
        }

        setValue((_) => '');
    };

    const handleCopied = (text: string, result: boolean) => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    const handleclickGenerate = () => {
        let guid: string = uuidv4();

        if (uppercase) {
            guid = guid.toUpperCase();
        }

        if (hasBraces) {
            guid = `{${guid}}`;
        }

        if (!hasHyphens) {
            guid = guid.replace(/-/gi, '');
        }

        console.info('new value: ', guid);

        setValue(guid);

        notify({ title: 'Guid Generated', body: `The new guid is '${guid}'` });
    };

    return (
        <Content title="Guid Generator">
            <div className="container-fluid ">
                <div className="row row-eq-spacing-sm justify-content-center">
                    <div className="col-lg-6">
                        <Content>
                            <div className="row row-eq-spacing-sm justify-content-center">
                                <div className="custom-checkbox d-inline-block mr-10">
                                    <input
                                        type="checkbox"
                                        id="checkbox-uppercase"
                                        name="uppercase"
                                        checked={uppercase}
                                        onChange={handleInputchange}
                                    />
                                    <label
                                        htmlFor="checkbox-uppercase"
                                        className="checkbox-1"
                                    >
                                        Uppercase
                                    </label>
                                </div>
                                <div className="custom-checkbox d-inline-block mr-10">
                                    <input
                                        type="checkbox"
                                        id="checkbox-hasBraces"
                                        name="braces"
                                        checked={hasBraces}
                                        onChange={handleInputchange}
                                    />
                                    <label
                                        htmlFor="checkbox-hasBraces"
                                        className="checkbox-1"
                                    >
                                        Braces
                                    </label>
                                </div>
                                <div className="custom-checkbox d-inline-block">
                                    <input
                                        type="checkbox"
                                        id="checkbox-hasHyphens"
                                        name="hyphens"
                                        checked={hasHyphens}
                                        onChange={handleInputchange}
                                    />
                                    <label
                                        htmlFor="checkbox-hasHyphens"
                                        className="checkbox-1"
                                    >
                                        Hyphens
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        className="form-control text-center"
                                        value={value}
                                        readOnly
                                    />
                                    <div className="input-group-append">
                                        <CopyToClipboard
                                            text={value}
                                            onCopy={handleCopied}
                                        >
                                            <button
                                                className="btn"
                                                type="button"
                                                disabled={!value || isCopied}
                                            >
                                                <FaRegCopy />{' '}
                                                {isCopied ? 'Copied' : 'Copy'}
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={handleclickGenerate}
                                    className="btn btn-primary"
                                >
                                    Generate
                                </button>
                            </div>
                        </Content>
                    </div>
                </div>
            </div>
        </Content>
    );
};
