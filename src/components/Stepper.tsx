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
        <div className="w-full max-w-[300px] flex items-center justify-between mb-6 text-center">
            {formSteps.map((formStep) => (
                <div key={formStep.step} className="relative">
                    <button
                        onClick={() => dispatch(formStep.step)}
                        className={`relative inline-block w-8 h-8 rounded-full text-white ${
                            activeStep >= formStep.step
                                ? "bg-green-600"
                                : "bg-slate-400"
                        }`}
                    >
                        {formStep.step}
                    </button>
                    <hr
                        className={`absolute w-full top-[25%] border-t-2 -z-10 ${
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
