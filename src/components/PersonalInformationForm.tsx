import InputField from "./InputField";
import { Form, Formik } from "formik";
import { ObjectSchema } from "yup";

import Button from "@components/Button";

import { PersonalInformation } from "@/types";
import React from "react";

interface PersonalInformationFormProps {
    state: PersonalInformation;
    schema: ObjectSchema<object, PersonalInformation>;
    onSubmit: (values: PersonalInformation) => void;
    dispatcher: React.Dispatch<React.SetStateAction<PersonalInformation>>;
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
                enableReinitialize
            >
                <Form>
                    <InputField
                        name="fullName"
                        id="fullName"
                        label="Full Name"
                    />
                    <InputField id="email" name="email" label="Email" />

                    <div className="flex items-center justify-between">
                        <Button type="submit">Next</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default PersonalInformationForm;
