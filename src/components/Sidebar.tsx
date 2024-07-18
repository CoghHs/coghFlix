// Header.tsx
import { Link, useMatch } from "react-router-dom";
import styled, { css } from "styled-components";
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

interface ListItemProps {
  active: boolean;
}

const Li = styled.li<ListItemProps>`
  position: relative;
  padding-left: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: color 0.3s;

  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.white.veryWhite};
    `}

  &:hover {
    color: ${(props) => props.theme.white.veryWhite};
  }
`;

const StyledLink = styled(Link)<ListItemProps>`
  color: ${(props) => props.theme.white.semiWhite};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  transition: color 0.3s;
  flex-grow: 1;

  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.white.veryWhite};
    `}

  &:hover {
    color: ${(props) => props.theme.white.veryWhite};
  }
`;

const Bar = styled(motion.div)<ListItemProps>`
  position: absolute;
  left: 0;
  background-color: ${(props) => props.theme.white.semiWhite};
  width: 3px;
  height: 24px;
  border-radius: 10px;
  margin-right: 5px;
  ${(props) =>
    props.active &&
    css`
      background-color: ${props.theme.white.veryWhite};
    `}
`;

interface SidebarItemProps {
  active: boolean;
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem = ({ active, to, icon, text }: SidebarItemProps) => (
  <Li active={active}>
    {active && <Bar active={active} layoutId="bar" />}
    {icon}
    <StyledLink active={active} to={to}>
      {text}
    </StyledLink>
  </Li>
);

export default function Sidebar() {
  const homeMatch = useMatch("");
  const popularMatch = useMatch("popular");
  const comingSoonMatch = useMatch("coming-soon");
  const nowPlayingMatch = useMatch("now-playing");
  return (
    <SidebarWrap>
      <Nav>
        <Ul>
          <SidebarItem
            active={homeMatch !== null}
            to="/"
            icon={<HomeIcon />}
            text="HOME"
          />
          <SidebarItem
            active={popularMatch !== null}
            to="/popular"
            icon={<FireIcon />}
            text="POPULAR"
          />
          <SidebarItem
            active={comingSoonMatch !== null}
            to="/coming-soon"
            icon={<FolderPlusIcon />}
            text="COMING SOON"
          />
          <SidebarItem
            active={nowPlayingMatch !== null}
            to="/now-playing"
            icon={<PlayIcon />}
            text="NOW PLAYING"
          />
        </Ul>
      </Nav>
    </SidebarWrap>
  );
}
