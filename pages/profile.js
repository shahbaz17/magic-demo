import { useUser, devMode } from '../lib/hooks';
import Layout from '../components/layout';
import ReactTooltip from 'react-tooltip';

const Profile = () => {
  const user = useUser({ redirectTo: '/login' }); // redirect user to /login if not logged in
  const devModeEnabled = devMode();

  return (
    <Layout>
      <h2 style={{ marginTop: 0 }}>
        Profile
        {devModeEnabled === 'true' && (
          <>
            <img
              height='14px'
              data-tip
              data-for='user-metadata'
              src='/information.png'
              style={{ marginLeft: '10px' }}
            />
            <ReactTooltip id='user-metadata' type='dark' effect='solid' place='bottom'>
              <div>Retrieves user data from Magic</div>
              <br />
              <img
                height='30px'
                src='/get-metadata.png'
                // style={{ marginLeft: '10px' }}
              />
            </ReactTooltip>
          </>
        )}
      </h2>
      {user && (
        <>
          <pre style={{ overflow: 'auto' }}>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
};

export default Profile;
