import { Form, Formik } from "formik";
import { boolean, object, string } from "yup";

import Button from "@components/Button";
import InputField from "@components/InputField";
import ProgressIndicator from "@components/ProgressIndicator";

import { useCreateCategory } from "@hooks/useCreateCategory";

import { Category } from "@/types";

const CreateCategory = () => {
    const { category, setValue, saveCategory, isLoading } = useCreateCategory();

    const categorySchema = object({
        category_name: string().required("Name is required"),
        category_description: string()
            .required("Description is required")
            .min(20, "Description must at least exceeds 20 characters"),
        is_active: boolean().required(),
    });

    return (
        <div className="rounded-md bg-white p-6 shadow-md">
            <h2 className="text-lg font-bold">Create Category</h2>

            <Formik<Omit<Category, "id">>
                initialValues={category}
                onSubmit={saveCategory}
                validationSchema={categorySchema}
                enableReinitialize
            >
                <Form>
                    <InputField
                        id="name"
                        name="category_name"
                        label="Category name"
                        className="disabled:opacity-70"
                        onChange={(event) =>
                            setValue(
                                event.target.name as keyof Category,
                                event.target.value,
                            )
                        }
                        disabled={isLoading}
                    />

                    <InputField
                        id="description"
                        name="category_description"
                        label="Category description"
                        className="disabled:opacity-70"
                        onChange={(event) =>
                            setValue(
                                event.target.name as keyof Category,
                                event.target.value,
                            )
                        }
                        disabled={isLoading}
                    />

                    <InputField
                        id="isActive"
                        type="checkbox"
                        name="is_active"
                        label="Active"
                        className="inline-block h-4 w-4 disabled:opacity-70"
                        onChange={(event) =>
                            setValue(
                                event.target.name as keyof Category,
                                event.target.checked,
                            )
                        }
                        disabled={isLoading}
                    />

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <ProgressIndicator /> : "Submit"}
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreateCategory;
