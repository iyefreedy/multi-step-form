import Button from "./Button";
import InputFieldPassword from "./InputFieldPassword";
import { Form, Formik } from "formik";
import { ObjectSchema } from "yup";

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
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md animate-slide">
            <Formik<PasswordInformation>
                initialValues={state}
                onSubmit={onSubmit}
                validationSchema={schema}
            >
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
                        >
                            Previous
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default PasswordInformationForm;
