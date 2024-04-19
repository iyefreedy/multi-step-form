import { AddressInformation } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ObjectSchema } from "yup";

interface AddressInformationFormProps {
    state: AddressInformation;
    schema: ObjectSchema<object, AddressInformation>;
    onSubmit: (values: AddressInformation) => void;
    onPrevious: () => void;
}

const AddressInformationForm = ({
    state,
    schema,
    onSubmit,
    onPrevious,
}: AddressInformationFormProps) => {
    return (
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md animate-slide">
            <Formik<AddressInformation>
                initialValues={state}
                onSubmit={onSubmit}
                validationSchema={schema}
            >
                <Form>
                    <div className="mb-4">
                        <label
                            htmlFor="streetAddress"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Street Address
                        </label>
                        <Field
                            id="streetAddress"
                            name="streetAddress"
                            as="textarea"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                            name="streetAddress"
                            className="text-red-600"
                            component="div"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            City
                        </label>
                        <Field
                            id="city"
                            name="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                            name="city"
                            className="text-red-600"
                            component="div"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            State
                        </label>
                        <Field
                            id="state"
                            name="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                            name="state"
                            className="text-red-600"
                            component="div"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="zipCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Zip Code
                        </label>

                        <Field
                            id="zipCode"
                            name="zipCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                            name="zipCode"
                            className="text-red-600"
                            component="div"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onPrevious}
                            className="py-1.5 px-4 bg-slate-600 text-white rounded-md"
                        >
                            Previous
                        </button>
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

export default AddressInformationForm;
