import React from "react";
import styled from "styled-components";

const SaleVisitListComponent = styled.li`
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
    display: flex;
    align-items: center;
    dl {
      font-size: 11px;
      &:first-child {
        margin-right: 28px;
      }
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
      &:not(:last-child) {
        margin-right: 14px;
      }
    }
  }
`

const SaleVisitList = ({
  no,
  date,
  salesManager,
  companyManager,
  position,
  onClick
}) => {
  return <SaleVisitListComponent>
    <div className="list-top">
      <dl>
        <dt>방문번호</dt>
        <dd>{no}</dd>
      </dl>
      <dl>
        <dt>방문일</dt>
        <dd>{date}</dd>
      </dl>
      <button className="viewmore-btn" onClick={onClick} />
    </div>
    <div className="list-body">
      <dl>
        <dt>영업담당자</dt>
        <dd>{salesManager}</dd>
      </dl>
      <dl>
        <dt>업체담당자</dt>
        <dd>{companyManager}</dd>
      </dl>
      <dl>
        <dt>직책</dt>
        <dd>{position}</dd>
      </dl>
    </div>
  </SaleVisitListComponent>
}

export default SaleVisitList