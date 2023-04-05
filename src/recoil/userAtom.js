import {atom} from "recoil";

const userAtom = atom({
  key: 'userAtom',
  default: {
    isLogin : false,
    auth:{
      userEmail: '',
      userName: '팜윤태',
      userJob: '',
      profileImage : '',
    }
  }
})
export default userAtom
