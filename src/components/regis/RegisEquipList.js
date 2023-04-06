import React from "react";
import styled from "styled-components";

const RegisEquipListComponent = styled.li`
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
    > div {
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 9px;
      }
      dl {
        font-size: 12px;
        &:not(:last-child) {
          margin-right: 14px;
        }
      }
    }
  }
`

const RegisEquipList = ({
  dkno,
  date,
  mcno,
  model,
  installCate,
  warehousingCate,
  onClick
}) => {
  return <RegisEquipListComponent onClick={onClick}>
    <div className="list-top">
      <dl>
        <dt>DKNO</dt>
        <dd>{dkno}</dd>
      </dl>
      <button className="viewmore-btn" />
    </div>
    <div className="list-body">
      <div>
        <dl>
          <dt>설치일</dt>
          <dd>{date}</dd>
        </dl>
        <dl>
          <dt>MCNO</dt>
          <dd>{mcno}</dd>
        </dl>
      </div>
      <div>
        <dl>
          <dt>모델</dt>
          <dd>{model}</dd>
        </dl>
        <dl>
          <dt>설치구분</dt>
          <dd>{installCate}</dd>
        </dl>
        <dl>
          <dt>입출고</dt>
          <dd>{warehousingCate}</dd>
        </dl>
      </div>
    </div>
  </RegisEquipListComponent>
}

export default RegisEquipList