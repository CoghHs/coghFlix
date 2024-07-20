import styled from "styled-components";
import { IMovieDetail, makeBgPath } from "../api";
import { AnimatePresence, motion } from "framer-motion";

interface MovieDetailProps {
  data: IMovieDetail | undefined;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  clicked: boolean;
  isLoading: boolean;
}

const Wrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const DetailWrap = styled(motion.div)`
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  position: absolute;
  width: 800px;
  height: 800px;
  overflow: hidden;
  left: 0;
  right: 0;
  border-radius: 15px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.veryDark};
`;

const DetailCover = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center center;
`;

const DetailTitle = styled.h1`
  color: ${(props) => props.theme.white.lighter};
  margin-top: -40px;
  margin-left: 30px;
  font-weight: 600;
  font-size: 40px;
`;

const DetailWrapItem = styled.div`
  display: flex;
  position: relative;
  top: -50px;
`;

const DetailInfo = styled.div`
  position: relative;
  top: -200px;
  padding: 20px;
`;

const DetailPost = styled.div`
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  position: relative;
  top: -200px;
  left: 20px;
  width: 200px;
  height: 250px;
  background-size: cover;
  background-position: center center;
  border-radius: 15px;
`;

const DetailOverview = styled.p`
  margin-top: -30px;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const DetailDescription = styled.p`
  padding: 5px 0px;
`;

const HiXCircleBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default function MovieDetail({
  data,
  setClicked,
  clicked,
  isLoading,
}: MovieDetailProps) {
  return (
    <>
      {clicked &&
        (isLoading ? (
          <div>Loading . . .</div>
        ) : (
          <Wrapper>
            <Overlay
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setClicked(!clicked)}
            />
            <DetailWrap layoutId={data?.id + ""}>
              <DetailCover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeBgPath(
                    data?.backdrop_path!
                  )})`,
                }}
              />
              <HiXCircleBtn onClick={() => setClicked(false)} />
              <DetailWrapItem>
                <DetailPost
                  style={{
                    backgroundImage: ` url(${makeBgPath(data?.poster_path!)})`,
                  }}
                />
                <DetailTitle>{data?.title}</DetailTitle>
              </DetailWrapItem>
              <DetailInfo>
                <DetailOverview>{data?.overview}</DetailOverview>
                <DetailDescription>
                  Runtime: {data?.runtime} minutes
                </DetailDescription>
                <DetailDescription>
                  Rating: {data?.vote_average.toFixed(0)}
                </DetailDescription>
                <DetailDescription>
                  Homepage: {data?.homepage}
                </DetailDescription>
              </DetailInfo>
            </DetailWrap>
          </Wrapper>
        ))}
    </>
  );
}
