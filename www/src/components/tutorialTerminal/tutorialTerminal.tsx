interface TutorialTerminalProps {
    step: 1 | 2 | 3;
}

const TutorialTerminal = ({ step }: TutorialTerminalProps) => {
    return (
        <div className="relative select-none">
            <div className="w-full max-w-[500px] mx-auto">
                <img
                src={`terminal_step${step}.png`} 
                alt={`Image representing step ${step} in the terminal`}
                className="w-full pointer-events-none" />
            </div>
        </div>
    );
};

export default TutorialTerminal;
