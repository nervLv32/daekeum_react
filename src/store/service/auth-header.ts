export default function auth() {
  const getAuth = () => {
    const initialValue : string | null = null

    try {
      const item = window.localStorage.getItem('persist:root')
      console.log(item ? JSON.parse(item) : initialValue)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  }

  const auth = JSON.parse(getAuth().auth)

  if (auth.user && auth.user.token.jwt) {
    /***********
    for Spring Boot
    return {
     Authorization: 'Bearer ' + user.token.jwt
    }
    ***********/

    /***********
    for Node.js Express
    ***********/
    return {
      'authorization': auth.user.token.jwt
    }
  }
  else {
    return null
  }
}
