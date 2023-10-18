import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useRecoilState} from "recoil";
import journalAtom from "../../recoil/journalAtom";

const ItemWrap = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  &:nth-of-type(even) {
    background-color: rgba(157, 162, 174, 0.1);
  }
  &.on {
    background: #EFF2FF;
  }
  >div {
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    color: #1c1b1f;
    word-break: break-all;
    padding: 0 0.5rem;
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 0.1rem;
      height: 2rem;
      background-color: rgba(157, 162, 174, 0.2);
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .check-box {
    width: 12%;
  }
  .code {
    width: 18%;
  }
  .part {
    width: 12%;
  }
  .name {
    width: 26%;
  }
  .standard {
    width: 20%;
  }
  .count {
    width: 12%;
  }
  input[type="checkbox"] {
    width: 1.3rem;
    height: 1.3rem;
    background: #FFFFFF;
    border: 0.1rem solid #9DA2AE;
    border-radius: 0.3rem;
    box-sizing: border-box;
    margin: 0;
    position: relative;
    z-index: 9;
    cursor: pointer;
    &::after {
      content: '';
      display: block;
      width: 1.1rem;
      height: 1.1rem;
      background: url('../../icons/icon-check-off.png') no-repeat center / cover;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      border-radius: 0.3rem;
    }
    &:checked {
      &::after {
        background: url('../../icons/icon-check-on.png') no-repeat center / cover #1F319D;
      }
    }
  }
`

const ProductListItem = ({checkItemList, setCheckItemList, item, allCheckStatus, journal}) => {

  // 초기 체크 상태 설정
  const initialCheckStatus = journal.품목리스트.some(entry => entry.품목코드 === item.품목코드);

  // 체크박스 상태
  const [checkStatus, setCheckStatus] = useState(initialCheckStatus);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      allCheckStatus ? setCheckStatus(true) : setCheckStatus(false)
    }
  }, [allCheckStatus])
  useEffect(() => {
    setLoading(true)
  }, [])

  // 체크된 품목 정보들 저장
  const updateItemList = (item) => {
    setCheckItemList(() => {
      const updatedItemList = checkItemList.some((entry) => entry.품목코드 === item.품목코드)
        ? checkItemList.filter((entry) => entry.품목코드 !== item.품목코드)
        : [...checkItemList, item];
      return updatedItemList;
    });
  };
  const handleCheckboxChange = () => {
    setCheckStatus(!checkStatus);
    updateItemList(item);
  };

  // 체크된 값 체크
  useEffect(() => {
    setCheckItemList(journal.품목리스트)
  }, [])

  console.log(item)

  return (
    <ItemWrap className={checkStatus ? "on" : ""}>
      <div className="check-box">
        <input
          type="checkbox"
          checked={checkStatus}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="code">
        {item.품목코드}
      </div>
      <div className="part">
        {item.파트}
      </div>
      <div className="part">
        {item.사용모델}
      </div>
      <div className="name">
        {item.품명}
      </div>
      <div className="standard">
        {item.규격}
      </div>
      <div className="standard">
        {Number(item.단가).toLocaleString('ko-KR')}
      </div>
      <div className="count">
        {item.재고}
      </div>
    </ItemWrap>
  )
};

export default ProductListItem;
