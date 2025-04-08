"use client"
import { motion } from "framer-motion"

const Logo = () => {
  const text = "Fast Delivery".split("");
  return (
    <div className="flex items-center py-2 px-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          {/* Scooter with Bouncing Package */}
          <motion.div
            initial={{ x: -60 }}
            animate={{ x: 60 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            className="relative text-3xl pt-2"
          >
            🛵
            <motion.span
              initial={{ y: -7 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute left-4 text-lg"
            >
              📦
            </motion.span>
          </motion.div>

          {/* Free Delivery Text with Gradient & Wave Animation */}
          <motion.h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#f97316] via-[#ea580c] to-[#c2410c] text-transparent bg-clip-text flex -mt-5">
            {text.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }} // Wave effect
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.1, // Staggered effect
                }}
                className="inline-block gradient-text"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>
  )
}

export default Logo;