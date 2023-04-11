import React from "react";
import styled from "styled-components";

const SaleInfoListComponent = styled.li`
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  dl {
    display: flex;
    align-items: center;
    font-family: var(--font-mont);
    dt {
      color: #1f319d;
      margin-right: 8px;
      font-weight: 500;
    }
    dd {
      color: #1c1b1f;
      font-weight: 400;
    }
  }
  .list-top {
    padding: 9px 18px;
    background-color: #e4e9ff;
    border-radius: 10px 10px 0px 0px;
    position: relative;
    dl {
      font-size: 11px;
      dt {
        font-weight: 700;
      }
      dd {
        font-weight: 700;
      }
    }
    .viewmore-btn {
      width: 13px;
      height: 14px;
      background : url('icons/regis-viewmore-icon.png') no-repeat 50% center;
      position: absolute;
      top: 8px;
      right:18px;
      cursor: pointer;
    }
  }
  .list-body {
    padding: 12px 18px;
    background-color: #f7f7f7;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: center;
    dl {
      font-size: 12px;
      &:first-child {
        margin-right: 14px;
      }
    }
  }
`

const SaleInfoList = ({
  company,
  ceo,
  companyNum,
  onClick
}) => {
  return <SaleInfoListComponent>
    <div className="list-top">
      <dl>
        <dt>업체명</dt>
        <dd>{company}</dd>
      </dl>
      <button className="viewmore-btn" onClick={onClick} />
    </div>
    <div className="list-body">
      <dl>
        <dt>대표자</dt>
        <dd>{ceo}</dd>
      </dl>
      <dl>
        <dt>사업자번호</dt>
        <dd>{companyNum}</dd>
      </dl>
    </div>
  </SaleInfoListComponent>
}

export default SaleInfoList