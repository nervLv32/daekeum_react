import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components";
import RPModalBody from "../../../../../components/report/RPModalBody";
import RPModalBottom from "../../../../../components/report/RPModalListBottom";
import RPModalListItem from "../../../../../components/report/RPModalListItem";
import RPModalListTop from "../../../../../components/report/RPModalListTop";
import RPModalSearch from "../../../../../components/report/RPModalSearch";
import RPModalTop from "../../../../../components/report/RPModalTop";
import { useModal } from "../../../../../hooks/useModal";

import RPCase0102Modal from "./RPCase0102Modal";
import {useRecoilState, useRecoilValue} from 'recoil';
import {firstExportDocument, reportAtom, reportParamAtom} from '../../../../../recoil/reportAtom';
import fetchService from '../../../../../util/fetchService';
import {aliasToReal} from 'lodash/fp/_mapping';

const RPCase0101ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`

const RPCase0101Modal = () => {
  const { openModal, closeModal } = useModal();
  const firstExport = useRecoilValue(firstExportDocument)

  const modalData = {
    title: 'RPCase0102Modal Modal',
    content: <RPCase0102Modal />,
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


  /******* 입출고 서류상신 - 출고요청서(세륜,축중) case 01의 첫 번째 스텝 *******/
  return <RPCase0101ModalWrap>
    <RPModalTop title="출고서류상신" />
    <RPModalSearch dep1={firstExport.client.업체명} dep2={firstExport.site.현장명} dep3={firstExport.equip.장비정보} changeParam={changeParam}/>
    <RPModalBody>
      <RPModalListTop type="type01" dep1="업체명" dep2="대표자" dep3="사업자번호" />
      {
        reports.map((item, idx) => {
          return <RPModalListItem item={item} key={idx} type="type01"/>
        })
      }
      <div ref={observeTargetRef}/>
    </RPModalBody>
    <RPModalBottom>
      <button className="primary-btn" onClick={() => {
        if(firstExport.client.거래처코드 !== '') {
          closeModal()
          openModal({ ...modalData, content: <RPCase0102Modal />})
        }else{
          alert('업체를 선택하여 주세요.')
        }
      }}>현장검색</button>
      <button className="del-btn" onClick={closeModal}>취소</button>
    </RPModalBottom>
  </RPCase0101ModalWrap>
}

export default RPCase0101Modal;
