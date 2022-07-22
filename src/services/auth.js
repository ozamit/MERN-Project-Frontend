import axios from "axios";
import { localhost } from "../utils/localHost";

export async function auth() {
  const userAuth = await JSON.parse(localStorage.getItem("user"));
  console.log("userAuth", userAuth);
  if (userAuth === null) {
  } else {
    try {
      const res = await axios.get(`${localhost}/user/getUserById/${userAuth}`);
      const newUser = res.data.message;
      console.log(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }
}
