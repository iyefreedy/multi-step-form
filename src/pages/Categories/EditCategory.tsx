import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { boolean, object, string } from "yup";

import Button from "@components/Button";
import InputField from "@components/InputField";
import ProgressIndicator from "@components/ProgressIndicator";

import { useEditCategory } from "@hooks/useEditCategory";

import { Category } from "@/types";

const EditCategory = () => {
    const { id } = useParams();
    const { category, setValue, updateCategory, isLoading } =
        useEditCategory(id);

    const categorySchema = object({
        category_name: string().required("Name is required"),
        category_description: string()
            .required("Description is required")
            .min(20, "Description must at least exceeds 20 characters"),
        is_active: boolean().required(),
    });

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="font-bold text-lg">Edit Category</h2>

            <Formik<Category>
                initialValues={category}
                onSubmit={updateCategory}
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
                        className="inline-block w-4 h-4 disabled:opacity-70"
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

export default EditCategory;
