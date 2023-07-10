import {atom} from "recoil";

export const receiptAtom = atom({
  key: 'receiptList',
  default: []
})


export const newReceiptAtom = atom({
  key: 'newReceiptAtom',
  default: []
})
