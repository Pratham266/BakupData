import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function GooglePage() {
  const [userData, setUserData] = useState(null);

  const setCodeToBackend = async (code) => {
    const res = await axios.post("http://localhost:8000/auth/oauth-token", {
      code,
    });
    console.log({ res });
    if (res && res.data && res.status === 200) {
      console.log("HERERERER", {
        name: res.data.data.name,
        email: res.data.data.email,
        img: res.data.data.picture,
      });
      setUserData({
        name: res.data.data.name,
        email: res.data.data.email,
        img: res.data.data.picture,
      });
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    console.log({ code });
    setCodeToBackend(code);
  }, []);

  console.log({ userData });
  if (!userData) {
    return (
      <>
        <h3>Loading....</h3>
      </>
    );
  }
  return (
    <>
      <img
        src={
          "https://lh3.googleusercontent.com/a/ACg8ocJ4n2d-hOPR1TXA79LXQDiGNaF016Evt4rOFqxjEdCikoivrk7t=s96-c"
        }
        alt="Profile GIF"
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain", // Ensures the entire GIF is visible
          borderRadius: "50%", // Makes the image circular if desired
        }}
      />
      <h3>Hii, {userData.name}👋</h3>
      <h2>📧 {userData.email}</h2>
    </>
  );
}

export default GooglePage;
