import React from "react";
import styled from "styled-components";

const ReportMainTableTopWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #e4e9ff;
  border-radius: 10px;
  padding: 10px 0;
  margin-bottom: 8px;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1f319d;
    font-weight: 500;
    font-size: 12px;
    &:not(:last-child) {
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 1px;
        height: 10px;
        background-color: #9DA2AE;
        position: absolute;
        top: 50%;
        right: 0;
        transform : translateY(-50%);
      }
    }
  }
  .table-top-date {
    width: 30%;
  }
  .table-top-company {
    width: 30%;
  }
  .table-top-manager {
    width: 20%;
  }
  .table-top-state {
    width: 20%;
  }
`

const ReportMainTableTop = () => {
  return <ReportMainTableTopWrap>
    <div className="table-top-date">문서생성일</div>
    <div className="table-top-company">업체명</div>
    <div className="table-top-manager">작성자</div>
    <div className="table-top-state">결제상태</div>
  </ReportMainTableTopWrap>
}

export default ReportMainTableTop;
