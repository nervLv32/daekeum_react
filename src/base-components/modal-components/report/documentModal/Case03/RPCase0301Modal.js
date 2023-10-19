import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components";
import RPModalBody from "../../../../../components/report/RPModalBody";
import RPModalBottom from "../../../../../components/report/RPModalListBottom";
import RPModalListItem from "../../../../../components/report/RPModalListItem";
import RPModalListTop from "../../../../../components/report/RPModalListTop";
import RPModalSearch from "../../../../../components/report/RPModalSearch";
import RPModalTop from "../../../../../components/report/RPModalTop";
import { useModal } from "../../../../../hooks/useModal";
import fetchService from '../../../../../util/fetchService';
import {useRecoilState, useRecoilValue} from 'recoil';
import {firstExportDocument, reportAtom, reportParamAtom} from '../../../../../recoil/reportAtom';

import RPCase0302Modal from "./RPCase0302Modal";


const RPCase0301ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`

const RPCase0301Modal = () => {
  const { openModal, closeModal } = useModal();
  const firstExport = useRecoilValue(firstExportDocument)

  const modalData = {
    title: 'RPCase0302Modal',
    callback: () => alert('Modal Callback()'),
  };

  const observeTargetRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  
  const [params, setParams] = useState({
    searchword: '',
    currentPage: '1',
    pageSize: '10',
  });

  const changeParam = (key, value) => {
    setParams({
      ...params,
      currentPage: '1',
      [key] : value
    })
  };

  const onIntersect = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setLoading(true);
      setParams({
        ...params,
        currentPage: parseInt(params.currentPage) + 1,
      });
    }
  });

  const fetchList = (list) => {
    fetchService('/approval/clientList', 'post', params)
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

  useEffect(() => {
    if(parseInt(params.currentPage) > 1) {
      fetchList(reports);
    }
  }, [params.currentPage])

  useEffect(() => {
    fetchList([]);
    setLoading(true)
  }, [params.searchword])

  useEffect(() => {
    !isLoading ? onIntersect.observe(observeTargetRef.current) : onIntersect.disconnect();
    return () => onIntersect.disconnect();
  }, [isLoading])

  /******* 입출고 서류상신 - 입고요청서 case 03의 첫 번째 스텝 *******/
  return <RPCase0301ModalWrap>
    <RPModalTop title={firstExport.title} />
    {/*<RPModalSearch dep1="업체명" dep2="현장명" dep3="장비정보" changeParam={changeParam}/>*/}
    <RPModalSearch dep1={firstExport.client.업체명} dep2={firstExport.site.현장명} dep3={null} changeParam={changeParam}/>
    <RPModalBody>
      <RPModalListTop type="type01" dep1="업체명" dep2="대표자" dep3="사업자번호" />
      {
        reports?.length > 0 && reports.map((item, idx) => {
          return <RPModalListItem item={item} key={idx} type="type01"/>
        })
      }
      <div ref={observeTargetRef}/>
    </RPModalBody>
    <RPModalBottom>
      <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPCase0302Modal />})
      }}>현장검색</button>
      <button className="del-btn" onClick={closeModal}>취소</button>
    </RPModalBottom>
  </RPCase0301ModalWrap>
}

export default RPCase0301Modal;
