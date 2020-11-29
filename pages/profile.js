import { useUser } from "../lib/hooks";
import Layout from "../components/layout";

const Profile = () => {
  const user = useUser({ redirectTo: "/login" }); // redirect user to /login if not logged in
  return (
    <Layout>
      <h1>Profile</h1>
      {user && (
        <>
          <p>Your session:</p>
          <pre style={{ overflow: "auto" }}>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
};

export default Profile;
