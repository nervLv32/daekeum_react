import {atom} from "recoil";
import moment from 'moment'

export const receiptAtom = atom({
  key: 'receiptList',
  default: []
})


export const newReceiptAtom = atom({
  key: 'newReceiptAtom',
  default: {
    날짜: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
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

