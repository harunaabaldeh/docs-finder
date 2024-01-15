import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;