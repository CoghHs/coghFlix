import { useQuery } from "@tanstack/react-query";
import { getPopular, IAPIResponse, makeBgPath, makeImagePath } from "../api";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
`;

const Banner = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  font-weight: bold;
  color: ${(prop) => prop.theme.white.veryWhite};
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export default function Home() {
  const { data, isLoading } = useQuery<IAPIResponse>({
    queryKey: ["movies"],
    queryFn: getPopular,
  });
  const bgPhoto = makeBgPath(data?.results[0].backdrop_path || "");

  return (
    <Wrapper>
      <Banner>
        <BannerImage src={bgPhoto} alt={data?.results[0].title} />
        <Title>{data?.results[0].title}</Title>
      </Banner>
    </Wrapper>
  );
}
