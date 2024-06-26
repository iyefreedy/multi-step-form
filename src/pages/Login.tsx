import { Form, Formik } from "formik";

import { Navigate } from "react-router-dom";
import { object, string } from "yup";

import Button from "@components/Button";
import InputField from "@components/InputField";
import InputFieldPassword from "@components/InputFieldPassword";
import ProgressIndicator from "@components/ProgressIndicator";

import { useAuth } from "@hooks/useAuth";

import { LoginCredential } from "@/types";

const Login = () => {
    const { attemptLogin, user, isLoading } = useAuth();

    const credentialInformationSchema = object({
        email: string().email("Email not valid").required("Email is required"),
        password: string()
            .required("Password is required")
            .min(8, "Password must consist of at least 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            ),
    });

    const handleLogin = (values: LoginCredential) => {
        attemptLogin(values);
    };

    if (user) return <Navigate to={"/categories"} replace />;

    return (
        <div
            className={`mx-auto w-full max-w-md rounded-md bg-white p-6 shadow-md ${isLoading && "opacity-60"}`}
        >
            <Formik<LoginCredential>
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={handleLogin}
                validationSchema={credentialInformationSchema}
                enableReinitialize
            >
                <Form>
                    <InputField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        disabled={isLoading}
                    />

                    <InputFieldPassword
                        name="password"
                        id="password"
                        label="Password"
                    />

                    <Button type="submit" className="block w-full">
                        {isLoading ? <ProgressIndicator /> : "Login"}
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
