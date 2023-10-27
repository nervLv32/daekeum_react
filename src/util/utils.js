  // state(접수상태) 스타일 핸들링
  export function getOrderStyle(state) {
    switch (state) {
      case '대기':
        return '요청대기'
      case '요청':
        return '자재요청'
      default:
        return;
    }
  }

  // state(접수상태) 핸들링
  export function getOrderState(state) {
    switch (state) {
      case '접수대기':
        return 'ready'
      case '대기':
        return 'ready'
      case '접수완료':
        return 'add'
      case '요청':
        return 'add'
      case '처리완료':
        return 'done'
      case '접수취소':
        return 'cancel'
      default:
        return;
    }
  }
