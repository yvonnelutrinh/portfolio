import { motion } from "motion/react";
import Window from "../Window/Window";
type ProjectEmbedProps = {
    title: string;
    url: string;
    width?: number;
    height?: number;
    scale?: number;
};

export const ProjectEmbed = ({
    title,
    url,
    width = 1280,
    height = 800,
    scale = 0.75,
}: ProjectEmbedProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
        >
            <Window title={title}>

                <div className="w-full overflow-auto bg-black flex justify-center">
                    <div
                        className="border border-gray-300max-w-[100vw]"
                        style={{
                            width,
                            height,
                            transform: `scale(${scale})`,
                            transformOrigin: "top left",
                        }}
                    >
                        <iframe
                            src={url}
                            title={title}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
                            loading="lazy"
                            className="w-full h-full border-0 max-w-[100vw]"
                            style={{ backgroundColor: "white" }}
                        />
                    </div>
                </div>
            </Window>
        </motion.div>
    );
};
