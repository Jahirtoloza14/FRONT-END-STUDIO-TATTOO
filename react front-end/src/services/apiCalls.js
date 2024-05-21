import axios from "axios";
import { getUserData } from "../pages/userSlice";


const API_URL = "http://localhost:3000/api/";


export const registerNewUserCall = async (getUserData) => {

  const res = await axios.post(`${API_URL}users/register`, getUserData);

  return res;

};

export const loginCall = async (credentials) => {

  console.log(credentials);
  const res = await axios.post(`${API_URL}users/login`, credentials);

  console.log(res, "Login");
  return res;

};


export const bringProfile = async (token) => {
  const config ={
    headers: {
        Authorization: `Bearer ${token}`
    }
}


const res =  await axios.get(`${API_URL}users/profile`, config);

return res
};


export const bringProfiles = async (token) => {
  const config = {
    headers: {
      Autorization: `Bearer ${token}`
    }
  }
  const res = await axios.get(`${API_URL}users/getall`, config);
  return res.data;
}



export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Autorization: `Bearer ${token}`
    }
  }

  const res = await axios.put(`${API_URL}users/profile/update`, data, config)

}


export const bringAllCharacters = async () => {
  const res = await axios.get("http://localhost:3000/api")
  return res.data.results
}


// .get("url", headers(opcional))
// .post("url", body, headers)
// .put("url",body, headers)
// .delete("url",body, headers)