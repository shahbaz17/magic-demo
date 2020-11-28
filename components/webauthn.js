const Webauthn = ({ onSubmit }) => {
  return (
    <>
      <button
        type="submit"
        className="webauthn-btn"
        onClick={() => onSubmit()}
        style={{
          backgroundImage: "url(webauthn.png)",
          backgroundSize: "19px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "8% 50%",
          paddingLeft: "30px",
        }}
      >
        Webauthn
      </button>
      <style jsx>{`
        .webauthn-btn {
          padding: 0.5rem 1rem;
          cursor: pointer;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 30%;
        }
        .webauthn-btn > button:hover {
          border-color: #888;
        }
      `}</style>
    </>
  );
};

export default Webauthn;
