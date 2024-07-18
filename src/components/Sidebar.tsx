// Header.tsx
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { FireIcon, FolderPlusIcon, HomeIcon, PlayIcon } from "./Svg";
import { motion } from "framer-motion";

const SidebarWrap = styled.div`
  padding: 20px;
  width: 250px;
  height: 100vh;
  background-color: ${(props) => props.theme.black.veryDark};
  color: ${(props) => props.theme.white.semiWhite};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-right: 10px;
`;

const Nav = styled.nav`
  width: 100%;
`;

const Ul = styled.ul``;

const Li = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: color 0.3s;
  &:hover {
    color: ${(prop) => prop.theme.white.veryWhite};
  }
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.white.semiWhite};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  transition: color 0.3s;
  &:hover {
    color: ${(prop) => prop.theme.white.veryWhite};
  }
`;

const Circle = styled(motion.div)`
  background-color: white;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export default function Sidebar() {
  const homeMatch = useMatch("");
  const popularMatch = useMatch("popular");

  return (
    <SidebarWrap>
      <Nav>
        <Ul>
          <Li>
            {homeMatch && <Circle />}
            <HomeIcon />
            <StyledLink to="/">HOME</StyledLink>
          </Li>
          <Li>
            {popularMatch && <Circle />}
            <FireIcon />
            <StyledLink to="/popular">POPULAR</StyledLink>
          </Li>
          <Li>
            <FolderPlusIcon />
            <StyledLink to="/coming-soon">COMING SOON</StyledLink>
          </Li>
          <Li>
            <PlayIcon />
            <StyledLink to="/now-playing">NOW PLAYING</StyledLink>
          </Li>
        </Ul>
      </Nav>
    </SidebarWrap>
  );
}
