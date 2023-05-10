import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

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

const ProductListItem = ({allCheckStatus}) => {

  // 체크박스 상태
  const [checkStatus, setCheckStatus] = useState(false);

  // 전체 체크박스 상태관리
  useEffect(() => {
    allCheckStatus ? setCheckStatus(true) : setCheckStatus(false);
  }, [allCheckStatus])

  return (
    <ItemWrap className={checkStatus ? "on" : ""}>
      <div className="check-box">
        <input 
          type="checkbox" 
          checked={checkStatus} 
          onChange={() => setCheckStatus(!checkStatus)} 
        />
      </div>
      <div className="code">
        TNUPU05001
      </div>
      <div className="part">
        펌프
      </div>
      <div className="name">
        PUMP(대금펌프) DTV-55L
      </div>
      <div className="standard">
        5.5KW/220V 380V겸용
      </div>
      <div className="count">
        1.0
      </div>
    </ItemWrap>
  )
};

export default ProductListItem;