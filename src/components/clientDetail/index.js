import React from 'react';
import styled from 'styled-components';

const InfoList = styled.ul`
  background-color: #fff;

  li {
    height: 30px;
    padding: 0 30px;
    border-bottom: 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    dl {
      display: flex;
      align-items: center;
      color: #1c1b1f;
      font-size: 12px;

      dt {
        min-width: 70px;
        font-weight: 500;
      }

      dd {
        font-weight: 400;
      }
    }
  }
`;

const Index = ({item}) => {

  return<InfoList>
    {
      item && <>
        <li>
          <dl>
            <dt>전화번호</dt>
            <dd>{item.전화번호1}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>담당자</dt>
            <dd>{item.담당자}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>직위</dt>
            <dd>{item.직위}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>휴대전화</dt>
            <dd>{item.휴대전화}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>주소</dt>
            <dd>{item.주소}</dd>
          </dl>
        </li>
      </>
    }
  </InfoList>
}

export default Index
