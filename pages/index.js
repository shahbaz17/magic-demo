import { useUser } from "../lib/hooks";
import Layout from "../components/layout";

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <h1>Home</h1>

      {user ? (
        <>
          <p>Currently logged in as: {user.email}</p>
        </>
      ) : (
        <div>Log in to continue</div>
      )}
    </Layout>
  );
};

export default Home;
