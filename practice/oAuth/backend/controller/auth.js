import axios from "axios";

//mongo fb code separate in one file
import { MongoClient } from "mongodb";
const mongoUrl = "mongodb://localhost:27017";
const dtabaseName = "GoogleAuth";

let mongoDB;

const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    mongoDB = client.db(dtabaseName);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

connectToMongoDB();

const refreshAccessToken = async (refresh_token) => {
  try {
    const res = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        client_id:
          "23101209765-pduabrc715can7ena7707mee32dajn2s.apps.googleusercontent.com",
        client_secret: "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",
        refresh_token, // The refresh token you stored earlier
        grant_type: "refresh_token", // Grant type for refreshing the token
      })
    );

    const access_token = res.data.access_token;
    const expires_in = res.data.expires_in;

    return { access_token, expires_in };
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
};

const getUserInfo = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

const codeTokenExchangeWithGoogleApi = async (code) => {
  const res = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id:
        "23101209765-pduabrc715can7ena7707mee32dajn2s.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: `http://localhost:5173/oauth2/callback`,
    })
  );

  const access_token = res.data.access_token; // used to access the Google API
  const refresh_token = res.data.refresh_token; // used to refresh the access token
  const expires_in = res.data.expires_in;
  const userData = await getUserInfo(access_token);
  return { ...userData, access_token, refresh_token, expires_in };
};

export const userAuth = async (ctx) => {
  const { code } = ctx.request.body;
  const userDetails = await codeTokenExchangeWithGoogleApi(code);
  try {
    const insertUser = await mongoDB.collection("user").insertOne(userDetails);
    ctx.status = 200;
    ctx.body = {
      message: "user added successfully",
      data: { ...insertUser, ...userDetails },
    };
  } catch (error) {
    console.log("error : ", error);
    ctx.status = 500;
    ctx.body = { message: "Failed to add user", error };
  }
};
