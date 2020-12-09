import Link from 'next/link';
import { useUser, devMode } from '../lib/hooks';
import ReactTooltip from 'react-tooltip';
import Router, { useRouter } from 'next/router';

const Header = () => {
  const user = useUser();
  const devModeEnabled = devMode();
  const router = useRouter();

  const handleToggle = () => {
    localStorage.setItem('devMode', localStorage.getItem('devMode') === 'true' ? false : true);
    let urlPath = router.pathname;
    Router.push(urlPath);
  };

  return (
    <header>
      <nav>
        <ul>
          <div data-tip='Toggle this to enable Developer Mode, <br /> which will show you Magic code snippets <br /> that power each action.'>
            DEVELOPER
            <label className='switch'>
              <input
                type='checkbox'
                defaultChecked={devModeEnabled === 'true' ? true : false}
                onClick={() => handleToggle()}
              />
              <span className='slider round'></span>
            </label>
          </div>
          <div className='nav-links-container'>
            <li>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link href='/profile'>
                    <a>Profile</a>
                  </Link>
                </li>
                <li>
                  <a href='/api/logout'>Logout</a>

                  {devModeEnabled === 'true' && (
                    <>
                      <img
                        height='14px'
                        data-tip
                        data-for='logout-btn'
                        src='/information.png'
                        style={{ marginLeft: '8px' }}
                      />
                      <ReactTooltip id='logout-btn' type='dark' effect='solid' place='bottom'>
                        <div>Logs user out of their session with Magic and this app's server</div>
                        <br />
                        <div>Client-side</div>
                        <img
                          style={{ marginBottom: '8px' }}
                          height='30px'
                          src='/client-logout.png'
                        />
                        <div>Server-side</div>
                        <img
                          height='100px'
                          data-tip
                          data-for='logout-btn'
                          src='/server-logout.png'
                        />
                      </ReactTooltip>
                    </>
                  )}
                </li>
              </>
            ) : (
              <li>
                <Link href='/login'>
                  <a>Login</a>
                </Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
      <ReactTooltip place='bottom' effect='solid' type='dark' multiline={true} />
      <style jsx>{`
        nav {
          max-width: 42rem;
          margin: 0 auto;
          margin-bottom: 50px;
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          justify-content: space-between;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        .nav-links-container {
          display: flex;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        header {
          color: #ccc;
          background-color: #333;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 38px;
          height: 23px;
          margin-left: 10px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #555;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
        .slider:before {
          position: absolute;
          content: '';
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
        input:checked + .slider {
          background-color: #999;
        }
        input:focus + .slider {
          box-shadow: 0 0 1px #999;
        }
        input:checked + .slider:before {
          -webkit-transform: translateX(14px);
          -ms-transform: translateX(14px);
          transform: translateX(14px);
        }
        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </header>
  );
};

export default Header;
