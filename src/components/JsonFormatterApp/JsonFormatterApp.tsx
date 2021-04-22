import React, { useEffect, useState } from 'react';
import { Container, Content, Row } from '../Layouts';
import { FormState, FormValueKeys } from './FormState';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { MainForm } from './MainForm';
import { PrintJson } from './PrintJson';
import validate from 'validate.js';
import { useNotification } from '../../hooks';
import { FileDownloadHelper } from '@bbon/filedownload';

import './style.css';
import { Helmet } from 'react-helmet';

const constraints = {
    json: {
        presence: {
            allowEmpty: false,
            message: '^Raw JSON is required.',
        },
    },
};

export const JsonFormatterApp = () => {
    const title = 'Json Formatter';
    const { notify } = useNotification();
    const [formState, setFormState] = useState<FormState>({
        isVaild: false,
        values: { json: '' },
        touches: {},
        errors: {},
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
                JSON.parse(formState.values.json),
                null,
                4,
            );
            setFormattedValue((_) => formattedJson);
            setFileName((_) => `Formatted-${+new Date()}.json`);
        } catch (err) {
            setFormattedValue((_) => '');
            setFileName((_) => '');
            setFormState((prevState) => ({
                ...prevState,
                isVaild: false,
                errors: {
                    json: [`Could not format. ${err.message}`],
                },
            }));
            notify({ title: 'Could not format', body: `${err.message}` });
        }
    };

    const handleReset = () => {
        setFormState((prevState) => ({
            ...prevState,
            values: {
                json: '',
            },
            touches: {},
            errors: {},
        }));
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
        const errors = validate(formState.values, constraints);
        console.info('error', errors);
        setFormState((prevState) => ({
            ...prevState,
            isVaild: !errors,
            errors: errors,
        }));
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
