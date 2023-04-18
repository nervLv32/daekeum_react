import React, { useState } from "react"
import styled from "styled-components";
import RPModalBody from "../../../../../components/report/RPModalBody";
import RPModalBottom from "../../../../../components/report/RPModalListBottom";
import RPModalListItem from "../../../../../components/report/RPModalListItem";
import RPModalListTop from "../../../../../components/report/RPModalListTop";
import RPModalSearch from "../../../../../components/report/RPModalSearch";
import RPModalTop from "../../../../../components/report/RPModalTop";
import { useModal } from "../../../../../hooks/useModal";

import RPCase0302Modal from "./RPCase0302Modal";


const RPCase0303ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`

const RPCase0303Modal = () => {

  const { openModal, closeModal } = useModal();

  const dummyData = [
    {
      division: "회수",
      dkno: "15222",
      mcno: "F003",
      model: "R10DN",
      operation: "회수 가동",
      mif: "MIF\n일치",
      startDate: "2023-01-01",
      endDate: "2023-02-09",
      defaultMonth: "30",
      changeMonth: "30",
      price: "14,000,000",
    },
    {
      division: "회수",
      dkno: "15222",
      mcno: "F003",
      model: "R10DN",
      operation: "회수 가동",
      mif: "MIF\n일치",
      startDate: "2023-01-01",
      endDate: "2023-02-09",
      defaultMonth: "30",
      changeMonth: "30",
      price: "14,000,000",
    },
  ]

  const modalData = {
    title: 'RPDoc Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  /******* 입출고 서류상신 - 입고요청서 case 03의 세 번째 스텝 *******/
  return <RPCase0303ModalWrap>
    <RPModalTop title="입고서류상신" />
    <RPModalSearch dep1="업체명" dep2="현장명" dep3="장비정보" />
    <RPModalBody>
      <RPModalListTop type="type03" dep1="구분" dep2="DKNO" dep3="MCNO" dep4="기종" dep5="가동구분" dep6="MIF" />
      {
        dummyData.map((item, idx) => {
          return <RPModalListItem item={item} key={idx} type="type03" />
        })
      }
    </RPModalBody>
    <RPModalBottom>
      <button className="primary-btn" onClick={() => {
        closeModal()
        // openModal({ ...modalData, content: <RPDoc01Modal /> })
      }}>확인</button>
      <button className="del-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPCase0302Modal />})
      }}>취소</button>
    </RPModalBottom>
  </RPCase0303ModalWrap>
}

export default RPCase0303Modal;