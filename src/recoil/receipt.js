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

export const newReceiptParamAtom = atom({
  key: 'newReceiptParamAtom',
  default: {
    searchword: '',
    pageSize: '10',
    currentPage: '1',
    year: '',
    month: '',
    dtFrom: '',
    dtTo:'',
    지역: '',
    처리상태: '',
  }
})

