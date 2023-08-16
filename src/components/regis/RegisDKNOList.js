import React from "react";
import styled from "styled-components";

const RegisDKNOListComponent = styled.li`
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
      top: 8px;
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

const RegisDKNOList = ({
  installCate,
  item,
  onClick
}) => {

  console.log(item)

  return <RegisDKNOListComponent>
    <div className="list-top">
      <dl>
        <dt>DKNO</dt>
        <dd>{item.DKNO}</dd>
      </dl>
      <button className="viewmore-btn" onClick={onClick} />
    </div>
    <div className="list-body">
      <div>
        <dl>
          <dt>구분</dt>
          <dd>{item.구분}</dd>
        </dl>
        <dl>
          <dt>위치</dt>
          <dd>{item.위치}</dd>
        </dl>

        <dl>
          <dt>모델명</dt>
          <dd>{item.모델명}</dd>
        </dl>
      </div>
      <div>
        <dl>
          <dt>거래처명</dt>
          <dd>{item.거래처명}</dd>
        </dl>
        <dl>
          <dt>현장명</dt>
          <dd>{item.현장명}</dd>
        </dl>
      </div>
    </div>
  </RegisDKNOListComponent>
}

export default RegisDKNOList
