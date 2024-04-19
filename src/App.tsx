import { useState } from "react";
import { object, string } from "yup";

import PersonalInformationForm from "@components/PersonalInformationForm";

import AddressInformationForm from "@components/AddressInformationForm";
import AccountInformationForm from "@components/AccountInformationForm";
import Stepper from "@components/Stepper";

import {
    AccountInformation,
    AddressInformation,
    FormStep,
    PersonalInformation,
} from "@/types";
import { instanceOf } from "./utils";

function App() {
    const formSteps: FormStep[] = [
        {
            step: 1,
            label: "Personal Information",
        },
        {
            step: 2,
            label: "Address Information",
        },
        {
            step: 3,
            label: "Account Information",
        },
    ];

    const [isFormCompleted, setIsFormCompleted] = useState(false);
    const [activeStep, setActiveStep] = useState<number>(formSteps[0].step);

    const [personalInformation, setPersonalInformation] =
        useState<PersonalInformation>({
            fullName: "",
            email: "",
            dateOfBirth: "",
        });

    const personalInformationSchema = object<PersonalInformation>({
        fullName: string().required("Full Name is required"),
        email: string().email("Email not valid").required("Email is required"),
        dateOfBirth: string()
            .required("Date of Birth is required")
            .matches(
                /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
                "Invalid date format. Use YYYY-MM-DD format"
            )
            .test(
                "valid-date",
                "Date of Birth is invalid or exceeds the current date",
                function (value) {
                    if (!value) return false;

                    const parts = value.split("-");

                    const year = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1;
                    const day = parseInt(parts[2], 10);
                    const inputDate = new Date(year, month, day);
                    const currentDate = new Date();

                    return inputDate <= currentDate;
                }
            ),
    });

    const [addressInformation, setAddressInformation] =
        useState<AddressInformation>({
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
        });

    const addressInformationSchema = object<AddressInformation>({
        streetAddress: string().required("Street address required"),
        city: string().required("City is required"),
        state: string().required("State is required"),
        zipCode: string()
            .required("Zip Code is required")
            .matches(
                /^\d{5}(?:[-\s]\d{4})?$/,
                "Invalid ZIP code. Must consist of a 5 digit number, optionally followed by a hyphen and an additional 4 digit number"
            ),
    });

    const [accountInformation, setAccountInformation] =
        useState<AccountInformation>({
            username: "",
            password: "",
        });

    const accountInformationSchema = object<AccountInformation>({
        username: string().required("Username is required"),
        password: string()
            .required("Password is required")
            .min(8, "Password must consist of at least 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
            ),
    });

    const nextStep = (
        values: PersonalInformation | AddressInformation | AccountInformation
    ) => {
        if (activeStep < formSteps[formSteps.length - 1].step) {
            setActiveStep((previousValue) => previousValue + 1);
        }

        if (instanceOf<PersonalInformation>(values, "email")) {
            setPersonalInformation((previousValues) => ({
                ...previousValues,
                ...values,
            }));
        }

        if (instanceOf<AddressInformation>(values, "streetAddress")) {
            setAddressInformation((previousValues) => ({
                ...previousValues,
                ...values,
            }));
        }

        if (instanceOf<AccountInformation>(values, "username")) {
            setAccountInformation((previousValues) => ({
                ...previousValues,
                ...values,
            }));

            setIsFormCompleted(true);
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center px-6">
            {isFormCompleted ? (
                <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md animate-slide">
                    <h1 className="text-lg font-medium mb-2">
                        Registration completed
                    </h1>
                    <p className="text-sm text-slate-600">
                        Registration is successful with the following
                        information
                    </p>

                    <dl className="divide-y divide-gray-100">
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {personalInformation.fullName}
                            </dd>
                        </div>
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {personalInformation.email}
                            </dd>
                        </div>
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Date of Birth
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {personalInformation.dateOfBirth}
                            </dd>
                        </div>
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Street Address
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {addressInformation.streetAddress}
                            </dd>
                        </div>
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                City
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {addressInformation.city}
                            </dd>
                        </div>
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                State
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {addressInformation.state}
                            </dd>
                        </div>
                        <div className="px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Zip Code
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {addressInformation.zipCode}
                            </dd>
                        </div>
                    </dl>

                    <div className="mb-2">
                        <p className="text-sm text-slate-600">
                            Please check your email to verify
                        </p>
                    </div>

                    <button
                        type="button"
                        className="py-1.5 px-4 bg-green-600 text-white rounded-md"
                    >
                        Done
                    </button>
                </div>
            ) : (
                <>
                    <Stepper
                        activeStep={activeStep}
                        formSteps={formSteps}
                        dispatch={setActiveStep}
                    />
                    {activeStep === 1 && (
                        <PersonalInformationForm
                            state={personalInformation}
                            schema={personalInformationSchema}
                            onSubmit={nextStep}
                        />
                    )}
                    {activeStep === 2 && (
                        <AddressInformationForm
                            state={addressInformation}
                            schema={addressInformationSchema}
                            onPrevious={() =>
                                setActiveStep(
                                    (previousValue) => previousValue - 1
                                )
                            }
                            onSubmit={nextStep}
                        />
                    )}
                    {activeStep === 3 && (
                        <AccountInformationForm
                            state={accountInformation}
                            schema={accountInformationSchema}
                            onPrevious={() =>
                                setActiveStep(
                                    (previousValue) => previousValue - 1
                                )
                            }
                            onSubmit={nextStep}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
