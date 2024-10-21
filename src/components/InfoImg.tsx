import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ImgProps {
    path: string;
    descr?: string;
    width: number;
    height: number;
    top: number;
    left: number;
}


const InfoImg: React.FC<ImgProps> = ({ path, descr, width, height, top, left }) => {
    const [isHovered, setIsHovered] = useState(false);

    const delta = 20 /* px */;

    return (
        <motion.div
            animate={{
                y: [-delta, delta]
            }}
            transition={{
                duration: 2 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 0
            }}
            style={{
                position: "absolute",
                top: `${top}px`,
                left: `${left}px`,
                width: `${width}px`,
                height: `${height}px`,
            }}>
            <Image
                src={path}
                filter={isHovered ? 'blur(0)' : 'blur(10px)'}
                transition="filter 0.1s ease-in-out"
                borderRadius={'20px'}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
        </motion.div>


    );
};

export default InfoImg;
