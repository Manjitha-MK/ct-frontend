import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";

const IntroSplash = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const played = sessionStorage.getItem("introPlayed");

    if (played) {
      setShow(false);
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("introPlayed", "true");
      onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Glow */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 2 }}
            transition={{ duration: 2 }}
            className="absolute w-[500px] h-[500px] bg-amber-500/20 blur-3xl rounded-full"
          />

          {/* Logo */}
          <motion.div className="text-center">
            <motion.img
              src={Logo}
              className="w-28 md:w-40 mx-auto drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.h1
              className="mt-6 text-3xl md:text-5xl font-black text-amber-400 tracking-widest"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ delay: 0.5 }}
            >
              AURA CRICKET
            </motion.h1>

            <motion.p
              className="text-gray-400 mt-3 text-xs tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              ONE TEAM • ONE AURA • ONE DREAM
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="h-[2px] bg-amber-400 mt-6 mx-auto w-40"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroSplash;