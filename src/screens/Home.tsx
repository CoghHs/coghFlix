import { useQuery } from "@tanstack/react-query";
import { getPopular, IAPIResponse, makeBgPath, makeImagePath } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${(prop) => prop.theme.white.veryWhite};
  text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.5);
`;

const MovieList = styled(motion.ul)`
  margin-top: 15px;
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

export default function Home() {
  const { data, isLoading } = useQuery<IAPIResponse>({
    queryKey: ["movies"],
    queryFn: getPopular,
  });
  const navigate = useNavigate();
  const onClicked = (movieId: number) => {
    navigate(`movies/${movieId}`);
  };
  return (
    <Wrapper>
      <Banner bgPhoto={makeBgPath(data?.results[0].backdrop_path || "")}>
        <Title>{data?.results[0].title}</Title>
      </Banner>
      <MovieList>
        {data?.results.map((movie) => (
          <MovieItem onClick={() => onClicked(movie.id)} key={movie.id}>
            <MovieImg src={makeImagePath(movie.poster_path)}></MovieImg>
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieItem>
        ))}
      </MovieList>
    </Wrapper>
  );
}
