import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import { Magic } from 'magic-sdk';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import GetIdToken from '../components/magic-sdk-methods/get-id-token';
import GenIdToken from '../components/magic-sdk-methods/gen-id-token';
import GetMetadata from '../components/magic-sdk-methods/get-metadata';
import Validate from '../components/admin-sdk-methods/validate';
import Decode from '../components/admin-sdk-methods/decode';
import GetIssuer from '../components/admin-sdk-methods/get-issuer-by-token';
import GetMetadataByToken from '../components/admin-sdk-methods/get-metadata-by-token';

const SdkNew = () => {
  const user = useUser();
  const [magic, setMagic] = useState();
  const [data, setData] = useState('null');
  const [methodCalled, setMethodCalled] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [adminMethodCalled, setAdminMethodCalled] = useState('');
  const [didToken, setDidToken] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => !magic && setMagic(new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)), [
    magic,
  ]);

  return (
    <Layout>
      {user ? (
        <>
          <h2 style={{ marginTop: 0 }}>Magic-sdk</h2>
          <div className='sub-header-desc'>
            Below are a few client-side sdk methods that you can use after a user logs in.
          </div>
          <>
            <GetIdToken magic={magic} setData={setData} setMethodCalled={setMethodCalled} />
            <br />
            <GenIdToken magic={magic} setData={setData} setMethodCalled={setMethodCalled} />
            <br />
            <GetMetadata magic={magic} setData={setData} setMethodCalled={setMethodCalled} />
            <br />
            <p>
              Return value for: {methodCalled}
              <span style={{ float: 'right' }}>
                <img
                  src='/copy.png'
                  height='15px'
                  data-tip
                  data-for='copy'
                  onClick={() => copy()}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                />
              </span>
              <ReactTooltip id='copy' type='dark' effect='solid' place='bottom'>
                <div style={{ width: '60px', textAlign: 'center' }}>
                  {copied ? 'Copied!' : 'Copy DID'}
                </div>
              </ReactTooltip>
            </p>
            <pre className='code-snippet'>
              <code className='mono'>{data.email ? JSON.stringify(data, null, 2) : data}</code>
            </pre>
          </>
          <div>
            <h2 className='sub-header'>Admin-sdk</h2>
            <div className='sub-header-desc'>
              Below are a few client-side sdk methods that you can use while a user is logged in.
            </div>
            <input
              type='text'
              className={`input ${errorMsg && 'error'}`}
              value={didToken}
              placeholder='Enter your DID token, then run any of the functions below'
              onChange={(e) => {
                setDidToken(e.target.value);
                setErrorMsg(false);
              }}
            />
            <Validate
              didToken={didToken}
              setErrorMsg={setErrorMsg}
              setAdminData={setAdminData}
              setAdminMethodCalled={setAdminMethodCalled}
            />
            <br />
            <Decode
              didToken={didToken}
              setErrorMsg={setErrorMsg}
              setAdminData={setAdminData}
              setAdminMethodCalled={setAdminMethodCalled}
            />
            <br />
            <GetIssuer
              didToken={didToken}
              setErrorMsg={setErrorMsg}
              setAdminData={setAdminData}
              setAdminMethodCalled={setAdminMethodCalled}
            />
            <br />
            <GetMetadataByToken
              didToken={didToken}
              setErrorMsg={setErrorMsg}
              setAdminData={setAdminData}
              setAdminMethodCalled={setAdminMethodCalled}
            />
            <p>Return value for: {adminMethodCalled}</p>
            <pre className='code-snippet'>
              <code className='mono'>
                {typeof adminData === 'string' ? adminData : JSON.stringify(adminData, null, 2)}
              </code>
            </pre>
          </div>
        </>
      ) : (
        <div>Log in to continue</div>
      )}
      <style jsx>{`
        .sub-header {
          margin-top: 60px;
        }
        .sub-header-desc {
          margin-bottom: 20px;
        }
        .input {
          padding: 10px 10px 10px 20px;
          border: 1px solid #ccc;
          border-radius: 50px;
          outline: none;
          transition: 0.5s;
          display: block;
          width: 100%;
          margin: 35px 0 25px 0;
        }
        .input:focus {
          border: 1px solid #888;
        }
        .error {
          border: 1px solid red;
        }

        .code-snippet {
          padding: 12px 15px;
          background: #efefef;
          overflow: auto;
          border: 1px solid #ccc;
          color: #77838f;
          border-radius: 6px;
        }
        .mono {
          font-family: monospace !important;
        }
      `}</style>
    </Layout>
  );
};

export default SdkNew;
