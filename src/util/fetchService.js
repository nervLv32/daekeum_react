import axios from "axios";

const fetchService = (path, method, param) => {
  const API_URL = process.env.REACT_APP_API_URL;
  //const API_URL = 'http://localhost:8001/api';
  console.log(API_URL)
  return new Promise(async (resolve, reject) => {
    axios(
      API_URL + path, {
        method: method,
        ...(method.toLowerCase() === "post" ? { data: param } : { params: param }),
        validateStatus: false
      })
      .then(res => resolve(res.data))
      .catch(error => reject(error))
  })
}

export default fetchService
