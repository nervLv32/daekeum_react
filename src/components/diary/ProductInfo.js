import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Count from './Count';

const ProductInfoWrap = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  border: 0.1rem solid #D9D9D9;
  border-radius: 0.5rem;
  overflow: hidden;
  .product-info {
    width: 100%;
    height: auto;
    display: flex;
    padding: 1.3rem 1.3rem 1rem;
    input[type="checkbox"] {
      width: 1.5rem;
      height: 1.5rem;
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
        width: 1.3rem;
        height: 1.3rem;
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
    .product-name {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 0 1rem;
      h5 {
        font-size: 1.3rem;
        font-weight: 500;
        color: #1c1b1f;
      }
      span {
        display: block;
        margin-top: 0.6rem;
        font-size: 1.1rem;
        font-weight: 500;
        color: #9DA2AE;
      }
    }
    .count-box {
      > span {
        display: block;
        text-align: center;
        margin-top: 0.4rem;
        font-size: 0.9rem;
        font-weight: 500;
        color: #9DA2AE;
      }
    }
  }
  .price-info {
    width: 100%;
    height: auto;
    padding: 0.7rem 1.3rem;
    background-color: #F7F7F7;
    label {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      font-weight: 500;
      color: #9DA2AE;
    }
    input[type="checkbox"] {
      width: 1.5rem;
      height: 1.5rem;
      background: #FFFFFF;
      border: 0.1rem solid #9DA2AE;
      border-radius: 0.3rem;
      box-sizing: border-box;
      margin: 0;
      position: relative;
      z-index: 9;
      cursor: pointer;
      margin-right: 0.5rem;
      &::after {
        content: '';
        display: block;
        width: 1.3rem;
        height: 1.3rem;
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
    input[type="text"] {
      width: calc(100% - 5.1rem);
      height: 2rem;
      background: #fff;
      border: 0.1rem solid #8885CB;
      border-radius: 0.2rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #1c1b1f;
      padding: 0 1rem;
      margin-left: 1rem;
      &.bg {
        background: #F7F7F7;
      }
      &::placeholder {
        font-size: 1.2rem;
        font-weight: 500;
        color: #9da2ae;
      }
    }
    .price-wrap {
      width: 100%;
      height: auto;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      margin-top: 0.3rem;
      .price-count {
        font-size: 1.1rem;
        font-weight: 500;
        color: #9DA2AE;
      }
      .total-price {
        font-size: 1rem;
        line-height: 1;
        font-weight: 500;
        color: #1c1b1f;
        margin-left: 1rem;
        strong {
          font-size: 1.3rem;
          line-height: 1;
          font-weight: 600;
        }
      }
    }
  }
`

const ProductInfo = ({item, journal, setJournal}) => {

  // Count State
  const [count, setCount] = useState(1);

  // 무상 구분
  const [freeChecked, setFreeChecked] = useState(false);
  const [freeText, setFreeText] = useState("");

  const handleChange = () => {
    setFreeChecked(!freeChecked);
  };

  useEffect(() => {
    if (freeChecked) {
      setJournal({
        ...journal,
        품목리스트: [
          ...journal.품목리스트.map((it) =>
            it.rownum === item.rownum ? { ...it, 유무상구분: freeText, 무상체크: true } : it
          ),
        ],
      });
    } else {
      setJournal({
        ...journal,
        품목리스트: [
          ...journal.품목리스트.map((it) =>
            it.rownum === item.rownum ? { ...it, 유무상구분: "", 무상체크: false } : it
          ),
        ],
      });
    }
  }, [freeChecked, freeText])

  useEffect(() => {
    setJournal({
      ...journal,
      품목리스트: [
        ...journal.품목리스트.map((it) =>
          it.rownum === item.rownum ? { ...it, 수량: count } : it
        ),
      ],
    });
  }, [count])

  return (
    <ProductInfoWrap>
      <div className="product-info">
        <input type="checkbox" />
        <div className="product-name">
          <h5>{item?.품명}</h5>
          <span>5.5KW / 220V / 380V겸용</span>
        </div>
        <div className="count-box">
          <Count maxCount={item.재고} count={count} setCount={setCount} />
          <span>재고 : {item.재고}개</span>
        </div>
      </div>
      <div className="price-info">
        <label>
          <input type="checkbox" checked={freeChecked} onChange={handleChange} />
          무상
          <input 
            type="text" 
            value={freeText} 
            onChange={(e) => setFreeText(e.target.value)} 
          />
        </label>
        <div className="price-wrap">
          <div className="price-count">  
            <span>{item.단가}원 X {count}개</span>
          </div>
          <div className="total-price"><strong>{item.단가 * count}</strong> 원</div>
        </div>
      </div>
    </ProductInfoWrap>
  )
};

export default ProductInfo;