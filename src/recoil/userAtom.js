import {atom} from "recoil";

const userAtom = atom({
  key: 'userAtom',
  default: {
    isLogin : false,
    auth:{
      userEmail: '',
      userName: '',
      userJob: '',
      profileImage : '',
    }
  }
})
export default userAtom
