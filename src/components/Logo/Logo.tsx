import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Test: any = ({ className, ...props }: any) => (
  <button className={className} {...props}>
    UP
  </button>
);
const MotionLink = motion(Link);

function Logo() {
  return (
    <div className="flex items-center justify-center xs:justify-end">
      <MotionLink
        className="w-10 h-10 font-bold bg-black text-white flex items-center justify-center rounded"
        to={"/"}
        whileHover={{
          backgroundColor: [
            "#121212",
            "rgba(131,58,180,1)",
            "rgba(253,29,29,1)",
            "rgba(252,176,69,1)",
            "rgba(131,58,180,1)",
            "#121212",
          ],
          transition: { duration: 1, repeat: Infinity },
        }}
      >
        UP
      </MotionLink>
    </div>
  );
}

export default Logo;
