import ReactTooltip from 'react-tooltip';

const GetIdToken = ({ magic, setData, setMethodCalled }) => {
  const getIdToken = async () => {
    setMethodCalled('`getIdToken`');
    setData('fetching...');
    try {
      const did = await magic.user.getIdToken({ lifespan: 604800 });
      setData(did);
    } catch (error) {
      setData('failed to fetch idToken');
    }
  };

  return (
    <>
      <button className='mono sdk-method-btn' onClick={() => getIdToken()}>
        getIdToken(&#123; lifespan: 604800 &#125;)
      </button>
      <img
        height='15px'
        data-tip
        data-for='get-idtoken-desc'
        src='/information-black.png'
        style={{ marginLeft: '8px' }}
      />
      <ReactTooltip id='get-idtoken-desc' type='dark' effect='solid' place='bottom'>
        <div style={{ maxWidth: '400px' }}>
          <p>Parameters (Optional)</p>
          <div>
            An object with a <span className='mono'>`lifespan`: `Number`</span> key-value pair,
            setting the expiration of the generated token. Default is 15 mins.
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
