import { useEffect, useRef, useState } from "react";
import Window from "../Window/Window";

export default function Terminal() {
    const [loaded, setLoaded] = useState(false);
    const [activeLine, setActiveLine] = useState(0);
    const [typewriterComplete, setTypewriterComplete] = useState(false);
    const terminalRef = useRef(null); // ref for intersection
    const hasStarted = useRef(false); // make sure effect runs only once
    const title = "process.terminal";

    const terminalLines = [
        "$ initiating development_process.sh",
        "$ loading creative_philosophy.module",
        "$ importing design.principles",
        "$ implementing functional_dry.code",
        "$ testing user_experience.flow",
        "$ resolving conflicts...",
        "$ merging approaches...",
        "$ process_complete: balanced applications deployed"
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted.current) {
                    hasStarted.current = true;
                    setLoaded(true);

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
                }
            },
            {
                threshold: 0.3, // adjust sensitivity if needed (0.3 = 30% in view)
            }
        );

        if (terminalRef.current) {
            observer.observe(terminalRef.current);
        }

        return () => {
            if (terminalRef.current) {
                observer.unobserve(terminalRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={terminalRef}
            className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
            <Window title={title}>
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
            </Window>
        </section>
    );
}