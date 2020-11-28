// import Webauthn from "../components/webauthn";

const Form = ({ errorMessage, onSubmit }) => {
  const mailURL =
    "https://www.pinclipart.com/picdir/big/52-525907_white-email-symbol-transparent-clipart-email-address-mail.png";

  // const handleLoginWithWebauthn = async () => {
  //   console.log("webauthn");
  // };

  return (
    <>
      {/* Magic link login form */}
      <form onSubmit={onSubmit}>
        <h3>Login</h3>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={{
              backgroundImage: `url(${mailURL})`,
              backgroundSize: "18px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "5% 50%",
              paddingLeft: "43px",
            }}
          />
        </label>

        <div className="submit">
          <button
            type="submit"
            style={{
              backgroundImage: "url(airplane.png)",
              backgroundSize: "21px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "28% 50%",
              paddingLeft: "35px",
            }}
          >
            Send Magic Link
          </button>
          {/* <Webauthn onSubmit={handleLoginWithWebauthn} /> */}
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
      {/* Social Login Form */}
      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        input {
          padding: 10px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 50px;
          outline: none;
          transition: 0.5s;
        }
        input:focus {
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
          width: 100%;
          outline: none;
          transition: 0.3s;
        }
        .submit > button:hover {
          border-color: #888;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </>
  );
};

export default Form;
