import {atom} from 'recoil'

export const reportAtom = atom({
  key: 'reportAtom',
  default: [],
})
export const reportParamAtom = atom({
  key: 'reportParamAtom',
  default: {
    searchword: '',
    currentPage: '1',
    pageSize: '10',
    작성자: '',
  },
})

export const firstExportDocument = atom({
  key: 'firstExportDocument',
  default: {
    client: {
      업체명: '업체명',
      거래처코드: '',
    },
    site: {
      현장명: '현장명',
      현장코드: '',
    },
    equip: {
      장비정보: null,
    },
  },
})

export const firstExportDocuBody = atom({
  key: 'firstExportDocuBody',
  default: [{
    사업구분: '',
    매출타입: '',
    장비구분: '',
    기종명: '',
    세부사항: '',
    전압: '',
    방향: '',
    개월: '',
    시작일: '',
    청구구분: '',
    종료일: '',
    납품예정일: '',
    시간: '',
    일시불: '',
    금액: '',
  }],
})

export const shipCondBody = atom({
  key: 'shipCondBody',
  default: {
    운송비조건: '',
    운송비청구방법: '',
    운송비: '',
    특기사항: '',
  },
})

export const payHow = atom({
  key: 'payHow',
  default: {
    결제방법: '',
    개월: '',
    메일: '',
    담당자: '',
    연락처: '',
    결제처: '',
    수신: '',
    일시불: '',
    계약서: '',
    청구일: '',
    결제일: '',
    특기사항: ''
  }
})
