import React, { useState } from 'react';
import styled from 'styled-components';

const CountWrap = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 1.6rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #9da2ae;
    background-color: #fff;
    img {
      display: inline-block;
      vertical-align: middle;
      padding-bottom: 0.3rem;
    }
  }
  span {
    display: block;
    padding: 0 0.8rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: #1c1b1f;
  }
`

const Count = () => {

  // Count State
  const [count, setCount] = useState(1);

  const handlePlus = () => {
    setCount(count + 1);
  }

  const handleMinus = () => {
    count > 1 && setCount(count - 1);
  }

  return (
    <CountWrap>
      <button type="button" onClick={handlePlus}>
        <img src="../../icons/icon-plus.png" alt="플러스 아이콘" />
      </button>
      <span>{count}</span>
      <button type="button" onClick={handleMinus}>
        <img src="../../icons/icon-minus.png" alt="마이너스 아이콘" />
      </button>
    </CountWrap>
  )
};

export default Count;