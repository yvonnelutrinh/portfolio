import { useEffect, useRef, useState } from "react";
import Window from "../Window/Window";

export interface TerminalLine {
  content: string | React.ReactNode;
  onClick?: () => void;
}

interface TerminalProps {
  lines?: TerminalLine[];
  title?: string;
  typewriter?: boolean;
  animateDelayMs?: number;
  className?: string;
}

export default function Terminal({
  lines,
  title = "process.terminal",
  typewriter = true,
  animateDelayMs = 100,
  className = "",
}: TerminalProps) {
  const [loaded, setLoaded] = useState(false);
  const [activeLine, setActiveLine] = useState(0);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const terminalRef = useRef(null);
  const hasStarted = useRef(false);

  // Default lines if none provided
  const terminalLines: TerminalLine[] =
    lines && lines.length > 0
      ? lines
      : [
          { content: "$ npm install coffee-to-code-converter" },
          { content: "$ ./make-pixels-dance.sh --gracefully" },
          { content: "$ git commit -m \"fix bugs; add features\"" },
          { content: "$ optimize --ux=\"delightful\" --cpu=\"happy\"" },
          { content: "$ import BrainOverflow from \"experience\"" },
          { content: "$ killall -9 bugs.process" },
          { content: "$ docker run --sarcasm=minimal --collaboration=expert teamwork" },
          { content: "$ ship-it --quality=\"perfection\" --sushi=true" },
        ];

  useEffect(() => {
    if (!typewriter) {
      setLoaded(true);
      setActiveLine(terminalLines.length - 1);
      setTypewriterComplete(true);
      return;
    }
    const observer = new window.IntersectionObserver(
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
          }, animateDelayMs);
        }
      },
      {
        threshold: 0.3,
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
    // eslint-disable-next-line
  }, [terminalLines.length, typewriter, animateDelayMs]);

  return (
    <section
      ref={terminalRef}
      className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
    >
      <Window title={title} className={className}>
        <div className="font-mono text-sm space-y-2 p-2">
          {terminalLines.slice(0, activeLine + 1).map((line, index) => (
            <div
              key={index}
              className={
                index === activeLine && !typewriterComplete
                  ? "border-r border-white animate-blink"
                  : ""
              }
            >
              <span
                className={index === activeLine && typewriter ? "animate-typewriter" : ""}
                onClick={line.onClick}
                role={line.onClick ? "button" : undefined}
                tabIndex={line.onClick ? 0 : undefined}
                style={line.onClick ? { cursor: "pointer" } : {}}
              >
                {line.content}
              </span>
            </div>
          ))}
        </div>
      </Window>
    </section>
  );
}