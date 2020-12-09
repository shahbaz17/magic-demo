import ReactTooltip from 'react-tooltip';

const GetMetadataByToken = ({ didToken, setErrorMsg, setAdminData, setAdminMethodCalled }) => {
  const getMetadata = async () => {
    setAdminMethodCalled('`getMetadataByToken`');
    if (!didToken) return setErrorMsg(true);
    setAdminData('fetching...');
    const res = await fetch('/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });
    let data = await res.json();
    data.metadata ? setAdminData(data.metadata) : setAdminData('invalid token');
  };

  return (
    <>
      <button className='mono sdk-method-btn' onClick={() => getMetadata()}>
        getMetadata(did)
      </button>
      {/* <img
        height='15px'
        data-tip
        data-for='get-metadata'
        src='/information-black.png'
        style={{ marginLeft: '8px' }}
      />
      <ReactTooltip id='get-metadata' type='dark' effect='solid' place='bottom'>
        <div>Returns metadata of passed-in DID token.</div>
      </ReactTooltip> */}

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
      `}</style>
    </>
  );
};

export default GetMetadataByToken;
