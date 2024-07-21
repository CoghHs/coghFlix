import { Link, useMatch, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  FireIcon,
  FolderPlusIcon,
  HeartIcon,
  HomeIcon,
  PlayIcon,
  StarIcon,
} from "./Svg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IMovie, makeImagePath } from "../api";

const SidebarWrap = styled.div`
  position: fixed;
  z-index: 10;
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

const FavMovies = styled.div`
  display: flex;
  flex-direction: column;
`;

const FavMovieItem = styled.div`
  margin-bottom: 10px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100px;
  border-radius: 10px;
  transition: transform 0.3s, all 0.3s;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
    box-shadow: 0 1px 10px rgba(102, 102, 102, 0.5);
  }
`;

const FavMovieImg = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 20px;
`;

const FavMovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FavMovieTitle = styled.h1`
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${(prop) => prop.theme.white.semiWhite};
`;

const FavMovieDate = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: ${(prop) => prop.theme.white.semiWhite};
`;

export default function Sidebar() {
  const homeMatch = useMatch("/");
  const popularMatch = useMatch("/popular");
  const comingSoonMatch = useMatch("/coming-soon");
  const nowPlayingMatch = useMatch("/now-playing");
  const favoriteMatch = useMatch("/favorite");
  const [likedMovies, setLikedMovies] = useState<IMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMovies = JSON.parse(
      localStorage.getItem("likedMovies") || "[]"
    );
    setLikedMovies(storedMovies);
  }, []);

  const onMovieClick = (movieId: number) => {
    navigate(`/favorite`);
  };

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
          <SidebarItem
            active={favoriteMatch !== null}
            to="/favorite"
            icon={<HeartIcon />}
            text="FAVORITE"
          />
        </Ul>
      </Nav>
      <FavMovies>
        {likedMovies.map((movie) => (
          <FavMovieItem key={movie.id} onClick={() => onMovieClick(movie.id)}>
            <FavMovieImg
              src={makeImagePath(movie.poster_path)}
              alt={movie.title}
            />
            <FavMovieInfo>
              <FavMovieTitle>{movie.title}</FavMovieTitle>
              <FavMovieDate>
                <StarIcon /> {movie.vote_average.toFixed(0)}
              </FavMovieDate>
            </FavMovieInfo>
          </FavMovieItem>
        ))}
      </FavMovies>
    </SidebarWrap>
  );
}
