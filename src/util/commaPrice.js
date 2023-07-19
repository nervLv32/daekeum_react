export const CommaPrice = (number) => {
  return parseInt(number).toLocaleString('ko-KR')
}

export const CommaPriceRegis = (number) => {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}
