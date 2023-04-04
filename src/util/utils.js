  // state(접수상태) 핸들링 
  export function getOrderState(state) {
    switch (state) {
      case '접수대기':
        return 'ready'
        break;
      case '접수완료':
        return 'add'
        break;
      case '처리완료':
        return 'done'
        break;
      default:
        return;
    }
  }