import fetchService from './fetchService'

export const updateReceiptState = async (no, value) => {
  await fetchService('/receipt/updateStatus', 'post', {일련번호: no, 처리상태: value})
}
