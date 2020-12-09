import FadeIn from 'react-fade-in';
import { devMode } from '../lib/hooks';
import ReactTooltip from 'react-tooltip';

const SocialLogins = ({ onSubmit }) => {
  const devModeEnabled = devMode();
  const providers = ['google', 'facebook', 'github'];
  const loginWithSocialToolTip = (provider) =>
    `await magic.oauth.loginWithRedirect({ provider: "${provider}",  redirectURI: "https://magic-demo.vercel.app/callback" });`;

  return (
    <>
      <FadeIn>
        {providers.map((provider) => {
          return (
            <div key={provider}>
              <button
                type='submit'
                className='social-btn'
                onClick={() => onSubmit(provider)}
                key={provider}
                style={{
                  backgroundImage: `url(${provider}.png)`,
                  backgroundSize: '19px',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '23% 50%',
                  paddingLeft: '35px',
                }}
              >
                {/* turns "google" to "Google" */}
                {provider.replace(/^\w/, (c) => c.toUpperCase())}
                {devModeEnabled === 'true' && (
                  <span style={{ textAlign: 'left' }}>
                    <img
                      height='14px'
                      data-tip
                      data-for={`${provider}-login-btn`}
                      src='/information.png'
                      style={{ marginLeft: '10px' }}
                    />
                    <ReactTooltip
                      id={`${provider}-login-btn`}
                      type='dark'
                      effect='solid'
                      place='bottom'
                    >
                      <div>
                        Log the user in with {provider}, then redirect to{' '}
                        <span className='mono'>`/callback`</span> where we complete the login.
                      </div>
                      <br />
                      <img height='90px' src='/social-login.png' />
                    </ReactTooltip>
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </FadeIn>

      <style jsx>{`
        .social-btn {
          border-radius: 50px;
          padding: 8px 10px;
          width: 80%;
          margin-bottom: 20px;
          font-size: 14px;
          border: 1px solid #ccc;
          cursor: pointer;
          outline: none;
          transition: 0.3s;
          background-color: #fff;
        }
        .social-btn:hover {
          border: 1px solid #888;
        }
        .mono {
          font-family: monospace !important;
        }
      `}</style>
    </>
  );
};

export default SocialLogins;
