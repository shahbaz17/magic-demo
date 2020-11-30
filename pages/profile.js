import { useUser, devMode } from "../lib/hooks";
import Layout from "../components/layout";
import ReactTooltip from "react-tooltip";

const Profile = () => {
  const user = useUser({ redirectTo: "/login" }); // redirect user to /login if not logged in
  const devModeEnabled = devMode();

  return (
    <Layout>
      <h1>Profile</h1>
      {user && (
        <>
          <div>
            Your session:
            {devModeEnabled === "true" && (
              <>
                <img
                  height="14px"
                  data-tip
                  data-for="user-metadata"
                  src="/information.png"
                  style={{ marginLeft: "10px" }}
                />
                <ReactTooltip id="user-metadata" type="dark" effect="solid" place="bottom">
                  <div>Action: Grab user metadata</div>
                  <br />
                  <div>const user = await magic.user.getMetadata()</div>
                </ReactTooltip>
              </>
            )}
          </div>
          <pre style={{ overflow: "auto" }}>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
};

export default Profile;
