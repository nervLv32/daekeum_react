import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components";
import RPModalBody from "../../../../../components/report/RPModalBody";
import RPModalBottom from "../../../../../components/report/RPModalListBottom";
import RPModalListItem from "../../../../../components/report/RPModalListItem";
import RPModalListTop from "../../../../../components/report/RPModalListTop";
import RPModalSearch from "../../../../../components/report/RPModalSearch";
import RPModalTop from "../../../../../components/report/RPModalTop";
import { useModal } from "../../../../../hooks/useModal";
import RPStep01Modal from "../../stepModal/Case01/RPC01Step01Modal";

import RPCase0101Modal from "./RPCase0101Modal";
import RPC01Step01Modal from "../../stepModal/Case01/RPC01Step01Modal";
import fetchService from '../../../../../util/fetchService';


const RPCase0102ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`

const RPCase0102Modal = () => {

  const { openModal, closeModal } = useModal();

  const dummyData = [
    {
      site: "DMC리버시티 (A6블록)",
      regionFirst: "경기도",
      regionLast: "고양시",
      center: "수도권4",
      siteAddress: "경기도 고양시 덕양구 덕은동 427-1번지",
      manager: "정명길",
      managerPhone: "010-1234-5679",
      managerEmail: "jjsh2544@daekeum.co.kr"
    },
    {
      site: "DMC리버시티 (A6블록)",
      regionFirst: "경기도",
      regionLast: "고양시",
      center: "수도권4",
      siteAddress: "경기도 고양시 덕양구 덕은동 427-1번지",
      manager: "정명길",
      managerPhone: "010-1234-5679",
      managerEmail: "jjsh2544@daekeum.co.kr"
    },
    {
      site: "DMC리버시티 (A6블록)",
      regionFirst: "경기도",
      regionLast: "고양시",
      center: "수도권4",
      siteAddress: "경기도 고양시 덕양구 덕은동 427-1번지",
      manager: "정명길",
      managerPhone: "010-1234-5679",
      managerEmail: "jjsh2544@daekeum.co.kr"
    }
  ]

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  };


  const observeTargetRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [params, setParams] = useState({
    searchword: '',
    currentPage: '1',
    pageSize: '10',
    거래처코드 : ''
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
    fetchService('/approval/siteList', 'post', params)
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


  /******* 입출고 서류상신 - 출고요청서(세륜,축중) case 01의 두 번째 스텝 *******/
  return <RPCase0102ModalWrap>
    <RPModalTop title="출고서류상신" />
    <RPModalSearch dep1="업체명" dep2="현장명" dep3="장비정보" changeParam={changeParam}/>
    <RPModalBody>
      <RPModalListTop type="type02" dep1="현장명" dep2="지역분류" dep3="담당센터" />
      {
        dummyData.map((item, idx) => {
          return <RPModalListItem item={item} key={idx} type="type02" />
        })
      }
      <div ref={observeTargetRef}/>

    </RPModalBody>
    <RPModalBottom>
      <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC01Step01Modal /> })
      }}>확인</button>
      <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPCase0101Modal />})
      }}>취소</button>
    </RPModalBottom>
  </RPCase0102ModalWrap>
}

export default RPCase0102Modal;
