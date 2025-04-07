import { PageContent } from "@/components/PageContent";
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";
import { useCallback, useState } from "react";
import {
  attributesMocks,
  protocolMocks,
} from "../../../../shared/src/mocks/attributes.mocks";

import Stepper, { StepData, StepperRenderProps } from "@/components/Stepper";

export const AddNewBadge = () => {
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(
    null,
  );
  const [isComplete, setIsComplete] = useState(false);
  const [isStep1Valid, setIsStep1Valid] = useState(false);
  const [isStep2Valid, setIsStep2Valid] = useState(false);

  const handleSelection = (
    slug: string,
    updateValidity: (isValid: boolean) => void,
    stepNumber: number,
  ) => {
    setSelectedAttribute(slug);
    updateValidity(true);
    if (stepNumber === 1) {
      setIsStep1Valid(true);
    } else if (stepNumber === 2) {
      setIsStep2Valid(true);
    }
  };

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    setTimeout(() => {
      alert("Process completed successfully!");
    }, 100);
  }, []);

  const steps: StepData[] = [
    {
      id: "data-source",
      label: "Data Source",
      description: "Select the Attribute you want to verify",
      isValid: isStep1Valid,
      render: ({ updateValidity }: StepperRenderProps) => {
        return (
          <Stepper.Step>
            <div className="grid grid-cols-4 gap-3.5">
              {attributesMocks?.map((attribute) => {
                const isActive = selectedAttribute === attribute.slug;
                return (
                  <Button
                    key={attribute.slug}
                    variant="checkbox"
                    size="md"
                    onClick={() =>
                      handleSelection(attribute.slug, updateValidity, 1)
                    }
                    active={isActive}
                    className="!justify-start"
                    disabled={attribute.disabled}
                  >
                    <div className="size-6 border rounded border-base-border flex items-center justify-center shadow-base">
                      <Mail className="text-base-muted-foreground" />
                    </div>
                    {attribute.label}
                  </Button>
                );
              })}
            </div>
          </Stepper.Step>
        );
      },
    },
    {
      id: "protocol",
      label: "Protocol",
      description: "Select a Protocol to verify this attribute",
      isValid: isStep2Valid,
      render: ({ updateValidity }: StepperRenderProps) => {
        return (
          <Stepper.Step>
            <div className="grid grid-cols-4 gap-3.5">
              {protocolMocks?.map((protocol) => {
                const isActive = selectedAttribute === protocol.slug;
                return (
                  <Button
                    key={protocol.slug}
                    variant="checkbox"
                    size="md"
                    onClick={() =>
                      handleSelection(protocol.slug, updateValidity, 2)
                    }
                    active={isActive}
                    className="!justify-start"
                    disabled={protocol.disabled}
                  >
                    <div className="size-6 border rounded border-base-border flex items-center justify-center shadow-base">
                      <Mail className="text-base-muted-foreground" />
                    </div>
                    {protocol.label}
                  </Button>
                );
              })}
            </div>
          </Stepper.Step>
        );
      },
    },
    {
      id: "run",
      label: "Run TLSNotary",
      isValid: true,
      render: ({ updateValidity }: StepperRenderProps) => {
        return (
          <Stepper.Step>
            <></>
          </Stepper.Step>
        );
      },
    },
  ];

  return (
    <PageContent title="Add New Badge" className="flex flex-col gap-5">
      <div className="w-full flex flex-col">
        <Stepper.Base
          steps={steps}
          onComplete={handleComplete}
          completeLabel="Run"
        />

        {isComplete && (
          <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-md">
            <p className="text-green-800 font-medium">
              Verification process initiated!
            </p>
          </div>
        )}
      </div>
    </PageContent>
  );
};
