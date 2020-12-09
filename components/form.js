import { devMode } from '../lib/hooks';
import ReactTooltip from 'react-tooltip';

const Form = ({ errorMessage, onSubmit }) => {
  const devModeEnabled = devMode();

  const mailURL =
    'https://www.pinclipart.com/picdir/big/52-525907_white-email-symbol-transparent-clipart-email-address-mail.png';

  return (
    <>
      <form onSubmit={onSubmit}>
        <h3>Login</h3>
        <label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            className='email-input'
            style={{
              backgroundImage: `url(${mailURL})`,
              backgroundSize: '18px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '5% 50%',
              paddingLeft: '43px',
            }}
          />
        </label>

        <div className='submit'>
          <button
            type='submit'
            style={{
              backgroundImage: 'url(airplane.png)',
              backgroundSize: '21px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '18% 50%',
              paddingLeft: '35px',
            }}
          >
            Send Magic Link
            {devModeEnabled === 'true' && (
              <span style={{ textAlign: 'left' }}>
                <img
                  height='14px'
                  data-tip
                  data-for='magic-link-btn'
                  src='/information.png'
                  style={{ marginLeft: '10px' }}
                />
                <ReactTooltip id='magic-link-btn' type='dark' effect='solid' place='bottom'>
                  <div>
                    Send magic link to user and redirect them back to this site after email is
                    clicked. <br />
                    On the server, validate the <span className='mono'>`didToken`</span> then set a
                    cookie to handle session persistence.
                  </div>
                  <div style={{ marginTop: '15px' }}>Client-side</div>
                  <img height='220px' data-tip data-for='logout-btn' src='/magic-link-login.png' />
                  <div style={{ marginTop: '10px' }}>Server-side</div>
                  <img height='130px' data-tip data-for='logout-btn' src='/api-login-tooltip.png' />
                </ReactTooltip>
              </span>
            )}
          </button>
        </div>

        {errorMessage && <p className='error'>{errorMessage}</p>}
      </form>
      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .email-input {
          padding: 10px;
          margin: 1rem auto;
          border: 1px solid #ccc;
          border-radius: 50px;
          outline: none;
          transition: 0.5s;
          width: 80%;
        }
        .email-input:focus {
          border: 1px solid #888;
        }
        .submit {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          justify-content: space-between;
        }
        .submit > a {
          text-decoration: none;
        }
        .submit > button {
          padding: 0.6rem 1rem;
          cursor: pointer;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 50px;
          width: 80%;
          outline: none;
          transition: 0.3s;
          margin: 0 auto;
          font-size: 13px;
        }
        .submit > button:hover {
          border-color: #888;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
        .mono {
          font-family: monospace !important;
        }
      `}</style>
    </>
  );
};

export default Form;
