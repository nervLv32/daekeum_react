import {atom} from 'recoil'

export const salesStateAtom = atom({
  key: 'salesStateAtom',
  default: {company: 0, site: 0, visit: 0},
})

export const newSaleAtom = atom({
  key: 'newSaleAtom',
  default: {
    날짜: new Date(),
    회사코드: 1000,
    접수내용: '',
  },
})

export const companyAtom = atom({
  key: 'companyAtom',
  default: {거래처코드: '', 업체명: ''},
})
export const companyListAtom = atom({
  key: 'companyListAtom',
  default: [],
})

export const companyDetailAtom = atom({
  key: 'companyDetailAtom',
  default: {},
})
export const siteAtom = atom({
  key: 'siteAtom',
  default: {현장코드: '', 현장명: ''},
})

export const siteListAtom = atom({
  key: 'siteListAtom',
  default: [],
})

export const siteDetailAtom = atom({
  key: 'siteDetailAtom',
  default: {
    현장명: null,
    담당자: null,
    직위: null,
    휴대폰: null,
    이메일: null,
    전화번호: null,
    팩스번호: null,
    주소: null,
    종료예정일: null,
    설치예정일: null,
    접속시알림: null,
    고객분류: null,
    지역분류: null,
    현장분류: null,
    고객접점: null,
    담당부서명: null,
  },
})

export const visitListAtom = atom({
  key: 'visitListAtom',
  default: [],
})

export const visitDetailAtom = atom({
  key: 'visitDetailAtom',
  default: {},
})

export const keywordAtom = atom({
  key: 'keywordAtom',
  default: {
    company: '',
    site: '',
    visit: '',

  },
})

export const pagingAtom = atom({
  key: 'pagingAtom',
  default: {
    size: 10,
    company: 1,
    currentPage: 1,
    site: 0,
    visit: 0,
  },
})
