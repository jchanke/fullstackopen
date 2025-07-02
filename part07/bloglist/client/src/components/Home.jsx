import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";

const Home = () => {
  return (
    <>
      <Togglable buttonLabel="create new">
        {(props) => <BlogForm {...props} />}
      </Togglable>
      <BlogList />
    </>
  );
};

export default Home;
