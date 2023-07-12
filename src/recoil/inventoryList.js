import {atom} from "recoil";

// 재고리스트
export const inventoryAtom = atom({
  key: 'inventoryList',
  default: []
})

// 자재요청리스트
export const materialRequestAtom = atom({
  key: 'materialRequestList',
  default: []
})
