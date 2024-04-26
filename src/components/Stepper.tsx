import React from "react";

import { FormStep } from "@/types";

interface StepperProps {
    activeStep: number;
    formSteps: FormStep[];
    dispatch: React.Dispatch<React.SetStateAction<number>>;
}

const Stepper: React.FC<StepperProps> = ({
    activeStep,
    formSteps,
    dispatch,
}) => {
    return (
        <div className="mb-6 flex w-full max-w-[200px] items-center justify-between text-center">
            {formSteps.map((formStep) => (
                <div key={formStep.step} className="relative">
                    <button
                        onClick={
                            activeStep > formStep.step
                                ? () => dispatch(formStep.step)
                                : undefined
                        }
                        className={`relative inline-block h-8 w-8 rounded-full text-white ${
                            activeStep >= formStep.step
                                ? "cursor-pointer bg-green-600"
                                : "cursor-default bg-slate-400"
                        }`}
                    >
                        {formStep.step}
                    </button>
                    <hr
                        className={`absolute top-[25%] -z-10 w-full border-t-2 ${
                            activeStep >= formStep.step
                                ? "border-green-600"
                                : "border-slate-400"
                        }`}
                    />
                    <p
                        className={`text-xs ${
                            activeStep >= formStep.step
                                ? "text-slate-600"
                                : "text-slate-400"
                        }`}
                    >
                        {formStep.label}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
