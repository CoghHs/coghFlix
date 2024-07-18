// App.tsx
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  width: 380px;
`;

const HeaderWrapper = styled.div`
  height: 60px;
  margin-bottom: 10px;
`;

function App() {
  return (
    <AppWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <Outlet />
      </ContentWrapper>
    </AppWrapper>
  );
}

export default App;
