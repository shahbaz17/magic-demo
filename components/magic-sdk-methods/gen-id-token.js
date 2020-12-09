import ReactTooltip from 'react-tooltip';

const GetIdToken = ({ magic, setData, setMethodCalled }) => {
  const generateIdToken = async () => {
    setMethodCalled('`generateIdToken`');
    setData('fetching...');
    try {
      const did = await magic.user.generateIdToken({ attachment: 'something' });
      setData(did);
    } catch (error) {
      setData('failed to fetch idToken');
    }
  };

  return (
    <>
      <button className='mono sdk-method-btn' onClick={() => generateIdToken()}>
        generateIdToken(&#123; attachment: 'something' &#125;)
      </button>
      <img
        height='15px'
        data-tip
        data-for='gen-idtoken-desc'
        src='/information-black.png'
        style={{ marginLeft: '8px' }}
      />
      <ReactTooltip id='gen-idtoken-desc' type='dark' effect='solid' place='bottom'>
        <div style={{ maxWidth: '400px' }}>
          <p>Parameters (Optional)</p>
          <div>
            An object with an <span className='mono'>`attachment`: `String`</span> and/or{' '}
            <span className='mono'>`lifespan`: `Number`</span> key-value pairs.
          </div>
          <br />
          <p>Returns</p>
          <div>
            A <span className='mono'>`DID token`</span>, which is the base64-encoded string of a
            JSON tuple representing <span className='mono'>`[proof, claim]`</span>.
          </div>
        </div>
      </ReactTooltip>

      <style jsx>{`
        .sdk-method-btn {
          background-color: #fff;
          padding: 8px 10px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          margin-top: 20px;
          border: 1px solid #ccc;
        }
        .sdk-method-btn:hover {
          border: 1px solid #888;
        }
        .mono {
          font-family: monospace !important;
        }
        p {
          font-size: 14px;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default GetIdToken;
