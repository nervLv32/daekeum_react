import React, {useState} from "react";
import styled from "styled-components";
import {useModal} from "../../hooks/useModal";
import {useRecoilState} from "recoil";
import {newReceiptParamAtom} from "../../recoil/receipt";

const SearchRegionModalWrap = styled.div`
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;

  .modal-top {
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    padding: 15px 20px 15px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e9e9e9;

    .title {
      font-weight: 700;
      font-size: 16px;
      color: #1c1b1f;
    }
  }

  .modal-body {
    padding: 25px 30px;
    padding-bottom: 120px;
    background-color: #fff;

    input[type='radio'] {
      display: none;

      &:checked + label {
        color: #fff;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
      }
    }

    label {
      width: 48%;
      text-align: center;
      padding: 1.2rem 0;
      border-radius: 10px;
      border: 1px solid var(--gray-l, #F6F6F6);
      background: var(--sky, #EFF2FF);
    }

    hr {
      stroke: #9DA2AE;
      margin: 1.5rem 0;
    }


    .sector-wrap {
      div.sector1 {
        width: 100%;
        display: inline-flex;
        justify-content: space-between;

      }

      div.sector2 {
        width: 100%;
        display: inline-flex;
        gap: 2%;

      }
    }
  }
`
const ModalBtm = styled.div`
  padding: 17px 30px;
  background-color: #f7f7f7;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  > button {
    cursor: pointer;
    width: calc(50% - 5px);
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
    color: #1c1b1f;
    background-color: #fff;
  }
`

const SearchRegionModal = () => {
  /* ****** 지역별조회 모달 ****** */
  const {closeModal} = useModal();

  const [sector1, setSector1] = useState("센터");
  const [sector2, setSector2] = useState("");

  const [receiptParam, setReceiptParam] = useRecoilState(newReceiptParamAtom)

  const [selectorList, setSelectorList] = useState({
    selector1: [
      {label: '센터', value: '센터'},
      {label: '지사', value: '지사'},
    ],
    selector2: [
      {
        label: '센터', data: [
          {label: '수도권A', value: '수도권A'},
          {label: '수도권B', value: '수도권B'},
          {label: '부산', value: '부산'},
          {label: '대구', value: '대구'},
        ]
      },
      {
        label: '지사', data: [
          {label: '강원', value: '강원'},
          {label: '충북', value: '충북'},
          {label: '전북', value: '전북'},
          {label: '충남', value: '충남'},
          {label: '광주', value: '광주'},
        ]
      },
    ]
  })

  const onChangeParam = () => {
    setReceiptParam({
      ...receiptParam,
      currentPage: '1',
      지역: sector2
    })
  }

  return (
    <SearchRegionModalWrap>
      <div className="modal-top">
        <h6 className="title">지역별 조회</h6>
      </div>
      <div className="modal-body">
        <div className="sector-wrap">
          <div className="sector1">
            {
              selectorList.selector1.map((it, key) => {
                return <React.Fragment key={key}>
                  <input type={"radio"} name={'selector1'} id={'selector1' + key} value={it.value}
                         onChange={() => setSector1(it.value)}
                         checked={it.label === sector1}
                  />
                  <label htmlFor={'selector1' + key} className={'selector1'}> {it.label}</label>
                </React.Fragment>
              })
            }
          </div>
          <hr/>
          <div className="sector2">
            {
              selectorList.selector2.filter(it => it.label === sector1)[0].data.map((it, key) => {
                return <React.Fragment key={key}>
                  <input type={"radio"} name={'selector2'} id={'selector2' + key} value={it.value}
                         onChange={() => setSector2(it.value)}
                         checked={it.value === sector2}/>
                  <label htmlFor={'selector2' + key} className={'selector2'}> {it.label}</label>
                </React.Fragment>
              })
            }
          </div>
        </div>
      </div>

      <ModalBtm>
        <button className="primary-btn" onClick={() => {
          onChangeParam();
          closeModal()
          // openModal({ ...modalData, content: <RPC01Step03Modal /> })
        }}>적용
        </button>
        <button className="del-btn" onClick={() => {
          closeModal()
          // openModal({ ...modalData, content: <RPC01Step01Modal /> })
        }}>취소
        </button>
      </ModalBtm>
    </SearchRegionModalWrap>
  )
}

export default SearchRegionModal;
