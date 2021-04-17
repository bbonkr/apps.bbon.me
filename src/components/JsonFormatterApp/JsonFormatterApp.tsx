import React, { useEffect, useState } from 'react';
import { Container, Content, Row } from '../Layouts';
import { FormState, FormValueKeys } from './FormState';
import { MainForm } from './MainForm';
import { PrintJson } from './PrintJson';
import validate from 'validate.js';

const constraints = {
    json: {
        presence: {
            allowEmpty: false,
            message: '^Raw JSON is required.',
        },
    },
};

export const JsonFormatterApp = () => {
    const [formState, setFormState] = useState<FormState>({
        isVaild: false,
        values: { json: '' },
        touches: {},
        errors: {},
    });

    const [formattedValue, setFormattedValue] = useState('');

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
        } catch (err) {
            setFormattedValue((_) => '');
            setFormState((prevState) => ({
                ...prevState,
                isVaild: false,
                errors: {
                    json: [`Could not format. ${err.message}`],
                },
            }));
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
        <Content title="Json Formatter">
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
                                <PrintJson json={formattedValue} />
                            </Content>
                        </div>
                    </Row>
                )}
            </Container>
        </Content>
    );
};
