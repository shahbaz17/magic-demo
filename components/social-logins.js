const SocialLogins = ({ onSubmit }) => {
  const providers = ["google", "apple", "facebook", "github"];

  return (
    <>
      <div className="social-btn-container">
        {providers.map((provider) => {
          return (
            <button
              type="submit"
              className="social-btn"
              onClick={() => onSubmit(provider)}
              src={`/${provider}.png`}
              key={provider}
              style={{
                backgroundImage: `url(${provider}.png)`,
                backgroundSize: "18px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "23% 50%",
                paddingLeft: "35px",
              }}
            >
              {provider}
            </button>
          );
        })}
      </div>
      <style jsx>{`
        .social-btn-container {
          text-align: center;
        }

        .social-btn {
          border-radius: 4px;
          padding: 8px 10px;
          width: 80%;
          margin-bottom: 20px;
          font-size: 14px;
          border: 1px solid #ccc;
          text-transform: capitalize;
          cursor: pointer;
        }

        .social-btn:hover {
          border: 1px solid #000;
        }
      `}</style>
    </>
  );
};

export default SocialLogins;
