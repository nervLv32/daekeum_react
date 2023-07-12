import React, {useState, useEffect} from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import DStep02Modal from './DStep02Modal'
import fetchService from "../../../util/fetchService";

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
    padding: 3rem 3rem 2.5rem;
    .input-info {
      width: 100%;
      height: auto;
      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
      dt {
        display: inline-block;
        font-size: 1.1rem;
        font-weight: 500;
        color: #1c1b1f;
        margin-bottom: 0.4rem;
        position: relative;
        &.essential {
          &::after {
            content: '';
            display: block;
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 50%;
            background-color: #fb0606;
            position: absolute;
            right: -0.6rem;
            top: 0;
          }
        }
      }
      dd {
        width: 100%;
        height: auto;
        input {
          width: 100%;
          height: 3.3rem;
          background: #fff;
          border: 0.1rem solid #8885CB;
          border-radius: 1rem;
          font-size: 1.2rem;
          font-weight: 500;
          color: #1c1b1f;
          padding: 0 1.5rem;
          &.bg {
            background: #EFF2FF;
          }
          &::placeholder {
            font-size: 1.2rem;
            font-weight: 500;
            color: #9da2ae;
          }
        }
        label {
          display: block;
          position: relative;
          input {
            padding-right: 10.8rem;
          }
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 9.3rem;
            height: 3.3rem;
            position: absolute;
            right: 0;
            top: 0;
            background: #5A55CA;
            border: 0.1rem solid #8885CB;
            border-radius: 1rem;
            font-size: 1.2rem;
            font-weight: 600;
            color: #fff;
            img {
              display: block;
              width: 1.6rem;
              margin-right: 0.4rem;
            }
          }
        }
      }
    }
    .product-info {
      width: 100%;
      height: auto;
      background: #F7F7F7;
      border: 0.1rem solid #CACCD1;
      border-radius: 1rem;
      padding: 2rem 1.7rem;
      margin-top: 1rem;
      dl {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 1.4rem;
        }
        dt {
          width: 9rem;
          padding-right: 1.2rem;
          font-size: 1.2rem;
          line-height: 1.2rem;
          font-weight: 500;
          color: #555;
        }
        dd {
          width: calc(100% - 9rem);
          height: 1.2rem;
          border-bottom: 0.1rem solid #9DA2AE;
        }
      }
    }
  }
`

const BtnWrap = styled.div`
  width: 100%;
  height: auto;
  padding: 1.7rem 3rem;
  background: #F7F7F7;
  border-radius: 2rem 2rem 0px 0px;
  button {
    width: 100%;
    height: 3.4rem;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
    border-radius: 1rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #f7f7f7;
  }
`

const DStep01Modal = ({accountCode}) => {

  const { openModal, closeModal } = useModal();

  const modalData = {
    title: 'DStep01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  // 업체 상세 조회
  const [companyInfo, setCompanyInfo] = useState({});
  const receiptDetail = () => {
    fetchService('/receipt/detail', 'post', {
      일련번호: accountCode
    }).then((res) => {
      res?.data && setCompanyInfo({
        businessName: res.data[0].거래처명,
        businessCode: res.data[0].거래처코드,
        date: res.data[0].날짜,
        manager: res.data[0].담당자,
        visitManager: res.data[0].방문예정담당자,
        tell: res.data[0].연락처,
        no: res.data[0].일련번호,
        submissionDetails: res.data[0].접수내용,
        region: res.data[0].지역,
        status: res.data[0].처리상태,
        siteName: res.data[0].현장명,
        siteAddress: res.data[0].현장주소,
        siteCode: res.data[0].현장코드
      });
    })
  };

  // 장비검색
  const [equipList, setEquipList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const getEquipList = () => {
    fetchService('/enroll/equipList', 'post', {
      searchword: searchKeyword,
      pageSize: 500,
      currentPage: 1,
      // 거래처코드: companyInfo.businessCode,
      거래처코드: "10957",
      // 현장코드: companyInfo.siteCode
      현장코드: "2"
    }).then((res) => {
      setEquipList(res?.data)
    })
  };

  console.log(equipList)

  // 진입시 불러오기
  useEffect(() => {
    receiptDetail();
  }, []);
  useEffect(() => {
    getEquipList();
  }, [searchKeyword]);

  return (
    <ModalWrap>
      <div className="title">
        <h3>일지작성</h3>
      </div>
      <div className="step-list">
        <ul>
          <li>
            <span className="on">1</span>
          </li>
          <li>
            <span>2</span>
          </li>
          <li>
            <span>3</span>
          </li>
          <li>
            <span>4</span>
          </li>
        </ul>
      </div>
      <div className="modal-body">
        <dl className="input-info">
          <dt className="essential">일지번호</dt>
          <dd>
            <input type="text" className="bg" />
          </dd>
        </dl>
        <dl className="input-info">
          <dt className="essential">장비정보</dt>
          <dd>
            <label>
              <input type="text" placeholder="해당업체 장비를 검색하세요." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
              <button type="button">
                <img src="../icons/search-icon.png" alt="검색 아이콘" />
                <span>장비검색</span>
              </button>
            </label>
            <div className="search-list">
              <ul>
                <li className="list-hd">
                  <div className="model-no">
                    MODEL-NO
                  </div>
                  <div className="dkno">
                    DKNO
                  </div>
                  <div className="mcno">
                    MCNO
                  </div>
                </li>
                {
                  equipList?.length > 0 && equipList.map((item, index) => {
                    <li className="list-bd" key={index}>
                      <div className="model-no">

                      </div>
                      <div className="dkno">
                        
                      </div>
                      <div className="mcno">
                        
                      </div>
                    </li>
                  })
                }
              </ul>
            </div>
          </dd>
        </dl>
        <div className="product-info">
          <dl>
            <dt>MODEL-NO</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>수조</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>박스</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>MFG-NO</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>사용전압</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>설치방향</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>침전제</dt>
            <dd></dd>
          </dl>
        </div>
      </div>
      <BtnWrap>
        <button 
          type="button"
          onClick={() => {
            closeModal()
            openModal({ ...modalData, content: <DStep02Modal /> })
          }}
        >
          다음
        </button>
      </BtnWrap>
    </ModalWrap>
  )
}

export default DStep01Modal;