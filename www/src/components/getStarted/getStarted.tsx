'use client';

import TutorialTerminal from "@/components/tutorialTerminal/tutorialTerminal";
import { useEffect, useState } from "react";

const GetStartedComponent = () => {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev: any) => {
                if (prev === 3) {
                    return 1;
                } else {
                    return prev + 1;
                }
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-rows-[auto_auto] gap-x-4 grid-cols-[40px_auto]">
            <svg height="40" viewBox="0 0 16 16" fill="none" className="mr-2 stroke-cerise">
                <path d="M4.14583 8.9375H3.12204C2.36298 8.9375 1.88067 8.12502 2.24415 7.45865L2.83471 6.37594C3.36041 5.41216 4.37057 4.8125 5.4684 4.8125H7.42188M4.14583 8.9375L7.0625 11.8542M4.14583 8.9375L7.42188 4.8125M7.0625 11.8542V12.878C7.0625 13.637 7.87498 14.1193 8.54135 13.7559L9.62406 13.1653C10.5878 12.6396 11.1875 11.6294 11.1875 10.5316V8.57812M7.0625 11.8542L11.1875 8.57812M11.1875 8.57812C13.2434 6.69352 14.6078 4.6566 14.8852 2.0611C14.9439 1.51194 14.4881 1.05612 13.9389 1.11482C11.3434 1.39225 9.30648 2.75657 7.42188 4.8125M2.60417 14.9375H2.0625C1.51021 14.9375 1.0625 14.4898 1.0625 13.9375V13.3959C1.0625 12.5444 1.75273 11.8542 2.60417 11.8542C3.45561 11.8542 4.14583 12.5444 4.14583 13.3959C4.14583 14.2473 3.45561 14.9375 2.60417 14.9375Z" stroke-width="1.25" stroke-linejoin="round" />
            </svg>
            <p className="font-bold text-2xl">Get Started</p>
            <p></p>
            <div>
            <div className="grid grid-cols-1 md:grid-cols-[300px_auto] gap-x-4 gap-y-4">
            <div className="space-y-8">
                <div>
                    <p onClick={() => setCurrentStep(1)}
                        className={`font-bold text-xl cursor-pointer transition ${currentStep === 1 ? "text-cerise" : "text-white"}`}>Step 1</p>
                    <p>Run the Installer Script</p>
                </div>
                <div>
                    <p onClick={() => setCurrentStep(2)}
                        className={`font-bold text-xl cursor-pointer transition ${currentStep === 2 ? "text-cerise" : "text-white"}`}>Step 2</p>
                    <p>Follow the Instructions and fill out the questionnaire</p>
                </div>
                <div>
                    <p onClick={() => setCurrentStep(3)}
                        className={`font-bold text-xl cursor-pointer transition ${currentStep === 3 ? "text-cerise" : "text-white"}`}>Step 3</p>
                    <p>Start the Server using the generated Script</p>
                </div>
            </div>
            <TutorialTerminal step={currentStep} />
        </div>
            </div>
        </div>
    )
}

export default GetStartedComponent;