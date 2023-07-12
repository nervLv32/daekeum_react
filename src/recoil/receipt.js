import {atom} from "recoil";

export const receiptAtom = atom({
  key: 'receiptList',
  default: []
})


export const newReceiptAtom = atom({
  key: 'newReceiptAtom',
  default: {
    날짜: new Date(),
    회사코드: 1000,
    접수내용: ''
  }
})


