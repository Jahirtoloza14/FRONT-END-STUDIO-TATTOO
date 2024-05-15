import axios from "axios";


const API_URL = "http://localhost:3000/api/";
export const registerNewUserCall = async (credentials) => {

  const res = await axios.post(`${API_URL}users/register`, credentials);

  return res;
  
};

export const loginCall = async (credentials) => {

  
  const res = await axios.post(`users/login`, credentials);

 
  return res;
};
export const bringProfile = async (token) => {
  const config = {
    headers: {
      Autorization: `Bearer ${token}`
    }

  }

  const res = await axios.get(`${API_URL}api/users/:id`, config);

  return res.data;
}


export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Autorization: `Bearer ${token}`
    }
  }

  const res = await axios.put(`${API_URL}api/users/profile`, data, config)

}


export const bringAllCharacters = async () => {
  const res = await axios.get("http://localhost:3000/api")
  return res.data.results
}


// .get("url", headers(opcional))
// .post("url", body, headers)
// .put("url",body, headers)
// .delete("url",body, headers)