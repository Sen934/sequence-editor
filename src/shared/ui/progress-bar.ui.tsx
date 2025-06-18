import React from 'react';
import type { ProgressBarStep } from '@/shared/ui/progress-bar.types.ts';

type ProgressBarProps = {
  steps: ProgressBarStep[];
  currentStepIndex: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStepIndex,
}) => {
  return (
    <div className="w-full" data-testid="progress-bar">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isCurrent = currentStepIndex === index;
          const isCompleted = index < currentStepIndex;
          const isNotStarted = index > currentStepIndex;

          const primaryBgClass = isNotStarted ? 'bg-gray-200' : 'bg-purple-500';
          const primaryBorderClass = isNotStarted
            ? 'border-gray-200'
            : 'border-purple-500';

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Line Connector */}
              {index !== 0 && (
                <div
                  className={`absolute top-3 left-0 -translate-x-1/2 w-full h-0.5 z-0 ${primaryBgClass}`}
                />
              )}

              {/* Step Circle */}
              <div
                className={`z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                  isNotStarted ? 'bg-white' : 'bg-purple-100'
                } ${primaryBorderClass}`}
              >
                {isCompleted ? (
                  <svg
                    className="w-3 h-3 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span
                    className={`w-2 h-2 ${primaryBgClass} rounded-full`}
                  ></span>
                )}
              </div>

              {/* Labels */}
              <div className="text-center mt-3">
                <div
                  className={`text-sm font-medium ${isCurrent ? 'text-purple-700' : 'text-gray-700'}`}
                  data-is-current={isCurrent}
                >
                  {step.title}
                </div>
                <div
                  className={`text-xs ${isCurrent ? 'text-purple-500' : 'text-gray-400'}`}
                >
                  {step.subTitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ProgressBar };
