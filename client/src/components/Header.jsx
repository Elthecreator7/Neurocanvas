import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) navigate("/result");
    else setShowLogin(true);
  };

  const sampleImages = [
    assets.sample_img_1,
    assets.sample_img_2,
    assets.sample_img_3,
    assets.sample_img_4,
    assets.sample_img_5,
    assets.sample_img_6,
  ];

  return (
    <motion.section
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Grid: text left, images right */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">

        {/* TEXT COLUMN (left) */}
        <div className="order-1 md:order-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white px-5 py-1.5 rounded-full border border-neutral-300"
          >
            <p className="text-sm text-black">
              Type it. See it. Believe it. Neurocanvas Delivers Magic
            </p>
            <img src={assets.star_icon} alt="" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="text-4xl xl:text-6xl 2xl:text-7xl font-semibold text-white leading-tight mt-6"
          >
            Turn text to{" "}
            <span className="bg-gradient-to-r from-purple-800 to-red-800 bg-clip-text text-transparent">
              image
            </span>{" "}
            in seconds.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-xl mt-5 text-white"
          >
            Neurocanvas is where imagination meets machine magic—type anything
            and watch it burst to life, from “a cat surfing in space” to “a
            robot sipping tea in Paris.” We’ve got your weird covered 😉
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
            onClick={handleClick}
            className="sm:text-lg text-white bg-black hover:bg-purple-800 mt-6 px-8 sm:px-12 py-2.5 inline-flex items-center gap-2 rounded-full"
          >
            {user ? "Generate Image" : "Get Started for free"}
            <img src={assets.star_group} alt="" className="h-6" />
          </motion.button>
        </div>

        {/* IMAGES COLUMN (right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-2"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {sampleImages.map((src, i) => (
              <motion.img
                key={i}
                whileHover={{ scale: 1.05 }}
                src={src}
                alt={`Generated sample ${i + 1}`}
                className="w-full rounded-lg shadow-sm"
              />
            ))}
          </div>
          <p className="mt-3 text-center md:text-left text-white">
            Generated images from Neurocanvas
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Header;
