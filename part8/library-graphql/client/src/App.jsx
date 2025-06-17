import { Link, Route, Routes } from "react-router";
import Authors from "./components/Authors";
import Books from "./components/Books";
import AddBookForm from "./components/AddBookForm";

const App = () => {
  const navBarStyle = { padding: 5 };
  return (
    <>
      <div>
        <Link style={navBarStyle} to="/authors">
          authors
        </Link>
        <Link style={navBarStyle} to="/">
          books
        </Link>
        <Link style={navBarStyle} to="/addbook">
          add book
        </Link>
      </div>
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/" element={<Books />} />
        <Route path="/addbook" element={<AddBookForm />} />
      </Routes>
    </>
  );
};

export default App;
