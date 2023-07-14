import {atom} from 'recoil';

export const reportAtom = atom({
  key: 'reportAtom',
  default: []
})
export const reportParamAtom = atom({
  key: 'reportParamAtom',
  default: {
    searchword: '',
    currentPage: '1',
    pageSize: '10',
    작성자: '',
  }
})

export const firstExportDocument = atom({
  key: 'firstExportDocument',
  default: {
    client: {
      업체명: '업체명',
      거래처코드: ''
    },
    site: {
      현장명: '현장명',
      현장코드: ''
    },
    equip : {
      장비정보 : '장비정보',
    },
  }
})
