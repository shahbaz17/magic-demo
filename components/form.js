const mailURL =
  "https://www.pinclipart.com/picdir/big/52-525907_white-email-symbol-transparent-clipart-email-address-mail.png";

const Form = ({ errorMessage, onSubmit }) => (
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
            backgroundPosition: "2% 50%",
            paddingLeft: "35px",
          }}
        />
      </label>

      <div className="submit">
        <button type="submit">Send Magic Link</button>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
    <div className="or-login-with">Or login with</div>
    {/* Social Login Form */}
    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
        text-align: center;
      }
      input {
        padding: 8px;
        margin: 0.3rem 0 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
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
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
      }
      .submit > button:hover {
        border-color: #888;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
      .or-login-with {
        margin-top: 25px;
        margin-bottom: 30px;
        font-size: 12px;
        color: gray;
        text-align: center;
      }
    `}</style>
  </>
);

export default Form;
