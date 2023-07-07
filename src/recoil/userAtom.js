import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist(); // ✔


const userAtom = atom({
  key: 'userAtom',
  default: {
    isLogin : false,
    auth:{}
  },
  effects_UNSTABLE: [persistAtom]
})
export default userAtom
