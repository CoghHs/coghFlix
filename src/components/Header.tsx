import styled from "styled-components";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "./Svg";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

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

const IconWrap = styled.div`
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
        <IconWrap>
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
