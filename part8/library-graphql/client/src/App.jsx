import { Navigate, Route, Routes } from "react-router";

import Authors from "./components/Authors";
import Books from "./components/Books";
import BooksRecommended from "./components/BooksRecommended";
import AddBookForm from "./components/AddBookForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";

import { useUser } from "./contexts/UserContext";

const App = () => {
  const { user } = useUser();

  return (
    <>
      <NavBar />
      <Notification />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginForm />}
        />
        <Route path="/authors" element={<Authors />} />
        <Route
          path="/addbook"
          element={user ? <AddBookForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/recommended"
          element={user ? <BooksRecommended /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
