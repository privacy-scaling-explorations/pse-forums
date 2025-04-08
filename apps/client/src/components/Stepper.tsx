import React, { useState, useCallback, ReactNode, useEffect } from "react";
import { Button } from "./ui/Button";
import { ChevronRight, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";

interface StepProps {
  children: ReactNode;
}

export interface StepperRenderProps {
  updateValidity: (isValid: boolean) => void;
  isValid: boolean;
  stepIndex: number;
}

export interface StepData {
  id: string;
  label: string;
  description?: string;
  isValid?: boolean;
  isCompleted?: boolean;
  nextLabel?: string;
  disabled?: boolean;
  render: (props: StepperRenderProps) => ReactNode;
}

interface StepperProps {
  steps: StepData[];
  initialStep?: number;
  className?: string;
  stepClassName?: string;
  completeLabel?: string;
  showArrow?: boolean;
  onComplete?: () => void;
}

export const Step = ({ children }: StepProps) => {
  return <>{children}</>;
};

const StepRenderer = React.memo(
  ({
    step,
    stepIndex,
    updateValidity,
  }: {
    step: StepData;
    stepIndex: number;
    updateValidity: (isValid: boolean) => void;
  }) => {
    useEffect(() => {
      if (step.isValid) {
        updateValidity(true);
      }
    }, [step.id, step.isValid]);
    
    return (
      <>
        {step?.render({
          updateValidity,
          isValid: !!step.isValid,
          stepIndex,
        })}
      </>
    );
  },
);

StepRenderer.displayName = "StepRenderer";

const safeArrayLength = (arr: any[] | null | undefined = []): number => {
  return Array.isArray(arr) ? arr.length : 0;
};

const StepperBase = ({
  steps: initialSteps,
  initialStep = 0,
  className = "",
  stepClassName = "",
  completeLabel = "Complete",
  showArrow = true,
  onComplete,
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [steps, setSteps] = useState<StepData[]>(() => {
    const validSteps = Array.isArray(initialSteps) ? initialSteps : [];
    return validSteps.map((step) => ({
      ...step,
      isValid: step.isValid || false,
      isCompleted: step.isCompleted || false,
    }));
  });

  useEffect(() => {
    const validSteps = Array.isArray(initialSteps) ? initialSteps : [];
    setSteps(validSteps.map((newStep, index) => {
      const currentStep = steps[index];
      return {
        ...newStep,
        isValid: newStep.isValid !== undefined ? newStep.isValid : (currentStep?.isValid || false),
        isCompleted: newStep.isCompleted !== undefined ? newStep.isCompleted : (currentStep?.isCompleted || false),
      };
    }));
  }, [initialSteps]);

  const getCurrentStep = useCallback((): StepData | null => {
    const stepsLength = safeArrayLength(steps);
    if (stepsLength === 0) return null;
    return currentStep >= 0 && currentStep < stepsLength
      ? steps[currentStep]
      : null;
  }, [steps, currentStep]);

  const updateStepValidity = useCallback(
    (stepIndex: number, isValid: boolean): void => {
      const stepsLength = safeArrayLength(steps);
      if (!Array.isArray(steps) || stepIndex < 0 || stepIndex >= stepsLength)
        return;

      setSteps((prev) => {
        const safeArray = Array.isArray(prev) ? prev : [];
        return safeArray.map((step, idx) =>
          idx === stepIndex ? { ...step, isValid } : step,
        );
      });
    },
    [],
  );

  const completeStep = useCallback(
    (stepIndex: number): void => {
      const stepsLength = safeArrayLength(steps);
      if (!Array.isArray(steps) || stepIndex < 0 || stepIndex >= stepsLength)
        return;

      setSteps((prev) => {
        const safeArray = Array.isArray(prev) ? prev : [];
        return safeArray.map((step, idx) =>
          idx === stepIndex ? { ...step, isCompleted: true } : step,
        );
      });
    },
    [],
  );

  const nextStep = useCallback((): boolean => {
    const stepsLength = safeArrayLength(steps);
    if (stepsLength === 0 || currentStep >= stepsLength - 1) return false;

    const currentStepData = steps?.[currentStep];
    if (!currentStepData?.isValid) return false;

    completeStep(currentStep);
    setCurrentStep((prev) => prev + 1);
    return true;
  }, [currentStep, steps, completeStep]);

  const handleStepClick = useCallback(
    (stepIndex: number): boolean => {
      const stepsLength = safeArrayLength(steps);
      if (stepsLength === 0 || stepIndex < 0 || stepIndex >= stepsLength)
        return false;

      const safeSteps = Array.isArray(steps) ? steps : [];
      const isAccessible =
        stepIndex <= currentStep + 1 &&
        (stepIndex === 0 ||
          safeSteps.slice(0, stepIndex).every((step) => step.isCompleted));

      if (isAccessible) {
        setCurrentStep(stepIndex);
        return true;
      }

      return false;
    },
    [currentStep, steps],
  );

  const handleNext = () => {
    const stepsLength = safeArrayLength(steps);
    const isLastStep = stepsLength > 0 && currentStep === stepsLength - 1;

    if (isLastStep) {
      if (onComplete && typeof onComplete === "function") {
        onComplete();
      }
    } else {
      nextStep();
    }
  };

  const currentStepData = getCurrentStep();
  const stepsLength = safeArrayLength(steps);
  const isLastStep = stepsLength > 0 && currentStep === stepsLength - 1;

  if (stepsLength === 0) {
    return null;
  }

  const safeSteps = Array.isArray(steps) ? steps : [];

  return (
    <div className={cn("w-full flex flex-col gap-10", className)}>
      <div className="flex items-center gap-2 pb-3 border-b border-b-sidebar-border">
        {safeSteps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = !!step.isCompleted;
          const isClickable = index <= currentStep || isCompleted;
          const isLastStep = index === safeSteps.length - 1;

          return (
            <React.Fragment key={step.id || index}>
              <div
                className={`flex flex-col items-center ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"} ${stepClassName}`}
                onClick={() => isClickable && handleStepClick(index)}
              >
                <div className="flex items-center gap-1.5">
                  {isCompleted ? (
                    <Icons.Check />
                  ) : (
                    <CircleCheck
                      className={cn(
                        "h-5 w-5 text-black",
                        !isActive && "opacity-50",
                      )}
                    />
                  )}

                  <span
                    className={`text-sm ${isActive || isCompleted ? "font-medium" : "font-normal"}`}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
              {!isLastStep && (
                <ChevronRight className="text-base-muted-foreground h-4 w-4" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex flex-col gap-3.5">
        {currentStepData?.description && (
          <h3 className="text-sm text-base-foreground font-semibold font-inter">
            {currentStepData?.description}
          </h3>
        )}
        {currentStepData && (
          <StepRenderer
            step={currentStepData}
            stepIndex={currentStep}
            updateValidity={(isValid: boolean) =>
              updateStepValidity(currentStep, isValid)
            }
          />
        )}
      </div>

      <div className="flex justify-end mt-6">
        {!isLastStep ? (
          <Button
            onClick={handleNext}
            className="min-w-[200px]"
            disabled={!currentStepData?.isValid}
          >
            <div className="flex items-center">
              {currentStepData?.nextLabel || "Next"}
              {showArrow && <ChevronRight />}
            </div>
          </Button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!currentStepData?.isValid}
            className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-6 py-2 rounded-md disabled:opacity-50 enabled:bg-gray-600"
          >
            {completeLabel}
          </button>
        )}
      </div>
    </div>
  );
};

const Stepper = {
  displayName: "Stepper",
  Base: StepperBase,
  Step,
};

export default Stepper;
