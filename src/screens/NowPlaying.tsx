import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  getMovie,
  getNowPlaying,
  IAPIResponse,
  IMovieDetail,
  makeImagePath,
} from "../api";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import { useState } from "react";
import MovieDetail from "../components/MovieDetail";

const Wrapper = styled.div`
  width: 100%;
`;

const MovieList = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;

const MovieItem = styled(motion.li)`
  cursor: pointer;

  position: relative;
`;

const MovieImg = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const MovieTitle = styled.h1`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${(prop) => prop.theme.white.veryWhite};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  padding: 5px;
  border-radius: 5px;
`;

const movieListVariants = {
  start: {
    scale: 0,
    opacity: 0,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      delayChildren: 0.13,
      staggerChildren: 0.13,
    },
  },
};

const movieItemVariants = {
  start: { scale: 0, opacity: 0 },
  end: { scale: 1, opacity: 1 },
};

export default function CoimingSoon() {
  const [clicked, setClicked] = useState(false);
  const [movieId, setMovieId] = useState<string>("");
  const { data, isLoading } = useQuery<IAPIResponse>({
    queryKey: ["movies", "nowplaying"],
    queryFn: getNowPlaying,
  });
  const { data: movieDetail, isLoading: Loading } = useQuery<IMovieDetail>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
    enabled: movieId !== "",
  });

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieList variants={movieListVariants} initial="start" animate="end">
            {data?.results.map((movie) => (
              <MovieItem
                whileHover={{ scale: 0.9 }}
                variants={movieItemVariants}
                layoutId={movie.id + ""}
                key={movie.id}
                onClick={() => {
                  setClicked(true);
                  setMovieId(movie.id + "");
                }}
              >
                <MovieImg src={makeImagePath(movie.poster_path)} />
              </MovieItem>
            ))}
          </MovieList>
          <AnimatePresence initial={false}>
            {clicked && movieDetail ? (
              <MovieDetail
                data={movieDetail}
                setClicked={setClicked}
                clicked={clicked}
                isLoading={isLoading}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
