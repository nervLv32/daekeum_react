import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components";
import RPModalBody from "../../../../../components/report/RPModalBody";
import RPModalBottom from "../../../../../components/report/RPModalListBottom";
import RPModalListItem from "../../../../../components/report/RPModalListItem";
import RPModalListTop from "../../../../../components/report/RPModalListTop";
import RPModalSearch from "../../../../../components/report/RPModalSearch";
import RPModalTop from "../../../../../components/report/RPModalTop";
import { useModal } from "../../../../../hooks/useModal";

import RPCase0302Modal from "./RPCase0302Modal";
import RPC03Step01Modal from "../../stepModal/Case03/RPC03Step01Modal";

import fetchService from '../../../../../util/fetchService';
import {useRecoilState} from 'recoil';
import {firstExportDocument} from '../../../../../recoil/reportAtom';


const RPCase0303ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`

const RPCase0303Modal = () => {

  const { openModal, closeModal } = useModal();
  const [firstExport, setFirstExport] = useRecoilState(firstExportDocument)

  const modalData = {
    title: 'RPDoc Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  const observeTargetRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [equip, setEquip] = useState([]);
  const [params, setParams] = useState({
    searchword: '',
    pageSize: '10',
    currentPage: '1',
    거래처코드 : firstExport.client.거래처코드,
    현장코드: firstExport.site.현장코드
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
    fetchService('/approval/equiplist', 'post', params)
      .then((res) => {
        const data = [...list, ...res.data];
        setEquip(data);
        if (res.data.length > 9) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
  };

  useEffect(() => {
    if(parseInt(params.currentPage) > 1) {
      fetchList(equip);
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

  /******* 입출고 서류상신 - 입고요청서 case 03의 세 번째 스텝 *******/
  return <RPCase0303ModalWrap>
    <RPModalTop title="입고서류상신" />
    <RPModalSearch dep1="업체명" dep2="현장명" dep3="장비정보" changeParam={changeParam} />
    <RPModalBody>
      <RPModalListTop type="type03" dep1="구분" dep2="DKNO" dep3="MCNO" dep4="기종" dep5="가동구분" dep6="MIF" />
      {
        equip?.length > 0 && equip.map((item, idx) => {
          return <RPModalListItem item={item} key={idx} type="type03" />
        })
      }
      <div ref={observeTargetRef}/>
    </RPModalBody>
    <RPModalBottom>
      <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPC03Step01Modal /> })
      }}>확인</button>
      <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPCase0302Modal />})
      }}>취소</button>
    </RPModalBottom>
  </RPCase0303ModalWrap>
}

export default RPCase0303Modal;