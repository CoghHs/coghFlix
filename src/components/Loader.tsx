import styled from "styled-components";

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 68px;
  font-weight: bold;
  color: white;
`;

export default function Loader() {
  return <Loading>LOADING</Loading>;
}
