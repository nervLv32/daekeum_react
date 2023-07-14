import React from "react";
import styled from "styled-components";
import {DateFormat} from '../../util/dateFormat';

const ReportMainTableWrap = styled.li`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  .table-body-top {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #F6F6F6;
    border-radius: 10px 10px 0 0;
    padding: 10px 0;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1c1b1f;
      font-family: var(--font-mont);
      font-weight: 400;
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
    .table-date {
      width: 30%;
    }
    .table-company {
      width: 30%;
    }
    .table-manager {
      width: 20%;
    }
    .table-state {
      width: 20%;
    }
  }
  .table-body-btm {
    padding: 10px;
    border-radius: 0 0 10px 10px;
    background-color: #ebecef;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    font-family: var(--font-mont);
    color: #1c1b1f;
    display: flex;
    flex-wrap : wrap;
    align-items: center;
    dl {
      display: flex;
      align-items: center;
      font-size: 11px;
      font-weight: 400;
      color: #1c1b1f;
      &.second-dl {
        margin-right: 14px;
      }
      dt {
        margin-right: 6px;
      }
    }
    .top-dl {
      width: 100%;
      margin-bottom: 6px;
    }
  }
`

const ReportMainTable = ({ list }) => {
  return (
    <ReportMainTableWrap>
      <div className="table-body-top">
        <div className="table-date">{DateFormat(new Date(list.문서생성일)).substr(0,10)}</div>
        <div className="table-company">{list.거래처명}</div>
        <div className="table-manager">{list.작성자}</div>
        <div className="table-state">{list.결재상태}</div>
      </div>
      <div className="table-body-btm">
        <dl className="top-dl">
          <dt>현장명</dt>
          <dd>{list.현장명}</dd>
        </dl>
        <dl className="second-dl">
          <dt>부서명</dt>
          <dd>{list.부서명}</dd>
        </dl>
        <dl>
          <dt>지역분류</dt>
          <dd>
            {list.지역분류}
          </dd>
        </dl>
      </div>
    </ReportMainTableWrap>
  )
}
export default ReportMainTable;
