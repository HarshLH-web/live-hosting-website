import { motion } from "framer-motion";
import PropTypes from 'prop-types';

function BouncyButton({text, href, className}) {
  return (
    <>
    <motion.a
      href={href}
      className={`${className} py-2 px-6 rounded-full font-semibold flex items-center transition duration-300`}
      whileTap={{ scale: 0.95 }} // Slight shrink on tap
      onClick={(e) => {
        const element = e.target;
        element.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(0.95)" },
            { transform: "scale(1)" },
          ],
          {
            duration: 300, // Duration of the bounce
            easing: "ease-out",
          }
        );
      }}
    >
      {text}
    </motion.a>
    </>
  )
}

BouncyButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default BouncyButton