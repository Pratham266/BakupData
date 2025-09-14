import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const redirectToGoogle = () => {
    //STEP 1

    // the client id from GCP
    const client_id =
      "23101209765-pduabrc715can7ena7707mee32dajn2s.apps.googleusercontent.com";

    // // create a CSRF token and store it locally
    // const state = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    //   .map((b) => b.toString(16).padStart(2, "0"))
    //   .join("");

    // localStorage.setItem("latestCSRFToken", state);

    // redirect the user to Google  => in my case => http://localhost:5173/oauth2/callback
    const link = `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&response_type=code&access_type=offline&redirect_uri=${window.location.origin}/oauth2/callback&client_id=${client_id}`;
    window.location.assign(link);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={redirectToGoogle}>G Login</button>
        <p></p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
