import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Layout from '../components/layout';
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import { devMode } from '../lib/hooks';
import ReactTooltip from 'react-tooltip';
import Link from 'next/link';

const Callback = () => {
  const [magic, setMagic] = useState(null);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [showNextStep, setShowNextStep] = useState(false);
  const [showLinkHome, setShowLinkHome] = useState(false);
  const devModeEnabled = devMode();

  useEffect(() => {
    !magic &&
      setMagic(
        new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
          extensions: [new OAuthExtension()],
        })
      );

    // if "provider" is in query params, we know the user is logging in with social, otherwise handle it as email redirectURI
    magic && router.query.provider ? finishSocialLogin() : finishEmailRedirectLogin();
  }, [magic, router.query]);

  const finishSocialLogin = async () => {
    try {
      // grab didToken and email from redirectResult using object destructuring

      let {
        magic: { idToken },
      } = await magic.oauth.getRedirectResult();

      setShowNextStep(true);
      // send didToken and email to server to finish authentication
      const res = await authenticateWithServer(idToken);
      {
        devModeEnabled === 'false' && res.status === 200 && Router.push('/');
      }
      res.status === 200 && setShowLinkHome(true);
    } catch (error) {
      console.error(error);
      setErrorMsg('Error logging in. Please try again.');
    }
  };

  const finishEmailRedirectLogin = async () => {
    if (router.query.magic_credential) {
      try {
        let didToken = await magic.auth.loginWithCredential();
        setShowNextStep(true);
        let res = await authenticateWithServer(didToken);
        {
          devModeEnabled === 'false'
            ? res.status === 200 && Router.push('/')
            : res.status === 200 && setShowLinkHome(true);
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error);
        setErrorMsg('Error logging in. Please try again.');
      }
    }
  };

  const authenticateWithServer = async (didToken) => {
    return await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });
  };

  return (
    <Layout>
      {!errorMsg ? (
        <div className='callback-container'>
          <div style={{ margin: '25px 0' }}>
            Retrieving auth token...
            {devModeEnabled === 'true' && (
              <span style={{ textAlign: 'left' }}>
                <img
                  height='14px'
                  data-tip
                  data-for='retrieving-auth-token'
                  src='/information.png'
                  style={{ marginLeft: '10px' }}
                />
                <ReactTooltip id='retrieving-auth-token' type='dark' effect='solid' place='bottom'>
                  <div>
                    Grab <span className='mono'>`didToken`</span> from query params.
                  </div>
                  <br />
                  <div>If handling the redirect from a magic link login</div>
                  <img
                    height='20px'
                    src='/grab-token-from-redirect.png'
                    style={{ marginBottom: '10px' }}
                  />
                  <br />
                  <div>If handling the redirect from a social login</div>
                  <img height='27px' src='/grab-token-from-social.png' />
                </ReactTooltip>
              </span>
            )}
          </div>
          {showNextStep && (
            <div style={{ margin: '25px 0' }}>
              Validating token...
              {devModeEnabled === 'true' && (
                <span style={{ textAlign: 'left' }}>
                  <img
                    height='14px'
                    data-tip
                    data-for='validating-token'
                    src='/information.png'
                    style={{ marginLeft: '10px' }}
                  />
                  <ReactTooltip
                    id='validating-token'
                    type='dark'
                    effect='solid'
                    place='bottom'
                    style={{ textAlign: 'left' }}
                  >
                    <div>
                      Validate <span className='mono'>`didToken`</span> with server, completing the
                      login.
                    </div>
                    <br />
                    <div>Client-side</div>
                    <img
                      style={{ marginBottom: '8px' }}
                      height='130px'
                      src='/finish-login-redirect.png'
                    />
                    <br />
                    <div>Server-side</div>
                    <img
                      height='120px'
                      data-tip
                      data-for='logout-btn'
                      src='/api-login-tooltip.png'
                    />
                  </ReactTooltip>
                </span>
              )}
              {showLinkHome && (
                <div style={{ marginTop: '25px', color: 'gray' }}>
                  You're logged in! Click <Link href='/'>here</Link> to go home.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='error'>{errorMsg}</div>
      )}

      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: red;
        }
        .callback-container {
          width: 100%;
          text-align: center;
        }
        .mono {
          font-family: monospace !important;
        }
      `}</style>
    </Layout>
  );
};

export default Callback;
