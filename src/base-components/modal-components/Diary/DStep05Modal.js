import React, {useState} from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import ProductListItem from "../../../components/diary/ProductListItem";

const ModalWrap = styled.div`
  width: 100%;
  height: auto;
  max-height: 70vh;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 1rem -0.4rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 2rem 2rem 0px 0px;
  .title {
    padding: 1.5rem 0;
    text-align: center;
    h3 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1c1b1f;
    }
  }
  .modal-body {
    padding-bottom: 6rem;
  }
`

const BtnWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 1.7rem 3rem;
  background: #F7F7F7;
  border-radius: 2rem 2rem 0px 0px;
  button {
    width: calc(50% - 0.5rem);
    height: 3.4rem;
    border-radius: 1rem;
    font-size: 1.4rem;
    font-weight: 700;
    &.btn-outline-gray {
      color: #1F319D;
      background: #FFFFFF;
      border: 0.1rem solid #9DA2AE;
    }
    &.btn-blue {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
      color: #f7f7f7;
    } 
  }
`

const ItemAddList = styled.div`
  width: 100%;
  height: auto;
  ul {
    width: 100%;
    height: auto;
    li {
      display: flex;
      align-items: center;
      &.hd {
        height: 3.5rem;
        background: rgba(157, 162, 174, 0.5);
      }
      >div {
        text-align: center;
        font-size: 1rem;
        font-weight: 500;
        color: #1c1b1f;
        word-break: break-all;
        padding: 0 0.5rem;
        position: relative;
        &::after {
          content: '';
          display: block;
          width: 0.1rem;
          height: 2rem;
          background-color: rgba(157, 162, 174, 0.2);
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .check-box {
        width: 12%;
      }
      .code {
        width: 18%;
      }
      .part {
        width: 12%;
      }
      .name {
        width: 26%;
      }
      .standard {
        width: 20%;
      }
      .count {
        width: 12%;
      }
      input[type="checkbox"] {
        width: 1.3rem;
        height: 1.3rem;
        background: #FFFFFF;
        border: 0.1rem solid #9DA2AE;
        border-radius: 0.3rem;
        box-sizing: border-box;
        margin: 0;
        position: relative;
        z-index: 9;
        cursor: pointer;
        &::after {
          content: '';
          display: block;
          width: 1.1rem;
          height: 1.1rem;
          background: url('../../icons/icon-check-off.png') no-repeat center / cover;
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          border-radius: 0.3rem;
        }
        &:checked {
          &::after {
            background: url('../../icons/icon-check-on.png') no-repeat center / cover #1F319D;
          }
        }
      }
    }
  }
`

const DStep04Modal = () => {

  const { closeModal } = useModal();

  // 체크박스 상태
  const [allCheckStatus, setAllCheckStatus] = useState(false);

  // 아이템 배열
  const itemList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]

  return (
    <ModalWrap>
      <div className="title">
        <h3>품목등록리스트</h3>
      </div>
      <div className="modal-body">
        <ItemAddList>
          <ul>
            <li className="hd">
              <div className="check-box">
                <input 
                  type="checkbox" 
                  checked={allCheckStatus} 
                  onChange={() => setAllCheckStatus(!allCheckStatus)} 
                />
              </div>
              <div className="code">
                품목코드
              </div>
              <div className="part">
                파트
              </div>
              <div className="name">
                품명
              </div>
              <div className="standard">
                규격
              </div>
              <div className="count">
                재고
              </div>
            </li>
            {
              itemList?.length > 0 && itemList.map((item, index) => {
                return (
                  <ProductListItem key={index} allCheckStatus={allCheckStatus} />
                )
              })
            }
          </ul>
        </ItemAddList>
      </div>
      <BtnWrap>
        <button 
          type="button" 
          className="btn-blue"
          onClick={() => {
            closeModal()
          }}
          >확인</button>
        <button 
          type="button" 
          className="btn-outline-gray"
          onClick={() => {
            closeModal()
          }}
        >취소</button>
      </BtnWrap>
    </ModalWrap>
  )
}

export default DStep04Modal;