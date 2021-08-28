import React from 'react';
import { FormState, FormValueKeys } from './FormState';

interface MainFormProps {
    formState: FormState;
    onChange?: (name: FormValueKeys, value: string) => void;
    onFormat?: () => void;
    onReset?: () => void;
}

export const MainForm = ({
    formState,
    onChange,
    onFormat,
    onReset,
}: MainFormProps) => {
    const handleChangeText = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const name = event.target.name as FormValueKeys;
        const value = event.target.value;

        if (onChange) {
            onChange(name, value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onFormat) {
            onFormat();
        }
    };

    const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onReset) {
            onReset();
        }
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="form-group">
                <label htmlFor="json-text-here">Raw JSON:</label>
                <textarea
                    className={`form-control ${
                        formState.touches?.json && formState.errors?.json
                            ? 'is-invalid'
                            : ''
                    }`}
                    id="json-text-here"
                    name="json"
                    onChange={handleChangeText}
                    value={formState.values?.json}
                    placeholder="Raw JSON"
                ></textarea>
                {formState.touches?.json && formState.errors?.json && (
                    <div className="invalid-feedback">
                        {formState.errors?.json}
                    </div>
                )}
            </div>

            <ol>
                <li>
                    Pastes your source text on source <mark>Raw JSON</mark>{' '}
                    textarea.
                </li>
                <li>Click a Format button.</li>
            </ol>
            <div
                className="btn-group"
                role="group"
                aria-label="form buttons"
                style={{ display: 'flex' }}
            >
                <button type="reset" className="btn reset-button">
                    Reset
                </button>
                <button
                    type="submit"
                    className="btn btn-primary format-button"
                    disabled={!formState.values?.json}
                >
                    Format
                </button>
            </div>
        </form>
    );
};
