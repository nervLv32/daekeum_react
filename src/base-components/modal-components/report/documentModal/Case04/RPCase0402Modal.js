import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components";
import RPModalBody from "../../../../../components/report/RPModalBody";
import RPModalBottom from "../../../../../components/report/RPModalListBottom";
import RPModalListItem from "../../../../../components/report/RPModalListItem";
import RPModalListTop from "../../../../../components/report/RPModalListTop";
import RPModalSearch from "../../../../../components/report/RPModalSearch";
import RPModalTop from "../../../../../components/report/RPModalTop";
import { useModal } from "../../../../../hooks/useModal";

import fetchService from '../../../../../util/fetchService';
import {useRecoilState} from 'recoil';
import {firstExportDocument} from '../../../../../recoil/reportAtom';
import RPCase0403Modal from './RPCase0403Modal'
import RPCase0401Modal from './RPCase0401Modal'


const RPCase0302ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`

const RPCase0302Modal = () => {

  const { openModal, closeModal } = useModal();
  const [firstExport, setFirstExport] = useRecoilState(firstExportDocument)

  const modalData = {
    title: 'RPDoc Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  const observeTargetRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [sites, setSites] = useState([]);
  const [params, setParams] = useState({
    searchword: '',
    currentPage: '1',
    pageSize: '10',
    거래처코드 : firstExport.client.거래처코드
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
        setSites(data);
        if (res.data.length > 9) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
  };

  useEffect(() => {
    if(parseInt(params.currentPage) > 1) {
      fetchList(sites);
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

  /******* 입출고 서류상신 - 입고요청서 case 03의 두 번째 스텝 *******/
  return <RPCase0302ModalWrap>
    <RPModalTop title={firstExport.title} />
    <RPModalSearch dep1="업체명" dep2="현장명" dep3="장비정보" changeParam={changeParam} />
    <RPModalBody>
      <RPModalListTop type="type02" dep1="현장명" dep2="지역분류" dep3="담당센터" />
      {
        sites?.length > 0 && sites.map((item, idx) => {
          return <RPModalListItem item={item} key={idx} type="type02" />
        })
      }
      <div ref={observeTargetRef}/>
    </RPModalBody>
    <RPModalBottom>
      <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPCase0403Modal /> })
      }}>장비검색</button>
      <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPCase0401Modal />})
      }}>취소</button>
    </RPModalBottom>
  </RPCase0302ModalWrap>
}

export default RPCase0302Modal;
