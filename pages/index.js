import Layout from '../components/layout';
import Router from 'next/router';

const Home = () => {
  return (
    <Layout>
      <>
        <h2 style={{ margin: '0 0 40px 0' }}>What is Magic?</h2>
        <div>
          Magic is a developer SDK that you can integrate into your application to enable
          passwordless authentication using magic links - similar to Slack and Medium.
        </div>
        <div>When users want to sign up or log in to your application:</div>
        <ul>
          <li>User requests a magic link sent to their email address</li>
          <li>User clicks on that magic link</li>
          <li>User is securely logged into the application</li>
        </ul>
        <div>Or</div>
        <ul>
          <li>One-click sign on through a social provider</li>
        </ul>
        <h2 style={{ margin: '60px 0 40px 0' }}>How does it work?</h2>
        <div className='how-magic-works'>
          <img
            src='/how-magic-works.png'
            width='100%'
            onClick={() => Router.push('/how-magic-works.png')}
          />
          <div>For an in-depth reading of how Magic works, check out our whitepaper.</div>
        </div>
        <h2 style={{ margin: '60px 0 40px 0' }}>Auth flow with your app</h2>
        <div className='app-login-flow'>
          <img
            src='/app-login-flow.png'
            width='100%'
            onClick={() => Router.push('/app-login-flow.png')}
          />
        </div>
      </>
      <style jsx>{`
        .how-magic-works {
          height: 50vh;
        }
        .how-magic-works img {
          cursor: zoom-in;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
