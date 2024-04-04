'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LogoText = () => {
    const [isGlitching, setIsGlitching] = useState(false)

    let logoText = ""
    logoText += "███████╗██╗░░░██╗██████╗░███╗░░██╗░█████╗░░█████╗░███████╗\n"
    logoText += "██╔════╝██║░░░██║██╔══██╗████╗░██║██╔══██╗██╔══██╗██╔════╝\n"
    logoText += "█████╗░░██║░░░██║██████╔╝██╔██╗██║███████║██║░░╚═╝█████╗░░\n"
    logoText += "██╔══╝░░██║░░░██║██╔══██╗██║╚████║██╔══██║██║░░██╗██╔══╝░░\n"
    logoText += "██║░░░░░╚██████╔╝██║░░██║██║░╚███║██║░░██║╚█████╔╝███████╗\n"
    logoText += "╚═╝░░░░░░╚═════╝░╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝░╚════╝░╚══════╝"

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => {
                setIsGlitching(false);
            }, 500);
        }, 10000 + Math.random() * 2000);

        return () => clearInterval(interval);
    }, []);

    // Glitch effect on text
    const glitch = (text: string) => {
        let newText = ""
        for (let i = 0; i < text.length; i++) {
            if (Math.random() > 0.9 && text[i] !== "\n") {
                newText += String.fromCharCode(Math.random() * 93 + 33)
            } else {
                newText += text[i]
            }
        }
        return newText
    }

    return (
        <motion.pre 
            className="leading-[19px] text-transparent bg-clip-text bg-gradient-to-b from-cerise to-blush"
            initial={{ opacity: 0, scale: 0.8}}
            animate={{ opacity: 1, scale: 1}}
            transition={{ duration: 0.75 }}>
            {isGlitching ? glitch(logoText) : logoText}
        </motion.pre>
    )
}

export default LogoText;