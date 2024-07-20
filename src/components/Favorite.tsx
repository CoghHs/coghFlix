import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie, makeImagePath, getMovie } from "../api";
import MovieDetail from "../components/MovieDetail";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
`;

const MovieList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;

const MovieItem = styled(motion.div)`
  cursor: pointer;
  height: 300px;
  position: relative;
`;

const MovieImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
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

export default function Favorite() {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const { data: likedMovies, isLoading: isLoadingMovies } = useQuery<IMovie[]>({
    queryKey: ["likedMovies"],
    queryFn: () => JSON.parse(localStorage.getItem("likedMovies") || "[]"),
  });

  const { data: movieDetail, isLoading: isLoadingMovieDetail } = useQuery({
    queryKey: ["movieDetail", selectedMovieId],
    queryFn: () =>
      selectedMovieId ? getMovie(selectedMovieId) : Promise.resolve(null),
    enabled: selectedMovieId !== null,
  });

  return (
    <Wrapper>
      {isLoadingMovies ? (
        <Loader />
      ) : (
        <MovieList variants={movieListVariants} initial="start" animate="end">
          {likedMovies?.map((movie) => (
            <MovieItem
              whileHover={{ scale: 0.9 }}
              variants={movieItemVariants}
              layoutId={movie.id + ""}
              key={movie.id}
              onClick={() => setSelectedMovieId(movie.id + "")}
            >
              <MovieImg src={makeImagePath(movie.poster_path)} />
            </MovieItem>
          ))}
        </MovieList>
      )}
      <AnimatePresence>
        {selectedMovieId && (
          <MovieDetail
            data={movieDetail || {}}
            setClicked={() => setSelectedMovieId(null)}
            clicked={!!selectedMovieId}
            isLoading={isLoadingMovieDetail}
          />
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
