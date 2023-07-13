import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist(); // ✔

const journalAtom = atom({
  key: 'journal',
  default: {},
  effects_UNSTABLE: [persistAtom]
})

export default journalAtom
