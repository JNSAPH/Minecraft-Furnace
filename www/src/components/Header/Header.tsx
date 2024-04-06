'use client';

import { motion } from "framer-motion";
import CopyPasteTextPill from "../copyPasteTextPill/copyPasteTextPill";
import LogoText from "../logoText/logoText";

const Header = () => {

    return (
        <motion.div
            className="h-full  bg-gradient-to-t from-bg-mid to-bg-light rounded-2xl p-4 relative overflow-hidden"
        >
            <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0 blur-lg"
                autoPlay
                loop
                muted
                src="/output.webm"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full flex flex-col space-y-4 justify-center items-center z-5">
                <LogoText />
                <CopyPasteTextPill text={'curl -fsSL https://startfurnace.com/install | bash'} />
            </div>
        </motion.div>
    );
}

export default Header;