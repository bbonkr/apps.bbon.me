import React, { useState, useEffect, useRef } from 'react';
import { Container, Content, Row } from '../Layouts';
import { Helmet } from 'react-helmet';
import Joi from 'joi';
import QrCode, { QRCodeToDataURLOptions } from 'qrcode';

import './QrCodeGenerator.css';

type FormValues = {
    text: string;
    foreground: string;
    background: string;
};

type FormValueKeys = keyof FormValues;

type FormValueTouched = {
    [key in FormValueKeys]: boolean;
};

type FormValueErrors = {
    [key in FormValueKeys]: string;
};

type FormState = {
    isValid?: boolean;
    values?: Partial<FormValues>;
    touched?: Partial<FormValueTouched>;
    errors?: Partial<FormValueErrors>;
};

const schema = Joi.object<FormValues>({
    text: Joi.string().required(),
    foreground: Joi.string().required(),
    background: Joi.string().required(),
});

export const QrCodeGenerator = () => {
    const title = 'Qr code generator';
    const light = '#ffffff';
    const dark = '#000000';

    const [formState, setFormState] = useState<FormState>(() => {
        const initailState: FormState = {
            values: {
                text: '',
                background: '#ffffff',
                foreground: '#000000',
            },
        };
        return initailState;
    });
    const [dataUrl, setDataUrl] = useState<string>();

    const handleChangedInputValue = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const name = e.currentTarget.name as FormValueKeys;
        const value = e.currentTarget.value;

        setFormState((prevState) => ({
            ...prevState,
            values: {
                ...prevState.values,
                [name]: value,
            },
            touched: {
                ...prevState.touched,
                [name]: true,
            },
        }));
    };

    const handleClickSample = (sample: number) => () => {
        switch (sample) {
            case 1:
                setFormState((prevState) => ({
                    ...prevState,
                    values: {
                        ...prevState.values,
                        text: `tel:01012341234`,
                    },
                    touched: {
                        ...prevState.touched,
                        text: true,
                    },
                }));
                break;
            case 2:
                setFormState((prevState) => ({
                    ...prevState,
                    values: {
                        ...prevState.values,
                        text: `https://resume.bbon.me`,
                    },
                    touched: {
                        ...prevState.touched,
                        text: true,
                    },
                }));
                break;
            case 3:
                setFormState((prevState) => ({
                    ...prevState,
                    values: {
                        ...prevState.values,
                        text: `mailto:dev@bbon.kr`,
                    },
                    touched: {
                        ...prevState.touched,
                        text: true,
                    },
                }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error } = schema.validate(formState.values);

        if (!error) {
            setDataUrl((_) => undefined);
            var opts: QRCodeToDataURLOptions = {
                errorCorrectionLevel: 'H',
                type: 'image/png',
                // quality: 0.3,
                width: 1024,
                margin: 1,
                color: {
                    dark: formState.values?.foreground ?? dark, // '#010599FF',
                    light: formState.values?.background ?? light, // '#FFBF60FF',
                },
            };

            QrCode.toDataURL(
                // canvasRef.current,
                formState.values?.text ?? '',
                opts,
                (error, url) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }

                    setDataUrl((_) => url);
                },
            );
        }
    };

    useEffect(() => {
        const { error } = schema.validate(formState.values);
        console.info('FormState changed ... error: ', error, error?.details);
        setFormState((prevState) => {
            let newState: FormState = {
                ...prevState,
                isValid: !error,
                errors: undefined,
            };
            if (error) {
                error.details.forEach((detail) => {
                    const path = detail.path.find((_, index) => index === 0);
                    const name = path as FormValueKeys;
                    if (name) {
                        newState = {
                            ...newState,
                            errors: {
                                ...newState.errors,
                                [name]: detail.message,
                            },
                        };
                    }
                });
            }

            return newState;
        });
    }, [formState.values]);

    return (
        <Content title={title} id="qr-code-generator">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Container>
                <Row equalsInBetweenSpacing="sm">
                    <div className="col-sm-12">
                        <Content>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row row-eq-spacing-sm">
                                        <div className="col-sm">
                                            <label htmlFor="background-is-here">
                                                Background color
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="color"
                                                    className="form-control"
                                                    id="background-is-here"
                                                    name="background"
                                                    value={
                                                        formState.values
                                                            ?.background ??
                                                        light
                                                    }
                                                    onChange={
                                                        handleChangedInputValue
                                                    }
                                                />
                                                <div className="input-group-append">
                                                    <span className="input-group-text uppercase">
                                                        {
                                                            formState.values
                                                                ?.background
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm">
                                            <label htmlFor="foreground-is-here">
                                                Foreground color
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="color"
                                                    className="form-control"
                                                    id="foreground-is-here"
                                                    name="foreground"
                                                    value={
                                                        formState.values
                                                            ?.foreground ?? dark
                                                    }
                                                    onChange={
                                                        handleChangedInputValue
                                                    }
                                                />
                                                <div className="input-group-append">
                                                    <span className="input-group-text uppercase">
                                                        {
                                                            formState.values
                                                                ?.foreground
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="text-is-here"
                                            className="required"
                                        >
                                            Text
                                        </label>
                                        <textarea
                                            className={`form-control ${
                                                formState.touched?.text &&
                                                formState.errors?.text
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                            id="text-is-here"
                                            name="text"
                                            value={formState.values?.text}
                                            onChange={handleChangedInputValue}
                                            placeholder="To be generated qr code image with entered text."
                                            maxLength={200}
                                        ></textarea>
                                        {formState.touched?.text &&
                                            formState.errors?.text && (
                                                <div className="invalid-feedback">
                                                    {formState.errors?.text}
                                                </div>
                                            )}
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary format-button"
                                            disabled={!formState.isValid}
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Content>
                    </div>
                </Row>
                <Row
                    className="justify-content-center"
                    equalsInBetweenSpacing="sm"
                >
                    <div className="col-sm-12 col-md-4">
                        <h3>QR Code</h3>

                        {dataUrl ? (
                            <img
                                src={dataUrl}
                                className="image-qrcode img-fluid"
                            />
                        ) : (
                            <p>
                                {
                                    'Please enter the TEXT, then click GENERATE button'
                                }
                            </p>
                        )}
                    </div>
                    <div className="col-sm-12 col-md-8">
                        <h3>Sample data</h3>
                        <div
                            className="cursor-pointer"
                            onClick={handleClickSample(1)}
                            title="Fill sample text when clicked"
                        >
                            <p>
                                I want to make a call to 010-1234-1234 when has
                                taken qr code image with camera.
                            </p>
                            <pre>tel:01012341234</pre>
                        </div>

                        <div
                            className="cursor-pointer"
                            onClick={handleClickSample(2)}
                            title="Fill sample text when clicked"
                        >
                            <p>
                                I want to be navigated https://resume.bbon.me
                                when has taken qr code image with camera.
                            </p>
                            <pre>https://resume.bbon.me</pre>
                        </div>

                        <div
                            className="cursor-pointer"
                            onClick={handleClickSample(3)}
                            title="Fill sample text when clicked"
                        >
                            <p>
                                I want to write mail to dev@bbon.kr when has
                                taken qr code image with camera.
                            </p>
                            <pre>mailto:dev@bbon.kr</pre>
                        </div>
                    </div>
                </Row>
            </Container>
        </Content>
    );
};
