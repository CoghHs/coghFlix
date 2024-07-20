import styled from "styled-components";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "./Svg";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const HeaderWrapper = styled(motion.nav)`
  position: fixed;
  width: 98.3%;
  height: 60px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${(prop) => prop.theme.black.semiDark};
`;

const HeaderItems = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrap = styled(motion.div)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(prop) => prop.theme.black.veryDark};
`;

const Logo = styled.div`
  margin-top: 2px;
  margin-left: 16px;
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.white.veryWhite};
  text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.5);
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.white.veryWhite};
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(82, 82, 82, 0.398)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
};

export default function Header() {
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const navigate = useNavigate();
  useMotionValueEvent(scrollY, "change", (y) => {
    if (scrollY.get() > 80) navAnimation.start("scroll");
    else navAnimation.start("top");
  });
  return (
    <HeaderWrapper
      variants={navVariants}
      animate={navAnimation}
      initial={"top"}
    >
      <HeaderItems>
        <IconWrap whileHover={{ scale: 1.2 }} onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </IconWrap>
        <Logo>COGHFLIX</Logo>
      </HeaderItems>
      <SearchBox>
        <MagnifyingGlassIcon />
      </SearchBox>
    </HeaderWrapper>
  );
}
