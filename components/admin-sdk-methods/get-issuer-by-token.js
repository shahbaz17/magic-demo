import ReactTooltip from 'react-tooltip';

const GetIssuer = ({ didToken, setErrorMsg, setAdminData, setAdminMethodCalled }) => {
  const getIssuer = async () => {
    setAdminMethodCalled('`getIssuer`');
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
    data.issuer ? setAdminData(data.issuer) : setAdminData('invalid token');
  };

  return (
    <>
      <button className='mono sdk-method-btn' onClick={() => getIssuer()}>
        getIssuer(did)
      </button>
      {/* <img
        height='15px'
        data-tip
        data-for='get-issuer'
        src='/information-black.png'
        style={{ marginLeft: '8px' }}
      />
      <ReactTooltip id='get-issuer' type='dark' effect='solid' place='bottom'>
        <div>Returns issuer of passed-in DID token.</div>
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

export default GetIssuer;
