import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { devMode } from "../lib/hooks";
import ReactTooltip from "react-tooltip";

const Callback = () => {
  const [magic, setMagic] = useState(null);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [showNextStep, setShowNextStep] = useState(false);
  const devModeEnabled = devMode();

  useEffect(() => {
    !magic &&
      setMagic(
        new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
          extensions: [new OAuthExtension()],
        })
      );

    // if "provider" is in query params, we know the user is logging in with social, otherwise handle it as email redirectURI
    magic && router.query.provider ? finishSocialLogin() : finishEmailRedirectLogin();
  }, [magic, router.query]);

  const finishSocialLogin = async () => {
    try {
      // grab didToken and email from redirectResult using object destructuring
      let {
        magic: { idToken },
        magic: {
          userMetadata: { email },
        },
      } = await magic.oauth.getRedirectResult();
      setShowNextStep(true);
      // send didToken and email to server to finish authentication
      const res = await authenticateWithServer(idToken, email);
      {
        devModeEnabled === "false" && res.status === 200 && Router.push("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Error logging in. Please try again.");
    }
  };

  const finishEmailRedirectLogin = async () => {
    if (router.query.magic_credential) {
      try {
        let didToken = await magic.auth.loginWithCredential();
        setShowNextStep(true);
        let { email } = await magic.user.getMetadata();
        let res = await authenticateWithServer(didToken, email);
        {
          devModeEnabled === "false" && res.status === 200 && Router.push("/");
        }
      } catch (error) {
        console.error("An unexpected error happened occurred:", error);
        setErrorMsg("Error logging in. Please try again.");
      }
    }
  };

  const authenticateWithServer = async (didToken, email) => {
    return await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
      body: JSON.stringify(email),
    });
  };

  return (
    <Layout>
      {!errorMsg ? (
        <div className="callback-container">
          <div style={{ margin: "25px 0" }}>
            Retrieving auth token...
            {devModeEnabled === "true" && (
              <>
                <img
                  height="14px"
                  data-tip
                  data-for="retrieving-auth-token"
                  src="/information.png"
                  style={{ marginLeft: "10px" }}
                />
                <ReactTooltip id="retrieving-auth-token" type="dark" effect="solid" place="bottom">
                  <div>Action: Grab didToken from query params</div>
                  <br />
                  <div>let didToken = await magic.auth.loginWithCredential();</div>
                </ReactTooltip>
              </>
            )}
          </div>
          {showNextStep && (
            <div style={{ margin: "25px 0" }}>
              Validating token...
              {devModeEnabled === "true" && (
                <>
                  <img
                    height="14px"
                    data-tip
                    data-for="validating-token"
                    src="/information.png"
                    style={{ marginLeft: "10px" }}
                  />
                  <ReactTooltip id="validating-token" type="dark" effect="solid" place="bottom">
                    <div>Action: Send didToken to server to validate</div>
                    <br />
                    <div>Client-side</div>
                    <div>let res = await authenticateWithServer(didToken, email);</div>
                    <br />
                    <div>Server-side</div>
                    <div>const didToken = req.headers.authorization.substr(7);</div>
                    <div>await magic.token.validate(didToken);</div>
                  </ReactTooltip>
                </>
              )}
              {devModeEnabled === "true" && (
                <div style={{ marginTop: "25px" }}>
                  You're logged in! Click <a href="/">here</a> to go home.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="error">{errorMsg}</div>
      )}

      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: red;
        }
        .callback-container {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default Callback;
