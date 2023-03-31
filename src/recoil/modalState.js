import { atom } from "recoil";

const modalState = atom({
  key: "modalState",
  default: {
    isOpen: false,
    title: "",
    content: ""
  }
});

export default modalState;
