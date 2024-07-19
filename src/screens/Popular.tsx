import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getPopular, IAPIResponse, makeImagePath } from "../api";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
`;

const MovieList = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;

const MovieItem = styled.li`
  cursor: pointer;
`;

const MovieImg = styled(motion.img)`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const MovieTitle = styled.h1`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: ${(prop) => prop.theme.white.semiWhite};
`;

export default function Popular() {
  const { data, isLoading } = useQuery<IAPIResponse>({
    queryKey: ["movies"],
    queryFn: getPopular,
  });

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <MovieList>
          {data?.results.map((movie) => (
            <MovieItem key={movie.id}>
              <MovieImg src={makeImagePath(movie.poster_path)}></MovieImg>
              <MovieTitle>{movie.title}</MovieTitle>
            </MovieItem>
          ))}
        </MovieList>
      )}
    </Wrapper>
  );
}
