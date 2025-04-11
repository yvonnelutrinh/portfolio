import { motion } from "motion/react";
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
        className="rounded-2xl shadow-lg overflow-hidden border border-gray-200 bg-white"
        whileHover={{ scale: 1.01 }}
      >
        <div className="p-2 text-center font-medium bg-gray-100 text-gray-800">
          {title}
        </div>
  
        <div className="w-full overflow-auto bg-black flex justify-center">
          <div
            className="border border-gray-300"
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
              sandbox="allow-scripts allow-same-origin allow-forms"
              loading="lazy"
              className="w-full h-full border-0"
              style={{ backgroundColor: "white" }}
            />
          </div>
        </div>
      </motion.div>
    );
  };
  