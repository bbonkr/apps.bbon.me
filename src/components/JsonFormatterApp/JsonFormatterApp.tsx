import React, { useEffect, useState } from 'react';
import { Container, Content, Row } from '../Layouts';
import { FormState, FormValue, FormValueKeys } from './FormState';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { MainForm } from './MainForm';
import { PrintJson } from './PrintJson';
import { useNotification } from '../../hooks';
import { FileDownloadHelper } from '@bbon/filedownload';
import { Helmet } from 'react-helmet-async';
import Joi from 'joi';

import './style.css';

const schema = Joi.object<FormValue>({
    json: Joi.string().required(),
});

export const JsonFormatterApp = () => {
    const title = 'Json Formatter';
    const { notify } = useNotification();
    const [formState, setFormState] = useState<FormState>(() => {
        const initialValue: FormState = {};
        return initialValue;
    });

    const [formattedValue, setFormattedValue] = useState('');
    const [fileName, setFileName] = useState('');

    const handleMainFormChange = (name: FormValueKeys, value: string) => {
        setFormState((prevState) => ({
            ...prevState,
            values: {
                ...prevState.values,
                [name]: value,
            },
            touches: {
                ...prevState.touches,
                [name]: true,
            },
        }));
    };

    const handleFormat = () => {
        try {
            const formattedJson = JSON.stringify(
                JSON.parse(formState.values?.json ?? ''),
                null,
                4,
            );
            setFormattedValue((_) => formattedJson);
            setFileName((_) => `Formatted-${+new Date()}.json`);
        } catch (err) {
            const message = (err as Error)?.message ?? err;

            setFormattedValue((_) => '');
            setFileName((_) => '');
            setFormState((prevState) => ({
                ...prevState,
                isVaild: false,
                errors: {
                    json: `Could not format. ${message}`,
                },
            }));
            notify({ title: 'Could not format', body: `${message}` });
        }
    };

    const handleReset = () => {
        setFormState((_) => ({}));
        setFormattedValue((_) => '');
        setFileName((_) => '');
    };

    const handleClickSaveAs = () => {
        const helper = new FileDownloadHelper();
        helper.download({
            data: formattedValue,
            filename: fileName,
            contentType: 'application/json',
        });
    };

    useEffect(() => {
        const { error } = schema.validate(formState.values);

        setFormState((prevState) => {
            let newState: FormState = {
                ...prevState,
                isVaild: !error,
            };

            if (error) {
                error.details.forEach((detail) => {
                    const path = detail.path.find((_, index) => index === 0);
                    if (path) {
                        const name = path as FormValueKeys;
                        if (name) {
                            newState = {
                                ...newState,
                                errors: {
                                    ...(newState.errors ?? {}),
                                    [name]: detail.message,
                                },
                            };
                        }
                    }
                });
            }

            return newState;
        });
    }, [formState.values]);

    return (
        <Content title={title} id="json-formatter-app">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Container>
                <Row equalsInBetweenSpacing="sm">
                    <div className="col-sm-12">
                        <Content>
                            <MainForm
                                formState={formState}
                                onChange={handleMainFormChange}
                                onFormat={handleFormat}
                                onReset={handleReset}
                            />
                        </Content>
                    </div>
                </Row>
                {formattedValue && (
                    <Row>
                        <div className="col-sm-12">
                            <Content>
                                <button
                                    className="btn"
                                    onClick={handleClickSaveAs}
                                >
                                    <FaCloudDownloadAlt /> Save as {fileName}
                                </button>
                                <PrintJson json={formattedValue} />
                            </Content>
                        </div>
                    </Row>
                )}
            </Container>
        </Content>
    );
};
