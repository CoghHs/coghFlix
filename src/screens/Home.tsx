import { useQuery } from "@tanstack/react-query";
import {
  getPopular,
  IAPIResponse,
  IMovie,
  makeBgPath,
  makeImagePath,
} from "../api";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { BookmarkIcon, BookmarkSlashIcon } from "../components/Svg";
import { Navigation, Scrollbar, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./SwiperBtn.css";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Wrapper = styled.div`
  width: 79%;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  z-index: 0;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  border-radius: 10px;
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

const MovieItem = styled(motion.li)<{ size: string }>`
  cursor: pointer;
  grid-column: ${(props) => (props.size === "large" ? "span 3" : "span 2")};
  height: ${(props) => (props.size === "large" ? "400px" : "400px")};
  position: relative;
`;

const LikeButton = styled.button<{ liked: boolean }>`
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  font-size: 24px;
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
  font-size: 30px;
  font-weight: bold;
  color: ${(prop) => prop.theme.white.veryWhite};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  padding: 5px;
  border-radius: 5px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  z-index: 1;
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(prop) => prop.theme.black.veryDark};
  border-radius: 10px;
`;

const BigCover = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(180, 180, 180, 0.4);
`;

const BigInfo = styled.div`
  left: 30px;
  top: 230px;
  position: absolute;
  display: flex;
  align-items: center;
`;

const BigInfoCover = styled.img`
  width: 150px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(180, 180, 180, 0.1);
`;

const BigTitle = styled.h1`
  margin-top: 130px;
  font-size: 30px;
  font-weight: bold;
  margin-left: 10px;
  color: ${(prop) => prop.theme.white.veryWhite};
  text-shadow: 2px 2px 4px rgba(137, 136, 136, 0.8);
`;

const As = styled.div`
  margin-top: 80px;
  padding: 20px;
`;

const BigOverVew = styled.span`
  font-size: 18px;
  font-weight: lighter;
`;

export default function Home() {
  const { data, isLoading } = useQuery<IAPIResponse>({
    queryKey: ["movies"],
    queryFn: getPopular,
  });

  const movieMatch = useMatch("movies/:movieId");
  const navigate = useNavigate();
  const onClicked = (movieId: number) => {
    navigate(`movies/${movieId}`);
  };
  const onOverlayClick = () => navigate("/");
  const clickedMovie =
    movieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id + "" === movieMatch.params.movieId);

  const [likedMovies, setLikedMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const storedMovies = JSON.parse(
      localStorage.getItem("likedMovies") || "[]"
    );
    setLikedMovies(storedMovies);
  }, []);

  const isLiked = (movie: IMovie) => {
    return likedMovies.some((likedMovie) => likedMovie.id === movie.id);
  };

  const handleLikeClick = (movie: IMovie) => {
    let updatedLikedMovies = [];
    if (isLiked(movie)) {
      updatedLikedMovies = likedMovies.filter(
        (likedMovie) => likedMovie.id !== movie.id
      );
    } else {
      updatedLikedMovies = [...likedMovies, movie];
    }
    setLikedMovies(updatedLikedMovies);
    localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
  };

  const SWIPER_DELAY = 1.5 * 1000;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Swiper
            modules={[Navigation, Scrollbar, Autoplay, EffectFade]}
            autoplay={{ delay: SWIPER_DELAY, disableOnInteraction: false }}
            slidesPerView={1}
            effect="fade"
            navigation
            scrollbar={{ draggable: true }}
            style={{
              width: "100%",
              minHeight: "300px",
              maxHeight: "500px",
              backgroundColor: "rgba(0, 0, 0)",
            }}
          >
            {data?.results.slice(0, 5).map((i: IMovie, index) => (
              <SwiperSlide key={index}>
                <Banner bgPhoto={makeBgPath(i.backdrop_path || "")}>
                  <Title>{i.title}</Title>
                </Banner>
              </SwiperSlide>
            ))}
          </Swiper>

          <MovieList>
            {data?.results.map((movie, index) => (
              <MovieItem
                whileHover={{ scale: 0.9 }}
                size={index % 4 === 0 || index % 4 === 3 ? "large" : "small"}
                layoutId={movie.id + ""}
                onClick={() => onClicked(movie.id)}
                key={movie.id}
              >
                <MovieImg src={makeBgPath(movie.poster_path)} />
                <MovieTitle>{movie.title}</MovieTitle>
              </MovieItem>
            ))}
            <AnimatePresence initial={false}>
              {movieMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <BigMovie layoutId={movieMatch.params.movieId}>
                    {clickedMovie ? (
                      <>
                        <BigCover
                          src={makeBgPath(clickedMovie.backdrop_path)}
                          alt="movie"
                        />
                        <BigInfo>
                          <BigInfoCover
                            src={makeImagePath(clickedMovie.poster_path)}
                          />
                          <BigTitle>{clickedMovie.title}</BigTitle>
                        </BigInfo>
                        <LikeButton
                          liked={isLiked(clickedMovie)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeClick(clickedMovie);
                          }}
                        >
                          {isLiked(clickedMovie) ? (
                            <BookmarkSlashIcon />
                          ) : (
                            <BookmarkIcon />
                          )}
                        </LikeButton>
                        <As>
                          <BigOverVew>{clickedMovie.overview}</BigOverVew>
                        </As>
                      </>
                    ) : null}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
          </MovieList>
        </>
      )}
    </Wrapper>
  );
}
