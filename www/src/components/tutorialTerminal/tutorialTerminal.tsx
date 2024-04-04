import Image from 'next/image';

interface TutorialTerminalProps {
    step: 1 | 2 | 3;
}

const TutorialTerminal = ({ step }: TutorialTerminalProps) => {
    return (
        <div className="relative select-none">
            <div className="w-full mx-auto">
                <Image
                    width={500}
                    height={300}
                    src={`/terminal_step${step}.png`} 
                    alt={`Image representing step ${step} in the terminal`}
                    className="w-full h-auto max-w-full"
                />
            </div>
        </div>
    );
};

export default TutorialTerminal;
