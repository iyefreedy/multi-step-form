import Button from "./Button";
import { Form, Formik } from "formik";
import { ObjectSchema } from "yup";

import InputFieldPassword from "@components/InputFieldPassword";

import { PasswordInformation } from "@/types";

interface PasswordInformationFormProps {
    state: PasswordInformation;
    schema: ObjectSchema<object, PasswordInformation>;
    onSubmit: (values: PasswordInformation) => void;
    onClickPrevious: () => void;
}

const PasswordInformationForm = ({
    state,
    schema,
    onSubmit,
    onClickPrevious,
}: PasswordInformationFormProps) => {
    return (
        <div className="w-full max-w-md animate-slide rounded-md bg-white p-6 shadow-md">
            <Formik<PasswordInformation>
                initialValues={state}
                onSubmit={onSubmit}
                validationSchema={schema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputFieldPassword
                            id="password"
                            name="password"
                            label="Password"
                        />
                        <InputFieldPassword
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                        />

                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                onClick={onClickPrevious}
                                className="bg-slate-600"
                                disabled={isSubmitting}
                            >
                                Previous
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PasswordInformationForm;
