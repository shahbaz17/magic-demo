import ReactTooltip from 'react-tooltip';

const GetMetadata = ({ magic, setData, setMethodCalled }) => {
  const getMetadata = async () => {
    setMethodCalled('`getMetadata`');
    setData('fetching...');
    try {
      const user = await magic.user.getMetadata();
      setData(user);
    } catch (error) {
      setData('failed to fetch idToken');
    }
  };

  return (
    <>
      <button className='mono sdk-method-btn' onClick={() => getMetadata()}>
        getMetadata()
      </button>
      <img
        height='15px'
        data-tip
        data-for='user-metadata-desc'
        src='/information-black.png'
        style={{ marginLeft: '8px' }}
      />
      <ReactTooltip id='user-metadata-desc' type='dark' effect='solid' place='bottom'>
        <div style={{ maxWidth: '400px' }}>
          <p>Parameters</p>
          <div>None</div>
          <br />
          <p>Returns</p>
          <div>
            An object containing the <span className='mono'>`publicAddress`</span> (unique ID),{' '}
            <span className='mono'>`issuer`</span> (did-encoded public address), and{' '}
            <span className='mono'>`email`</span>.
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

export default GetMetadata;
