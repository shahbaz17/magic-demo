import FadeIn from "react-fade-in";

const SocialLogins = ({ onSubmit }) => {
  const providers = ["google", "facebook", "github"];

  return (
    <>
      <FadeIn>
        {providers.map((provider) => {
          return (
            <button
              type="submit"
              className="social-btn"
              onClick={() => onSubmit(provider)}
              key={provider}
              style={{
                backgroundImage: `url(${provider}.png)`,
                backgroundSize: "19px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "23% 50%",
                paddingLeft: "35px",
              }}
            >
              {provider}
            </button>
          );
        })}
      </FadeIn>

      <style jsx>{`
        .social-btn {
          border-radius: 50px;
          padding: 8px 10px;
          width: 80%;
          margin-bottom: 20px;
          font-size: 14px;
          border: 1px solid #ccc;
          text-transform: capitalize;
          cursor: pointer;
          outline: none;
          transition: 0.3s;
          background-color: #fff;
        }

        .social-btn:hover {
          border: 1px solid #888;
        }
      `}</style>
    </>
  );
};

export default SocialLogins;
