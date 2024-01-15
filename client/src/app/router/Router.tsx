import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Contact from "../../features/contact/Contact";
import AboutPage from "../../features/about/AboutPage";
import LoginForm from "../../features/user/LoginForm";
import MissingDocuments from "../../features/missingDocument/MissingDocuments";
import Home from "../../features/home/Home";
import RegisterForm from "../../features/user/RegisterForm";
import SubmitMissingDocument from "../../features/submitDocument/SubmitMissingDocument";
import DocumentDetail from "../../features/missingDocument/DocumentDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <Home /> },
      { path: "documents", element: <MissingDocuments /> },
      { path: "documents/:id", element: <DocumentDetail /> },
      { path: "submit-document", element: <SubmitMissingDocument /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <AboutPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
    ],
  },
]);
