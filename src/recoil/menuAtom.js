import {atom} from "recoil";

const menuAtom = atom({
  key: 'menuAtom',
  default: {
    isOpen : false
  }
})

export default menuAtom
