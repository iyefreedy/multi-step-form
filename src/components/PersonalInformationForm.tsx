import { PersonalInformation } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ObjectSchema } from "yup";

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
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md animate-slide">
            <Formik<PersonalInformation>
                initialValues={state}
                onSubmit={onSubmit}
                validationSchema={schema}
            >
                <Form>
                    <div className="mb-4">
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Full Name
                        </label>
                        <Field
                            id="fullName"
                            name="fullName"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                            name="fullName"
                            className="text-red-600"
                            component="div"
                        />
                    </div>
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
                    <div className="mb-4">
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Date of Birth
                        </label>
                        <Field
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                            name="dateOfBirth"
                            className="text-red-600"
                            component="div"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="py-1.5 px-4 bg-green-600 text-white rounded-md"
                        >
                            Next
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default PersonalInformationForm;
