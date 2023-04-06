import React from "react";
import styled from "styled-components";

const RegisSiteListComponent = styled.li`
  cursor: pointer;
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
      height: 3px;
      background : url('../icons/regis-viewmore-icon.png') no-repeat 50% center / cover;
      position: absolute;
      top: 14px;
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

const RegisSiteList = ({
  site,
  regionFirst,
  regionLast,
  sector,
  onClick
}) => {
  return <RegisSiteListComponent onClick={onClick}>
    <div className="list-top">
      <dl>
        <dt>현장명</dt>
        <dd>{site}</dd>
      </dl>
      <button className="viewmore-btn" />
    </div>
    <div className="list-body">
      <dl>
        <dt>지역분류</dt>
        <dd>{regionFirst}-{regionLast}</dd>
      </dl>
      <dl>
        <dt>담당센터</dt>
        <dd>{sector}</dd>
      </dl>
    </div>
  </RegisSiteListComponent>
}

export default RegisSiteList