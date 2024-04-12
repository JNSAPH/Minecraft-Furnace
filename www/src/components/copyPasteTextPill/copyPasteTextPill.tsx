'use client'

import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CopyPasteTextPillProps {
    text: string;
}

const CopyPasteTextPill = ({ text }: CopyPasteTextPillProps) => {
    const [copied, setCopied] = useState(false);

    const handleConfetti = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);

        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.5 }
        });

        // Reset the copied state after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 5000);
    }

    const classString = "bg-blush px-[19px] py-[10px] bg-opacity-25 rounded-full flex flex-row items-center justify-center space-x-6 border-blush border-opacity-25 border-2"

    return (
        <>
            <noscript>
                <div className={classString}>
                    <code>
                        {text}
                    </code>
                </div>
            </noscript>
            <motion.div
                className={classString}
                initial={{ opacity: 0, y: -20, scaleY: 0.8, scaleX: 0.8 }}
                animate={{ opacity: 1, y: 0, scaleY: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}>
                <code>
                    {text}
                </code>
                <div className="hover:scale-95 active:scale-90 transition cursor-pointer" onClick={handleConfetti}>
                    <div className='relative'>
                        <motion.svg
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 5 }}
                            width="20" viewBox="0 0 18 18" fill="none" className='absolute fill-blush stroke-blush'>
                            <path d="M2.38803 16.923L2.72852 16.2548H2.72852L2.38803 16.923ZM1.07698 15.612L0.408726 15.9525H0.408726L1.07698 15.612ZM16.923 15.612L16.2548 15.2715V15.2715L16.923 15.612ZM15.612 16.923L15.2715 16.2548H15.2715L15.612 16.923ZM16.923 2.38803L16.2548 2.72852V2.72852L16.923 2.38803ZM15.612 1.07698L15.9525 0.408726V0.408726L15.612 1.07698ZM1.07698 2.38803L1.74524 2.72852L1.07698 2.38803ZM2.38803 1.07698L2.72852 1.74524L2.38803 1.07698ZM7.99678 11.4142L7.46645 11.9445C7.6071 12.0852 7.79786 12.1642 7.99678 12.1642C8.19569 12.1642 8.38646 12.0852 8.52711 11.9445L7.99678 11.4142ZM13.0271 7.44452C13.32 7.15163 13.32 6.67676 13.0271 6.38386C12.7342 6.09097 12.2593 6.09097 11.9664 6.38386L13.0271 7.44452ZM6.52711 8.88386C6.23421 8.59097 5.75934 8.59097 5.46645 8.88386C5.17355 9.17676 5.17355 9.65163 5.46645 9.94452L6.52711 8.88386ZM16.5 5.55V12.45H18V5.55H16.5ZM12.45 16.5H5.55V18H12.45V16.5ZM1.5 12.45V5.55H0V12.45H1.5ZM5.55 1.5H12.45V0H5.55V1.5ZM5.55 16.5C4.69755 16.5 4.10331 16.4994 3.64068 16.4616C3.1868 16.4245 2.92604 16.3554 2.72852 16.2548L2.04754 17.5913C2.49175 17.8176 2.97189 17.912 3.51853 17.9566C4.05641 18.0006 4.7223 18 5.55 18V16.5ZM0 12.45C0 13.2777 -0.000583291 13.9436 0.0433634 14.4815C0.0880254 15.0281 0.182385 15.5082 0.408726 15.9525L1.74524 15.2715C1.6446 15.074 1.57546 14.8132 1.53838 14.3593C1.50058 13.8967 1.5 13.3025 1.5 12.45H0ZM2.72852 16.2548C2.30516 16.0391 1.96095 15.6948 1.74524 15.2715L0.408726 15.9525C0.768251 16.6581 1.34193 17.2318 2.04754 17.5913L2.72852 16.2548ZM16.5 12.45C16.5 13.3025 16.4994 13.8967 16.4616 14.3593C16.4245 14.8132 16.3554 15.074 16.2548 15.2715L17.5913 15.9525C17.8176 15.5082 17.912 15.0281 17.9566 14.4815C18.0006 13.9436 18 13.2777 18 12.45H16.5ZM12.45 18C13.2777 18 13.9436 18.0006 14.4815 17.9566C15.0281 17.912 15.5082 17.8176 15.9525 17.5913L15.2715 16.2548C15.074 16.3554 14.8132 16.4245 14.3593 16.4616C13.8967 16.4994 13.3025 16.5 12.45 16.5V18ZM16.2548 15.2715C16.0391 15.6948 15.6948 16.0391 15.2715 16.2548L15.9525 17.5913C16.6581 17.2318 17.2318 16.6581 17.5913 15.9525L16.2548 15.2715ZM18 5.55C18 4.7223 18.0006 4.05641 17.9566 3.51853C17.912 2.97189 17.8176 2.49175 17.5913 2.04754L16.2548 2.72852C16.3554 2.92604 16.4245 3.1868 16.4616 3.64068C16.4994 4.10331 16.5 4.69755 16.5 5.55H18ZM12.45 1.5C13.3025 1.5 13.8967 1.50058 14.3593 1.53838C14.8132 1.57546 15.074 1.6446 15.2715 1.74524L15.9525 0.408726C15.5082 0.182385 15.0281 0.0880254 14.4815 0.0433634C13.9436 -0.000583291 13.2777 0 12.45 0V1.5ZM17.5913 2.04754C17.2318 1.34193 16.6581 0.768251 15.9525 0.408726L15.2715 1.74524C15.6948 1.96095 16.0391 2.30516 16.2548 2.72852L17.5913 2.04754ZM1.5 5.55C1.5 4.69755 1.50058 4.10331 1.53838 3.64068C1.57546 3.1868 1.6446 2.92604 1.74524 2.72852L0.408726 2.04754C0.182385 2.49175 0.0880254 2.97189 0.0433634 3.51853C-0.000583291 4.05641 0 4.7223 0 5.55H1.5ZM5.55 0C4.7223 0 4.05641 -0.000583291 3.51853 0.0433634C2.97189 0.0880254 2.49175 0.182385 2.04754 0.408726L2.72852 1.74524C2.92604 1.6446 3.1868 1.57546 3.64068 1.53838C4.10331 1.50058 4.69755 1.5 5.55 1.5V0ZM1.74524 2.72852C1.96095 2.30516 2.30516 1.96095 2.72852 1.74524L2.04754 0.408726C1.34193 0.768251 0.768251 1.34193 0.408726 2.04754L1.74524 2.72852ZM8.52711 11.9445L13.0271 7.44452L11.9664 6.38386L7.46645 10.8839L8.52711 11.9445ZM5.46645 9.94452L7.46645 11.9445L8.52711 10.8839L6.52711 8.88386L5.46645 9.94452Z" stroke-width="0.5" />
                        </motion.svg>
                        <motion.svg
                            initial={{ opacity: copied ? 0 : 1, y: 20 }}
                            animate={{ opacity: copied ? 0 : 1, y: copied ? -5 : 0 }}
                            height="22" viewBox="0 0 16 16" fill="none" className='stroke-blush'>
                            <path d="M10.4375 5.5625V2.75C10.4375 1.81802 9.68198 1.0625 8.75 1.0625H2.75C1.81802 1.0625 1.0625 1.81802 1.0625 2.75V8.75C1.0625 9.68198 1.81802 10.4375 2.75 10.4375H5.5625M7.25 5.5625H13.25C14.182 5.5625 14.9375 6.31802 14.9375 7.25V13.25C14.9375 14.182 14.182 14.9375 13.25 14.9375H7.25C6.31802 14.9375 5.5625 14.182 5.5625 13.25V7.25C5.5625 6.31802 6.31802 5.5625 7.25 5.5625Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </motion.svg>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default CopyPasteTextPill;