import { useEffect, useState } from "react";

export default function Terminal() {
    const [loaded, setLoaded] = useState(false);
    const [activeLine, setActiveLine] = useState(0);
    const [typewriterComplete, setTypewriterComplete] = useState(false);

    // Mock terminal lines
    const terminalLines = [
        "$ initiating development_process.sh",
        "$ loading creative_philosophy.module",
        "$ importing design.principles",
        "$ implementing functional_dry.code",
        "$ testing user_experience.flow",
        "$ resolving conflicts...",
        "$ merging approaches...",
        "$ process_complete: creating balanced applications that honor both creative rawness and technical skillsets"
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 300);

        // Simulate typewriter effect for terminal
        let lineIndex = 0;
        const interval = setInterval(() => {
            if (lineIndex < terminalLines.length) {
                setActiveLine(lineIndex);
                lineIndex++;
            } else {
                clearInterval(interval);
                setTypewriterComplete(true);
            }
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <section
                className={`mb-32 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="bg-black/80 border border-brutalist/20 rounded p-4">
                    <div className="flex items-center gap-2 mb-4 border-b border-brutalist/10 pb-2">
                        <div className="h-3 w-3 rounded-full bg-red-500 opacity-70"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-70"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500 opacity-70"></div>
                        <div className="font-mono text-xs text-brutalist/50 ml-2">design_process.terminal</div>
                    </div>

                    <div className="font-mono text-sm space-y-2 p-2">
                        {terminalLines.slice(0, activeLine + 1).map((line, index) => (
                            <div
                                key={index}
                                className={`${index === activeLine && !typewriterComplete
                                    ? 'border-r border-brutalist animate-blink'
                                    : ''
                                    }`}
                            >
                                <span className={index === activeLine ? 'animate-typewriter' : ''}>
                                    {line}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};