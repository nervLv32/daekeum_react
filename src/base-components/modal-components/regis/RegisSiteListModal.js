import React from "react";
import styled from "styled-components";
import {useModal} from "../../../hooks/useModal";
import {useNavigate} from "react-router-dom";
import RegisAddPlaceModal from "./RegisAddPlaceModal";
import {useRecoilState} from "recoil";
import {selectCompanyAtom} from "../../../recoil/regisAtom";

const RegisSiteListModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;

  .modal-top {
    border-radius: 20px 20px 0 0;
    background: #E4E9FF;
    padding: 13px 20px 13px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .dl-wrap {
      display: flex;
      align-items: center;

      dl {
        display: flex;
        align-items: center;
        font-family: var(--font-mont);

        &:first-child {
          margin-right: 18px;
        }

        dt {
          color: #1f319d;
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
          margin-right: 12px;
          width: 50px;
          text-align-last: justify;
        }

        dd {
          color: #1c1b1f;
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }

  .modal-body {
    padding: 25px 30px;
    background-color: #fff;

    li {
      display: flex;
      align-items: center;

      &:not(:last-child) {
        border-bottom: 1px solid #eff2ff;
        padding-bottom: 13px;
        margin-bottom: 13px;
      }

      dl {
        display: flex;
        align-items: center;
        font-family: var(--font-mont);

        &:nth-child(2) {
          margin-left: 15px;
        }

        dt {
          letter-spacing: -0.03em;
          color: #1f319d;
          font-weight: 600;
          font-size: 12px;
          width: 63px;
          text-align-last: justify;
        }

        dd {
          font-weight: 400;
          font-size: 12px;
          color: #1c1b1f;
          margin-left: 10px;

          &.oneLine {
            width: calc(100% - 63px);
            line-height: 17px;
          }
        }
      }
    }
  }

  .modal-btm {
    padding: 17px 30px;
    background-color: #f7f7f7;
    border-radius: 20px 20px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > *:not(:last-child) {
      margin-right: 10px;
    }

    > button {
      cursor: pointer;
    }

    .primary-btn {
      height: 34px;
      padding: 0 30px;
      font-size: 14px;
      font-weight: 700;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
      border-radius: 10px;
      color: #fff;
    }

    .del-btn {
      padding: 0 15px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #1F319D;
      border-radius: 10px;
      font-weight: 700;
      font-size: 14px;
      color: #555;
    }
  }
`

const RegisSiteListModal = ({item}) => {
  const {openModal, closeModal} = useModal();

  const navigate = useNavigate();
  const [selectRegis, setSelectRegis] = useRecoilState(selectCompanyAtom)

  const modalData = {
    title: 'Modal',
    callback: () => alert('Modal Callback()'),
  };

  return (
    <RegisSiteListModalWrap>
      <div className="modal-top">
        <div className="dl-wrap">
          <dl>
            <dt>현 장 명</dt>
            <dd>{item.site}</dd>
          </dl>
        </div>
      </div>
      <ul className="modal-body">
        <li>
          <dl>
            <dt>지 역 분 류</dt>
            <dd>{item.regionFirst}-{item.regionLast}</dd>
          </dl>
          <dl>
            <dt>담 당 센 터</dt>
            <dd>{item.center}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>업 태</dt>
            <dd>{item.sector}</dd>
          </dl>
          <dl>
            <dt>사 업 자 번 호</dt>
            <dd>{item.sectorNum}</dd>
          </dl>
        </li>

        <li>
          <dl>
            <dt>현 장 주 소</dt>
            <dd className="oneLine">{item.siteAddress}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>현 장 담 당 자</dt>
            <dd>{item.manager}</dd>
          </dl>
          <dl>
            <dt>현 장 연 락 처</dt>
            <dd>{item.managerPhone}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>이 메 일</dt>
            <dd className="oneLine">{item.email}</dd>
          </dl>
        </li>
      </ul>
      <div className="modal-btm">
        <button className="primary-btn" onClick={() => {
          setSelectRegis({
            ...selectRegis,
            site: {
              code: item.현장코드,
              name: item.현장명,
            }
          })
          navigate('/regis/equipment', {replace: true})
          closeModal();
        }}>장비조회
        </button>
        <button className="primary-btn" onClick={() => {
          closeModal()
          openModal({...modalData, content: <RegisAddPlaceModal item={item}/>})
        }}>현장수정
        </button>
        <button className="del-btn" onClick={closeModal}>닫기</button>
      </div>
    </RegisSiteListModalWrap>
  )
}

export default RegisSiteListModal;
