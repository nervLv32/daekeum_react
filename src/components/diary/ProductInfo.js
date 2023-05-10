import React from 'react';
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: auto;
    padding: 0.7rem 1.3rem 0.7rem 3.7rem;
    background-color: #F7F7F7;
    .price {
      font-size: 1.1rem;
      font-weight: 500;
      color: #9DA2AE;
    }
    .total-price {
      font-size: 1rem;
      font-weight: 500;
      color: #1c1b1f;
      strong {
        font-size: 1.3rem;
        font-weight: 600;
      }
    }
  }
`

const ProductInfo = () => {
  return (
    <ProductInfoWrap>
      <div className="product-info">
        <input type="checkbox" />
        <div className="product-name">
          <h5>PUMP(대금펌프) DTV-55L</h5>
          <span>5.5KW / 220V / 380V겸용</span>
        </div>
        <div className="count-box">
          <Count />
          <span>재고 : 2개</span>
        </div>
      </div>
      <div className="price-info">
        <div className="price">15,000원 X 1개</div>
        <div className="total-price"><strong>15,000</strong> 원</div>
      </div>
    </ProductInfoWrap>
  )
};

export default ProductInfo;