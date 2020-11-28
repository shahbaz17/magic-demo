import { useState, useEffect } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

const Callback = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  const [magic, setMagic] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("here");
    !magic &&
      setMagic(
        new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
          extensions: [new OAuthExtension()],
        })
      );
    /* without this if statement, the code will run, and since magic will be undefined for a second on-load, it will log an error */
    if (magic) {
      (async function () {
        try {
          /* user data returned from oauth provider */
          let result = await magic.oauth.getRedirectResult();
          let didToken = result.magic.idToken;
          const res = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + didToken,
            },
            body: JSON.stringify(result.magic.userMetadata.email),
          });
          if (res.status === 200) {
            Router.push("/");
          }
        } catch (error) {
          console.log(error);
          Router.push("/login");
        }
      })();
    }
  }, [magic]);

  return (
    <Layout>
      <div>Authenticating...</div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

export default Callback;
