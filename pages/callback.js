import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

const Callback = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  const [magic, setMagic] = useState(null);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

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
      // console.log(await magic.oauth.getRedirectResult());
      // send didToken and email to server to finish authentication
      const res = await authenticateWithServer(idToken, email);

      res.status === 200 && Router.push("/");
    } catch (error) {
      if (error === "TypeError: Cannot read property 'verifer' of null") {
        alert("cannot read proprty 'verifier' of null - attempting to retry");
        finishSocialLogin();
      }
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg("Error logging in. Please try again.");
    }
  };

  const finishEmailRedirectLogin = async () => {
    if (router.query.magic_credential) {
      try {
        let didToken = await magic.auth.loginWithCredential();
        let { email } = await magic.user.getMetadata();
        let res = await authenticateWithServer(didToken, email);
        res.status === 200 && Router.push("/");
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
      {!errorMsg ? <div>Authenticating...</div> : <div className="error">{errorMsg}</div>}
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
      `}</style>
    </Layout>
  );
};

export default Callback;
