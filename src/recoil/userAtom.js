import {atom} from "recoil";

const userAtom = atom({
  key: 'userAtom',
  default: {
    userEmail: '',
    userName: '',
    userJob: '',
    profileImage : '',
  }
})
export default userAtom
