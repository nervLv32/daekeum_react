import React from "react";
import styled from "styled-components";

const SaleSiteListComponent = styled.li`
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
      background : url('../icons/regis-viewmore-icon.png') no-repeat 50% center;
      position: absolute;
      top: 10px;
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

const SaleSiteList = ({
  site,
  region,
  center,
  onClick
}) => {
  return <SaleSiteListComponent>
    <div className="list-top">
      <dl>
        <dt>현장명</dt>
        <dd>{site}</dd>
      </dl>
      <button className="viewmore-btn" onClick={onClick} />
    </div>
    <div className="list-body">
      <dl>
        <dt>지역분류</dt>
        <dd>{region}</dd>
      </dl>
      <dl>
        <dt>담당센터</dt>
        <dd>{center}</dd>
      </dl>
    </div>
  </SaleSiteListComponent>
}

export default SaleSiteList