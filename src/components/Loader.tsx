import styled from "styled-components";
import { motion } from "framer-motion";

const SpinnerContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.black.veryDark};
`;

const Spinner = styled(motion.div)`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 8px solid #ffffff;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const spinnerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Loader() {
  return (
    <SpinnerContainer
      variants={spinnerVariants}
      initial="hidden"
      animate="visible"
    >
      <Spinner />
    </SpinnerContainer>
  );
}
