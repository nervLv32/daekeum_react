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
  default: []
})
