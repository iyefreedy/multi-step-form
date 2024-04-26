import InputField from "./InputField";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ObjectSchema } from "yup";

import Button from "@components/Button";

import { PersonalInformation } from "@/types";

interface PersonalInformationFormProps {
    state: PersonalInformation;
    schema: ObjectSchema<object, PersonalInformation>;
    onSubmit: (values: PersonalInformation) => void;
}

const PersonalInformationForm = ({
    state,
    schema,
    onSubmit,
}: PersonalInformationFormProps) => {
    return (
        <div className="w-full max-w-md animate-slide rounded-md bg-white p-6 shadow-md">
            <Formik<PersonalInformation>
                initialValues={state}
                onSubmit={onSubmit}
                validationSchema={schema}
            >
                <Form>
                    <InputField
                        name="fullName"
                        id="fullName"
                        label="Full Name"
                    />
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email
                        </label>
                        <Field
                            id="email"
                            name="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                            name="email"
                            className="text-red-600"
                            component="div"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Button type="submit">Next</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default PersonalInformationForm;
