import {atom} from "recoil";

export const regisAtom = atom({
  key: 'regisAtom',
  default: []
})
export const regisParamAtom = atom({
  key: 'regisParamAtom',
  default: {
    searchword: '',
    pageSize: 10,
    currentPage: 1
  }
})

export const selectCompanyAtom = atom({
  key: 'selectCompanyAtom',
  default: {
    client: {
      name: '',
      code : ''
    },
    site: {
      name: '',
      code: ''
    },
    equipment: {
      name: '',
      code: ''
    }
  }
})
