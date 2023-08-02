import React, {useState, useEffect} from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import DStep03Modal from './DStep03Modal'
import DStep05Modal from './DStep05Modal'
import ProductInfo from "../../../components/diary/ProductInfo";
import {useRecoilState} from "recoil";
import journalAtom from "../../../recoil/journalAtom";
import OptionSelectedMemo from "../../../components/optionSelector/OptionSelectorMemo";
import fetchService from "../../../util/fetchService";
import { CommaPrice } from "../../../util/commaPrice";

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
  .step-list {
    background-color: #f7f7f7;
    padding: 1.5rem 3rem;
    ul {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 0.1rem;
        background-color: #9da2ae;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      li {
        position: relative;
        z-index: 9;
        &::before {
          content: '';
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background-color: #f7f7f7;
          position: absolute;
          right: -0.8rem;
          top: 50%;
          transform: translateY(-50%);
        }
        &::after {
          content: '';
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background-color: #f7f7f7;
          position: absolute;
          left: -0.8rem;
          top: 50%;
          transform: translateY(-50%);
        }
        span {
          display: block;
          width: 1.8rem;
          height: 1.8rem;
          line-height: 1.8rem;
          border-radius: 50%;
          background: #9da2ae;
          text-align: center;
          font-size: 1.2rem;
          font-weight: 500;
          color: #fff;
          &.on {
            box-sizing: content-box;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
            border: 0.2rem solid #A9B5FF;
          }
        }
      }
    }
  }
  .modal-body {
    .product-list-wrap {
      padding: 3rem;
      .add-ons {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1.5rem;
        padding-left: 1.3rem;
        .all-check {
          display: flex;
          align-items: center;
          input[type="checkbox"] {
            width: 1.5rem;
            height: 1.5rem;
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
              width: 1.3rem;
              height: 1.3rem;
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
          span {
            display: inline-block;
            font-size: 1.1rem;
            font-weight: 500;
            color: #555;
            margin-left: 0.9rem;
          }
        }
        .btn-wrap {
          display: flex;
          button {
            width: 6rem;
            height: 2.1rem;
            border-radius: 0.5rem;
            font-size: 1.1rem;
            font-weight: 500;
            &:not(:first-child) {
              margin-left: 0.3rem;
            }
            &.btn-outline-gray {
              background: #fff;
              border: 0.1rem solid #9DA2AE;
              color: #1c1b1f;
            }
            &.btn-blue {
              background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
              border: 0.1rem solid #9DA2AE;
              color: #fff;
            }
          }
        }
      }
      .list-wrap {
        ul {
          li {
            &:not(:last-child) {
              margin-bottom: 2rem;
            }
            &.empty {
              width: 100%;
              height: 10rem;
              background-color: #fff;
              border: 0.1rem solid #D9D9D9;
              border-radius: 0.5rem;
              overflow: hidden;
              text-align: center;
              font-size: 1.3rem;
              line-height: 10rem;
              font-weight: 500;
              color: #1c1b1f;
            }
          }
        }
      }
    }
    .total-price-info {
      padding: 2rem 3rem;
      border-top: 0.1rem solid rgba(157, 162, 174, 0.3);
      dl {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.1rem;
        font-weight: 500;
        color: #555;
        &:not(:last-child) {
          margin-bottom: 0.8rem;
        }
        &:first-child {
          margin-bottom: 1.6rem;
          dt {
            font-size: 1.1rem;
            font-weight: 500;
            color: #1c1b1f;
          }
          dd {
            font-size: 1.2rem;
            font-weight: 500;
            color: #1c1b1f;
            strong {
              font-size: 1.8rem;
              font-weight: 600;
              color: #ea583f;
            }
          }
        }
        dd {
          select {
            width: 8rem;
            border: 0.1rem solid #8885CB;
            border-radius: 0.3rem;
            font-size: 1.1rem;
            font-weight: 500;
            color: #555;
          }
        }
      }
    }
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

const DStep04Modal = () => {

  // 모달관련
  const { openModal, closeModal } = useModal();
  const modalData = {
    title: 'DStep04Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  // 일지작성 recoil
  const [journal, setJournal] = useRecoilState(journalAtom);

  // 체크박스
  const [allChecked, setAllChecked] = useState(false);

  // 체크된 리스트 정보 저장
  const [checkListItem, setCheckListItem] = useState([]);

  // 삭제 기능 추가
  const handleDelete = () => {
    const resultArray = journal.품목리스트.filter(item1 => !checkListItem.some(item2 => item2.rownum === item1.rownum));
    setJournal({
      ...journal,
      품목리스트: resultArray
    });
    setCheckListItem([]);
  };

  // 결제방식
  const [options, setOptions] = useState([]);
  const updateValue = (key, value) => {
    setJournal({
      ...journal,
      [key]: value
    })
  }

  // 결제방식 가져오기
  useEffect(() => {
    fetchService('/approval/comboPayment', 'post', {})
    .then((res) => {
      setOptions(res.data)
    })
  }, []);

  // 네고 및 합계 계산
  const [freePrice, setFreePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const price01 = journal.품목리스트.filter(item => item.무상체크)
    .map(item => item.단가 * item.수량)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const price02 = journal.품목리스트.map(item => item.단가 * item.수량)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setFreePrice(price01)
    setTotalPrice(price02)
  }, [journal?.품목리스트])

  return (
    <ModalWrap>
      <div className="title">
        <h3>일지작성</h3>
      </div>
      <div className="step-list">
        <ul>
          <li>
            <span>1</span>
          </li>
          <li>
            <span>2</span>
          </li>
          <li>
            <span>3</span>
          </li>
          <li>
            <span className="on">4</span>
          </li>
        </ul>
      </div>
      <div className="modal-body">
        <div className="product-list-wrap">
          <div className="add-ons">
            <label className="all-check">
              <input 
                type="checkbox" 
                checked={allChecked}
                onChange={() => setAllChecked(!allChecked)}
              />
              <span>전체선택</span>
            </label>
            <div className="btn-wrap">
              <button type="button" className="btn-outline-gray" onClick={handleDelete}>선택삭제</button>
              <button 
                type="button" 
                className="btn-blue"
                onClick={() => {
                  openModal({ ...modalData, content: <DStep05Modal /> })
                }}
              >품목추가</button>
            </div>
          </div>
          <div className="list-wrap">
            <ul>
              {
                journal?.품목리스트?.length > 0 ? journal.품목리스트.map((item, index) => {
                  return (
                    <li key={index}>
                      <ProductInfo 
                        item={item} 
                        journal={journal} 
                        setJournal={setJournal}
                        allChecked={allChecked}
                        setCheckListItem={setCheckListItem}
                      />  
                    </li>
                  )
                }) : (
                  <li className="empty">
                    추가된 품목이 없습니다.
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className="total-price-info">
          <dl>
            <dt>청구금액</dt>
            <dd><strong>{CommaPrice(totalPrice - freePrice)}</strong> 원(VAT별도)</dd>
          </dl>
          <dl>
            <dt>합계금액</dt>
            <dd>{CommaPrice(totalPrice)}</dd>
          </dl>
          <dl>
            <dt>네고금액</dt>
            <dd>{CommaPrice(freePrice)}</dd>
          </dl>
          <dl>
            <dt>계산서발행일</dt>
            <dd>2023-03-13</dd>
          </dl>
          <dl>
            <dt>결제예정일</dt>
            <dd>2023-03-13</dd>
          </dl>
          <dl>
            <dt>결제방식</dt>
            <dd>
              <OptionSelectedMemo
                list={options || []}
                updateValue={updateValue}
                body={journal}
                depth1={'결제방식'}
              />
            </dd>
          </dl>
        </div>
      </div>
      <BtnWrap>
        <button 
          type="button" 
          className="btn-outline-gray"
          onClick={() => {
            closeModal()
            openModal({ ...modalData, content: <DStep03Modal /> })
          }}
        >이전</button>
        <button 
          type="button" 
          className="btn-blue"
          onClick={() => {
            closeModal()
          }}
        >다음</button>
      </BtnWrap>
    </ModalWrap>
  )
}

export default DStep04Modal;