import { useState } from "react";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";

import PersonalInformationForm from "@components/PersonalInformationForm";
import Stepper from "@components/Stepper";

import PasswordInformationForm from "@/components/PasswordInformationForm";
import { useAuth } from "@/hooks/useAuth";
import { FormStep, PasswordInformation, PersonalInformation } from "@/types";
import { instanceOf } from "@/utils";

const Register = () => {
    const { attemptRegister, user } = useAuth();

    const formSteps: FormStep[] = [
        {
            step: 1,
            label: "Personal Information",
        },
        {
            step: 2,
            label: "Password Information",
        },
    ];

    const [activeStep, setActiveStep] = useState<number>(formSteps[0].step);

    const [personalInformation, setPersonalInformation] =
        useState<PersonalInformation>({
            fullName: "",
            email: "",
        });

    const personalInformationSchema = Yup.object<PersonalInformation>({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
    });

    const [passwordInformation, setPasswordInformation] =
        useState<PasswordInformation>({
            password: "",
            confirmPassword: "",
        });

    const passwordInformationSchema = Yup.object<PasswordInformation>({
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must consist of at least 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            ),
        confirmPassword: Yup.string().test(
            "passwords-match",
            "Passwords must match",
            function (value) {
                return this.parent.password === value;
            },
        ),
    });

    const nextStep = (values: PersonalInformation | PasswordInformation) => {
        if (instanceOf<PersonalInformation>(values, "fullName")) {
            setPersonalInformation((previousValues) => ({
                ...previousValues,
                ...values,
            }));

            setActiveStep((previousValue) => previousValue + 1);
        }

        if (instanceOf<PasswordInformation>(values, "password")) {
            setPasswordInformation((previousValues) => ({
                ...previousValues,
                ...values,
            }));

            attemptRegister({
                ...personalInformation,
                ...passwordInformation,
            });
        }
    };

    if (user) return <Navigate to={"/categories"} replace />;

    return (
        <div className="flex flex-col items-center justify-center">
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
                <PasswordInformationForm
                    state={passwordInformation}
                    schema={passwordInformationSchema}
                    onClickPrevious={() =>
                        setActiveStep((previousValue) => previousValue - 1)
                    }
                    onSubmit={nextStep}
                />
            )}
        </div>
    );
};

export default Register;
