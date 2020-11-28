import { useUser } from "../lib/hooks";
import Layout from "../components/layout";

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <h1>Home</h1>

      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
