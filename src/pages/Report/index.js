import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import RPCase0101Modal from '../../base-components/modal-components/report/documentModal/Case01/RPCase0101Modal'
import RPCase0301Modal from '../../base-components/modal-components/report/documentModal/Case03/RPCase0301Modal'
import RPCase0401Modal from '../../base-components/modal-components/report/documentModal/Case04/RPCase0401Modal'
import TopSearch from '../../components/molecules/TopSearch'
import TopSearchMenu from '../../components/molecules/TopSearchMenu'
import ReportMainTable from '../../components/report/ReportMainTable'
import ReportMainTableTop from '../../components/report/ReportMainTableTop'
import {useModal} from '../../hooks/useModal'
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil'
import fetchService from '../../util/fetchService'
import {exportDocumentBody, firstExportDocument, reportAtom} from '../../recoil/reportAtom'
import userAtom from '../../recoil/userAtom'

const ReportWrap = styled.div`
  padding: 28px 30px 0;
`

const TopSearchcMenuWrap = styled.ul`
  width: 260px;
  height: 283px;
  background: url('../images/topmenu-search-fivebg.png') no-repeat 50% center;
  padding: 47px 30px 0px;
`

const ToWrap = styled.div`
  background: red;
  //width: 100px;
  height: 100px;
  position: relative;
`

const RestWrap = styled.div`
  display: flex;
  flex: 1;
`

const Button = styled.div`
    width : 43px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0C1D87;
    border: 1px solid rgba(238, 241, 255, 0.4);
    border-radius: 15px;
    cursor: pointer;
    margin-left: 7px;
    z-index: 10;
    position: absolute;
  top: 0;
    right: 27px;
`

const initDocu = {
  title: '',
  client: {
    업체명: '업체명',
    거래처코드: '',
  },
  site: {
    현장명: '현장명',
    현장코드: '',
  },
  equip: [],
}

const Report = () => {
  const [topMenu, setTopMenu] = useState(false)
  const {openModal} = useModal()
  const modalData = {
    title: 'RPCase Modal',
    callback: () => alert('Modal Callback()'),
  }
  const ref = useRef(null)
  const observeTargetRef = useRef(null)
  const [isLoading, setLoading] = useState(false)
  const [reports, setReports] = useRecoilState(reportAtom)
  const {auth} = useRecoilValue(userAtom)
  const [params, setParams] = useState({
    searchword: '',
    currentPage: '1',
    pageSize: '10',
    작성자: auth.한글이름,
  })
  const setBody = useSetRecoilState(exportDocumentBody)
  const resetBody = useResetRecoilState(exportDocumentBody)
  const [firstDocument, setFirstDocument] = useRecoilState(firstExportDocument)
  const resetFirstDocument = useResetRecoilState(firstExportDocument)

  const changeParam = (key, value) => {
    setParams({
      ...params,
      currentPage: '1',
      [key]: value,
    })
  }

  const fetchList = (list) => {

    fetchService('/approval/approvalDocList', 'post', params)
      .then((res) => {
        const data = [...list, ...res.data]
        setReports(data)
        if (res.data.length > 9) {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
  }

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true)
      setParams({
        ...params,
        currentPage: parseInt(params.currentPage) + 1,
      })
      fetchList(reports)
    }
  })

  useEffect(() => {
    setReports([])
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchList([])
  }, [params.searchword])

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect()
    return () => onIntersect.disconnect()
  }, [isLoading])

  const useClickOutsideTop = (target) => {
    useEffect(() => {
      const onDocumentClick = (event) => {
        const isInside = event.composedPath().includes(target.current)
        if (!isInside) {
          setTopMenu(false)
        }
      };
      document.addEventListener('click', onDocumentClick);
      return () => {
        document.removeEventListener('click', onDocumentClick);
      };
    }, [target]);
  };

  useClickOutsideTop(ref);

  return <>
    <RestWrap>
    <TopSearch
        setTopMenu={setTopMenu}
        topMenu={topMenu}
        changeParam={changeParam}
    />
      <ToWrap ref={ref}>
        <Button
            className="submit-btn"
            onClick={() => setTopMenu(prev => !prev)}
        >
          {
            topMenu ? (
                <i>
                  <img src="../../icons/topmenu-close-x.png" alt="widget icon" />
                </i>
            ) : (
                <i>
                  <img src="../../icons/widgets-icon.png" alt="widget icon" />
                </i>
            )
          }
        </Button>
    {
      topMenu && (
        <TopSearchMenu>
          <TopSearchcMenuWrap>
            <li>
              <a onClick={() => {
                resetBody()
                resetFirstDocument()
                setBody(prev => {
                  return {...prev, 신규사업여부: false}
                })
                openModal({...modalData, content: <RPCase0101Modal/>})
              }}>
                <i>
                  <img src='../icons/icon-topmenu-outbox.png' alt='topmenu icon'/>
                </i>
                <span>출고요청서(세륜,축중)</span>
              </a>
            </li>
            <li>
              <a onClick={() => {
                resetBody()
                resetFirstDocument()
                setBody(prev => {
                  return {...prev, 신규사업여부: true}
                })
                openModal({...modalData, content: <RPCase0101Modal/>})
              }}>
                <i>
                  <img src='../icons/icon-topmenu-outbox.png' alt='topmenu icon'/>
                </i>
                <span>출고요청서(신사업)</span>
              </a>
            </li>
            <li>
              <a onClick={() => {
                resetBody()
                setFirstDocument({
                  ...initDocu,
                  title: '입고요청서',
                })
                openModal({...modalData, content: <RPCase0301Modal/>})
              }}>
                <i>
                  <img src='../icons/icon-topmenu-inbox.png' alt='topmenu icon'/>
                </i>
                <span>입고요청서</span>
              </a>
            </li>
            <li>
              <a onClick={() => {
                resetBody()
                setFirstDocument({
                  ...initDocu,
                  title: '수리기입고요청서',
                })
                openModal({...modalData, content: <RPCase0401Modal/>})
              }}>
                <i>
                  <img src='../icons/icon-topmenu-microwave.png' alt='topmenu icon'/>
                </i>
                <span>수리기입고요청서</span>
              </a>
            </li>
            <li>
              <a onClick={() => {
                resetBody()
                resetFirstDocument()
                setFirstDocument({
                  ...initDocu,
                  title: '수리기출고요청서',
                })
                openModal({...modalData, content: <RPCase0401Modal/>})
              }}>
                <i>
                  <img src='../icons/icon-topmenu-microwave.png' alt='topmenu icon'/>
                </i>
                <span>수리기출고요청서</span>
              </a>
            </li>
          </TopSearchcMenuWrap>
        </TopSearchMenu>
      )
    }
      </ToWrap>
    </RestWrap>
    <ReportWrap>
      <ReportMainTableTop/>
      {
        reports.map((list, idx) => {
          return <ReportMainTable key={idx} list={list}/>
        })
      }
      <div ref={observeTargetRef}/>
    </ReportWrap>
  </>
}

export default Report
