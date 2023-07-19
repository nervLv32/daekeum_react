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

export const exportDocumentBody = atom({
  key: 'exportDocumentBody',
  default: {
    UserInfo: {},
    거래처현황: {},
    거래처세부: {},
    신규사업여부: false,
    계약사항: [{
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
    운송조건: {
      운송비조건: '',
      운송비청구방법: '',
      운송비: '',
      특기사항: '',
    },
    결제조건: {
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
      특기사항: '',
    },
    신규사업내용: {
      비점오염저감시설: true,
      빗물재이용시설: true,
      오탁수처리시설: true,
      기타: true,
      없음: true,
      특기사항: '',
    },
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
