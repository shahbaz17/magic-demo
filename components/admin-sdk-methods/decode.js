import ReactTooltip from 'react-tooltip';

const Decode = ({ didToken, setErrorMsg, setAdminData, setAdminMethodCalled }) => {
  const decode = async () => {
    setAdminMethodCalled('`decode`');
    if (!didToken) return setErrorMsg(true);
    setAdminData('decoding...');
    const res = await fetch('/api/decode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });
    let data = await res.json();
    data.proof ? setAdminData(data) : setAdminData('invalid token');
  };

  return (
    <>
      <button className='sdk-method-btn' onClick={() => decode()}>
        decode(did)
      </button>
      {/* <img
        height='15px'
        data-tip
        data-for='decoded-did'
        src='/information-black.png'
        style={{ marginLeft: '8px' }}
      />
      <ReactTooltip id='decoded-did' type='dark' effect='solid' place='right'>
        <div>
          <code className='mono'>proof</code>: the signature created signing the claim with your
          private key
        </div>
        <div>
          <code className='mono'>claim</code>: JSON object containing statements about the user and the authentication event.
        </div>
        <div>
          <code className='mono'>iat</code>: issued at timestamp (UTC)
        </div>
        <div>
          <code className='mono'>ext</code>: expiration timestamp (UTC)
        </div>
        <div>
          <code className='mono'>nbf</code>: not valid before timestamp (UTC)
        </div>
        <div>
          <code className='mono'>iss</code>: issuer (this is your unique identifier, your
          did-encoded public address)
        </div>
        <div>
          <code className='mono'>sub</code>: subject (populated with your Magic ID)
        </div>
        <div>
          <code className='mono'>aud</code>: project space (the applications Magic ID)
        </div>
        <div>
          <code className='mono'>add</code>: an encrypted signature of arbitrary, serialized data
          (use case is up to the developer, and use-case dependent)
        </div>
        <div>
          <code className='mono'>tid</code>: unique token identifier
        </div>
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
          font-family: monospace !important;
        }
        .sdk-method-btn:hover {
          border: 1px solid #888;
        }
      `}</style>
    </>
  );
};

export default Decode;
