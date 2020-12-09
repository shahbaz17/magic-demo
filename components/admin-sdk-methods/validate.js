import ReactTooltip from 'react-tooltip';

const Validate = ({ didToken, setErrorMsg, setAdminData, setAdminMethodCalled }) => {
  const validate = async () => {
    setAdminMethodCalled('`validate`');
    if (!didToken) return setErrorMsg(true);
    setAdminData('validating...');
    const res = await fetch('/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });
    let data = await res.json();
    data.isValid ? setAdminData('true') : setAdminData('invalid token');
  };

  return (
    <>
      <button className='mono sdk-method-btn' onClick={() => validate()}>
        validate(did)
      </button>
      {/*  <img
        height='15px'
        data-tip
        data-for='validate'
        src='/information-black.png'
        style={{ marginLeft: '8px' }}
      />

      <ReactTooltip id='validate' type='dark' effect='solid' place='bottom'>
        <div>Ensures the DID token was signed by the owner of the private key of the issuer.</div>
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

export default Validate;
