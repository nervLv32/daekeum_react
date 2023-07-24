import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import RPCase0101Modal from '../../base-components/modal-components/report/documentModal/Case01/RPCase0101Modal';
import RPCase0201Modal from '../../base-components/modal-components/report/documentModal/Case02/RPCase0201Modal';
import RPCase0301Modal from '../../base-components/modal-components/report/documentModal/Case03/RPCase0301Modal';
import RPCase0401Modal from '../../base-components/modal-components/report/documentModal/Case04/RPCase0401Modal';
import RPCase0501Modal from '../../base-components/modal-components/report/documentModal/Case05/RPCase0501Modal';
import TopSearch from '../../components/molecules/TopSearch';
import TopSearchMenu from '../../components/molecules/TopSearchMenu';
import ReportMainTable from '../../components/report/ReportMainTable';
import ReportMainTableTop from '../../components/report/ReportMainTableTop';
import {useModal} from '../../hooks/useModal';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil'
import fetchService from '../../util/fetchService';
import {exportDocumentBody, firstExportDocument, reportAtom, reportParamAtom} from '../../recoil/reportAtom'
import userAtom from '../../recoil/userAtom'

const ReportWrap = styled.div`
  padding: 28px 30px 0;
`;

const TopSearchcMenuWrap = styled.ul`
  width: 260px;
  height: 283px;
  background: url('../images/topmenu-search-fivebg.png') no-repeat 50% center;
  padding: 47px 30px 0px;
`;


const Report = () => {
  const [topMenu, setTopMenu] = useState(false);
  const {openModal} = useModal();
  const modalData = {
    title: 'RPCase Modal',
    callback: () => alert('Modal Callback()'),
  };

  const observeTargetRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [reports, setReports] = useRecoilState(reportAtom);
  const {auth} = useRecoilValue(userAtom)
  const [params, setParams] = useState({
    searchword: '',
    currentPage: '1',
    pageSize: '10',
    작성자: auth.한글이름,
  },);
  const setBody = useSetRecoilState(exportDocumentBody)
  const resetBody = useResetRecoilState(exportDocumentBody)
  const [firstDocument, setFirstDocument] = useRecoilState(firstExportDocument)
  const resetFirstDocument = useResetRecoilState(firstExportDocument)

  const changeParam = (key, value) => {
    setParams({
      ...params,
      currentPage: '1',
      [key] : value
    })
  };

  const fetchList = (list) => {

    fetchService('/approval/approvalDocList', 'post', params)
      .then((res) => {
        const data = [...list, ...res.data];
        setReports(data);
        if (res.data.length > 9) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
  };

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true);
      setParams({
        ...params,
        currentPage: parseInt(params.currentPage) + 1,
      });
      fetchList(reports);
    }
  });

  useEffect(() => {
    setReports([]);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchList([]);
  }, [params.searchword, params.작성자]);

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect();
    return () => onIntersect.disconnect();
  }, [isLoading]);


  return <>
    <TopSearch setTopMenu={setTopMenu} topMenu={topMenu} changeParam={changeParam}/>
    {
      topMenu && (
        <TopSearchMenu>
          <TopSearchcMenuWrap>
            <li>
              <a onClick={() =>{
                resetBody()
                resetFirstDocument()
                setBody(prev => {return {...prev, 신규사업여부:false}})
                openModal({...modalData, content: <RPCase0101Modal/>})
              }}>
                <i>
                  <img src='../icons/icon-topmenu-outbox.png' alt='topmenu icon'/>
                </i>
                <span>출고요청서(세륜,축중)</span>
              </a>
            </li>
            <li>
              <a onClick={() =>{
                resetBody()
                resetFirstDocument()
                setBody(prev => {return {...prev, 신규사업여부:true}})
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
                setFirstDocument({
                  ...firstDocument,
                  title: '입고요청서'
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
                setFirstDocument({
                  ...firstDocument,
                  title: '수리기입고요청서'
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
                setFirstDocument({
                  ...firstDocument,
                  title: '수리기출고요청서'
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
    <ReportWrap>
      <ReportMainTableTop/>
      {
        reports.map((list, idx) => {
          return <ReportMainTable key={idx} list={list}/>;
        })
      }
      <div ref={observeTargetRef}/>
    </ReportWrap>
  </>;
};

export default Report;
