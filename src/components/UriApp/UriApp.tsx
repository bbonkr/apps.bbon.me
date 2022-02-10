import * as React from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { Card, Container, Content, Row } from '../Layouts';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Helmet } from 'react-helmet-async';
import * as joi from 'joi';

type Feature = 'Encode' | 'Decode';

type FormValues = {
    text: string;
    result?: string;
    feature?: Feature;
};
type FormState = {
    isValid?: boolean;
    values: FormValues;
};
const validationScheme = joi.object<FormValues>({
    text: joi.string().required(),
    result: joi.string(),
    feature: joi.string(),
});

const UriApp = () => {
    const title = 'Uri Tools';

    const [formState, setFormState] = React.useState<FormState>({
        values: { text: '' },
    });

    const [isCopied, setIsCopied] = React.useState(false);
    const replacedParagraph = React.useRef<HTMLPreElement>(null);

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        setFormState((prevState) => ({
            ...prevState,
            values: {
                ...prevState.values,
                [name]: value,
            },
        }));
    };

    const handleCopied = (text: string, result: boolean) => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    const handleClickFeatureButton = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        const featureValue = event.currentTarget.name as Feature;

        switch (featureValue) {
            case 'Encode':
                setFormState((prevState) => ({
                    ...prevState,
                    values: {
                        ...prevState.values,
                        result: encodeURIComponent(prevState.values.text),
                        feature: featureValue,
                    },
                }));
                break;
            case 'Decode':
                setFormState((prevState) => ({
                    ...prevState,
                    values: {
                        ...prevState.values,
                        result: decodeURIComponent(prevState.values.text),
                        feature: featureValue,
                    },
                }));
                break;
            default:
                break;
        }
    };

    React.useEffect(() => {
        const { error } = validationScheme.validate(formState.values);

        setFormState((prevState) => ({
            ...prevState,
            isValid: !error,
        }));
    }, [formState.values]);

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
                                <input
                                    className="form-control"
                                    id="text-here"
                                    name="text"
                                    onChange={handleChangeText}
                                    value={formState.values.text}
                                    placeholder=""
                                />
                            </div>

                            <div>
                                <button
                                    className="btn"
                                    name={`Encode`}
                                    onClick={handleClickFeatureButton}
                                    disabled={!formState.isValid}
                                >
                                    Encode
                                </button>
                                <button
                                    className="btn"
                                    name={`Decode`}
                                    onClick={handleClickFeatureButton}
                                    disabled={!formState.isValid}
                                >
                                    Decode
                                </button>
                            </div>
                        </Content>
                    </div>
                </Row>

                <Row equalsInBetweenSpacing="sm" className="output">
                    <div className="col-sm-12 output-replaced">
                        <Card
                            title={`${formState.values.feature ?? ''} Result`}
                            useTitleBorder
                            footer={
                                <CopyToClipboard
                                    text={formState.values.result ?? ''}
                                    onCopy={handleCopied}
                                >
                                    <button
                                        className="btn"
                                        disabled={
                                            !formState.values.text || isCopied
                                        }
                                    >
                                        <span className="">
                                            <FaRegCopy />
                                        </span>{' '}
                                        {isCopied ? 'Copied' : 'Copy'}
                                    </button>
                                </CopyToClipboard>
                            }
                        >
                            <pre
                                ref={replacedParagraph}
                                className="text-smoothing-antialiased-lm"
                                dangerouslySetInnerHTML={{
                                    __html: formState.values.result ?? '',
                                }}
                            ></pre>
                        </Card>
                    </div>
                </Row>
            </Container>
        </Content>
    );
};

export default UriApp;
