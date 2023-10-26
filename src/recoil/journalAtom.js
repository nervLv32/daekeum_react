import {atom} from "recoil";

const journalAtom = atom({
  key: 'journal',
  default: {
    step01: {
      no: '',
      DKNO: "",
      MCNO: "",
      TNO: "",
      inoutNO: "",
      rownum: "",
      거래처명: "",
      거래처코드: "",
      경도: "",
      계정번호: "",
      공장명: "",
      공장코드: "",
      구분: "",
      규격: "",
      금액: "",
      담당자: "",
      등급: "",
      매출타입: "",
      모델: "",
      반환주소: "",
      방향: "",
      부서코드: "",
      비고: "",
      사업장코드: "TW",
      사원코드: "",
      상태: "",
      설치일: "",
      센터명: "",
      신주소: "",
      신주소나머지: "",
      옵션: "",
      옵션1: "",
      완료일: "",
      우편번호: "",
      우편번호신: "",
      위도: "",
      위치: "",
      일련번호: "",
      입고예정일: "",
      입고일: "",
      입출고: "",
      잔여일: "",
      장비관리자: "",
      장비구분: "",
      전압: "",
      제조사: "",
      주소: "",
      주소나머지: "",
      지역구분: "",
      출고대기NO: "",
      출고일: "0",
      현장명: "",
      현장코드: "",
      회사코드: "1000",
      휴대폰: "",
    },
    step02: {
      업체명: "",
      현장명: "",
      현장담당자: "",
      현장연락처: "",
      현장담당자연락처: "",
      현장담당자메일주소: "",
      접수일: "",
      처리일: "",
      도착일: "",
      종료일: "",
      점검요원: "",
      사용자연락처: ""
    },
    step03: {
      처리구분: "",
      요청사항: "",
      원인: "",
      업무내용: "",
      다음순회점검예정일: ""
    },
    step04: {
      무상금액: "",
      무상: "",
      네고금액: "",
      네고: "",
      합계금액: "",
      합계: "",
      청구금액: "",
      무상구분:""
    },
    품목리스트: []
  },
})

export default journalAtom;
