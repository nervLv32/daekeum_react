import React from 'react';
import styled from 'styled-components';
import Count from './Count';

const ProductInfoWrap = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  border: 0.1rem solid #D9D9D9;
  border-radius: 0.5rem;
  .product-info {

  }
`

const ProductInfo = () => {
  return (
    <ProductInfoWrap>
      <div className="product-info">
        <input type="checkbox" />
        <div className="subject">
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