import styled from "styled-components";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "./Svg";

const HeaderWrapper = styled.nav`
  height: 60px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${(prop) => prop.theme.black.semiDark};
`;

const HeaderItems = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(prop) => prop.theme.black.veryDark};
`;

const Logo = styled.div`
  margin-top: 2px;
  margin-left: 16px;
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.white.veryWhite};
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.white.veryWhite};
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderItems>
        <IconWrap>
          <ArrowLeftIcon />
        </IconWrap>
        <Logo>COGHFLIX</Logo>
      </HeaderItems>
      <SearchBox>
        <MagnifyingGlassIcon />
      </SearchBox>
    </HeaderWrapper>
  );
}
