import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

function App() {
  return (
    <Wrapper>
      <Sidebar />
      <Outlet />
    </Wrapper>
  );
}

export default App;
