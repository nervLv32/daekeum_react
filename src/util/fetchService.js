import axios from "axios";

const fetchService = (path, method, param) => {
  const API_URL = process.env.REACT_APP_API_URL;
  return new Promise(async (resolve, reject) => {
    axios(
      API_URL + path, {
        method: method,
        data: param,
        validateStatus: false
      })
      .then(res => resolve(res.data))
      .catch(error => reject(error))
  })
}

export default fetchService
