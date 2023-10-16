import React, {useState, useEffect, useRef} from "react"
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";
import DStep02Modal from './DStep02Modal'
import fetchService from "../../../util/fetchService";
import {useRecoilState} from "recoil";
import journalAtom from "../../../recoil/journalAtom";

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
        position: relative;
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
        .search-list {
          position: absolute;
          left: 0;
          top: 100%;
          width: 100%;
          height: auto;
          z-index: 99;
          ul {
            width: 100%;
            height: auto;
            max-height: 18rem;
            background-color: #fff;
            border: 0.1rem solid #9da2ae;
            border-radius: 1rem;
            overflow-y: auto;
            li {
              width: 100%;
              height: auto;
              display: flex;
              align-items: center;
              padding: 1rem;
              &.on {
                background-color: #EFF2FF;
              }
              > div {
                width: calc(100% / 3);
                height: auto;
                text-align: center;
                font: 500 1.2rem 'Montserrat',sans-serif;
                color: #555;
                &:not(:last-child) {
                  border-right: 0.1rem solid #9DA2AE;
                }
              }
              &.hd {
                background-color: #f6f6f6;
                > div {
                  color: #1C1B1F;
                }
              }
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
          display: flex;
          align-items: center;
          width: calc(100% - 9rem);
          min-height: 1.2rem;
          border-bottom: 0.1rem solid #9DA2AE;
          label {
            display: flex;
            align-items: center;
            cursor: pointer;
            &:not(:last-child) {
              margin-right: 1rem;
            }
            input {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              border: 0.1rem solid rgb(136, 133, 203);
              margin: 0;
              position: relative;
              cursor: pointer;
              &:checked {
                &::after {
                  content: '';
                  display: block;
                  width: 0.8rem;
                  height: 0.8rem;
                  border-radius: 50%;
                  background-color: rgb(90, 85, 202);
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
            span {
              display: block;
              margin-left: 0.3rem;
            }
          }
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

const DStep01Modal = ({no}) => {

  const { openModal, closeModal } = useModal();

  // 업체정보 Recoil
  const [journal, setJournal] = useRecoilState(journalAtom);

  const modalData = {
    title: 'DStep01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  // 업체 상세 조회
  const [companyInfo, setCompanyInfo] = useState({});
  const receiptDetail = () => {
    fetchService('/receipt/detail', 'post', {
      일련번호: journal?.accountCode,
    }).then((res) => {
      res?.data && setCompanyInfo(res.data[0]);
      res.data && setJournal({
        ...journal,
        companyInfo: res.data[0],
        no: no,
      })
    })
  };

  ///////////////////////////////////////////////////////////
  const [isLoading, setLoading] = useState(false);
  const [sites, setSites] = useState([]);

  const fetchList = (list) => {
    fetchService('/receipt/selectdata', 'post', journal?.accountCode)
      .then((res) => {
        const data = [];
        setSites(data);
      });
  };

  useEffect(() => {
    fetchList(sites);
  },[])
  ////////////////////////////////////////////////////////////////

  // 장비검색
  const [equipList, setEquipList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  console.log(companyInfo)
  const getEquipList = () => {
    fetchService('/enroll/equipList', 'post', {
      searchword: searchKeyword,
      pageSize: 500,
      currentPage: 1,
      거래처코드: companyInfo.거래처코드,
      // 거래처코드: "10957",
      현장코드: companyInfo.현장코드,
      // 현장코드: "2"
    }).then((res) => {
      setEquipList(res?.data)
    })
  };

  // 장비정보 검색 클릭 이벤트
  const [equipActive, setEquipActive] = useState();
  const handleSubmit = () => {
    getEquipList();
    searchKeyword.length > 0 ? setSearchStatus(true) : setSearchStatus(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchKeyword.length > 0 ? setSearchStatus(true) : setSearchStatus(false);
      getEquipList();
    }
  };
  const handleClick = (i, data) => {
    setEquipActive(i);
    setJournal({
      ...journal,
      step01: data
    })
    setSearchKeyword("");
    setSearchStatus(false);
  };

  // 검색리스트 타겟
  const searchListRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchListRef.current && !searchListRef.current.contains(event.target)) {
        setSearchStatus(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 진입시 불러오기
  useEffect(() => {
    receiptDetail();
  }, []);

  const handleRadioChange = (k, v) => {
    setJournal({
      ...journal,
      step01: {
        ...journal.step01,
        [k]: v
      }
    })
  };
  
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
        {/*<dl className="input-info">
          <dt className="essential">일지번호</dt>
          <dd>
            <input type="text" className="bg" />
          </dd>
        </dl>*/}
        <dl className="input-info">
          <dt className="essential">장비정보</dt>
          <dd ref={searchListRef}>
            <label>
              <input type="text" placeholder="해당업체 장비를 검색하세요." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} onKeyDown={handleKeyDown} />
              <button type="button" onClick={handleSubmit}>
                <img src="../icons/search-icon.png" alt="검색 아이콘" />
                <span>장비검색</span>
              </button>
            </label>
            {
              equipList?.length > 0 && searchStatus && (
                <div className="search-list">
                  <ul>
                    <li className="hd">
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
                      equipList.map((item, index) => {
                        return (
                          <li
                            className={index === equipActive ? "list-bd on" :" list-bd"}
                            key={index}
                            onClick={() => handleClick(index, item)}
                          >
                            <div className="model-no">
                              {item.모델}
                            </div>
                            <div className="dkno">
                              {item.DKNO}
                            </div>
                            <div className="mcno">
                              {item.MCNO}
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              )
            }
          </dd>
        </dl>
        <div className="product-info">
          <dl>
            <dt>MODEL-NO</dt>
            <dd>{journal.step01?.모델}</dd>
          </dl>
          <dl>
            <dt>수조</dt>
            <dd>
              <label htmlFor="existence01">
                <input
                  type="radio"
                  name="radio-box01"
                  id="existence01"
                  value={"Y"}
                  onChange={(e) => {
                    handleRadioChange('수조', e.target.value)
                  }}
                />
                <span>유</span>
              </label>
              <label htmlFor="nonexistence01">
                <input
                  type="radio"
                  name="radio-box01"
                  id="nonexistence01"
                  value={"N"}
                  onChange={(e) => {
                    handleRadioChange('수조', e.target.value)
                  }}
                />
                <span>무</span>
              </label>
            </dd>
          </dl>
          <dl>
            <dt>박스</dt>
            <dd>
              <label htmlFor="existence02">
                <input
                  type="radio"
                  name="radio-box02"
                  id="existence02"
                  value={"Y"}
                  onChange={(e) => {
                    handleRadioChange('박스', e.target.value)
                  }}
                />
                <span>유</span>
              </label>
              <label htmlFor="nonexistence02">
                <input
                  type="radio"
                  name="radio-box02"
                  id="nonexistence02"
                  value={"N"}
                  onChange={(e) => {
                    handleRadioChange('박스', e.target.value)
                  }}
                />
                <span>무</span>
              </label>
            </dd>
          </dl>
          <dl>
            <dt>MFG-NO</dt>
            <dd>{journal.step01?.DKNO}</dd>
          </dl>
          <dl>
            <dt>사용전압</dt>
            <dd>{journal.step01?.전압}</dd>
          </dl>
          <dl>
            <dt>설치방향</dt>
            <dd>
              {/* {journal.step01?.방향} */}
              {/* {journal?.accountCode} */}
              {sites.담당자}
              </dd>
          </dl>
          <dl>
            <dt>침전제</dt>
            <dd>
              <label htmlFor="existence03">
                <input
                  type="radio"
                  name="radio-box03"
                  id="existence03"
                  value={"자사"}
                  onChange={(e) => {
                    handleRadioChange('침전제', e.target.value)
                  }}
                />
                <span>자사</span>
              </label>
              <label htmlFor="nonexistence03">
                <input
                  type="radio"
                  name="radio-box03"
                  id="nonexistence03"
                  value={"타사"}
                  onChange={(e) => {
                    handleRadioChange('침전제', e.target.value)
                  }}
                />
                <span>타사</span>
              </label>
            </dd>
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
