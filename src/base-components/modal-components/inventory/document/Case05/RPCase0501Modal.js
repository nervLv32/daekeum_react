import React, { useState } from "react"
import styled from "styled-components";
import RPModalBody from "../../../../../components/report/RPModalBody";
import RPModalBottom from "../../../../../components/report/RPModalListBottom";
import RPModalListItem from "../../../../../components/report/RPModalListItem";
import RPModalListTop from "../../../../../components/report/RPModalListTop";
import RPModalSearch from "../../../../../components/report/RPModalSearch";
import RPModalTop from "../../../../../components/report/RPModalTop";
import { useModal } from "../../../../../hooks/useModal";

import RPCase0502Modal from "./RPCase0502Modal";


const RPCase0501ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`

const RPCase0501Modal = () => {
  const { openModal, closeModal } = useModal();

  const dummyData = [
    {
      company: "(주)대금지오웰",
      ceo: "이승우",
      companyNum: "131-81-19404",
      sector: "제조업",
      category: "산업기계외",
      address: "인천광역시 미추홀구 장고개로92번길38(도화동)",
      manager: "정명길",
      managerPhone: "010-1234-5678"
    },
    {
      company: "(주)대금지오웰",
      ceo: "이승우",
      companyNum: "131-81-19404",
      sector: "제조업",
      category: "산업기계외",
      address: "인천광역시 미추홀구 장고개로92번길38(도화동)",
      manager: "정명길",
      managerPhone: "010-1234-5678"
    },
    {
      company: "(주)대금지오웰",
      ceo: "이승우",
      companyNum: "131-81-19404",
      sector: "제조업",
      category: "산업기계외",
      address: "인천광역시 미추홀구 장고개로92번길38(도화동)",
      manager: "정명길",
      managerPhone: "010-1234-5678"
    },
    {
      company: "(주)대금지오웰",
      ceo: "이승우",
      companyNum: "131-81-19404",
      sector: "제조업",
      category: "산업기계외",
      address: "인천광역시 미추홀구 장고개로92번길38(도화동)",
      manager: "정명길",
      managerPhone: "010-1234-5678"
    },
    {
      company: "(주)대금지오웰",
      ceo: "이승우",
      companyNum: "131-81-19404",
      sector: "제조업",
      category: "산업기계외",
      address: "인천광역시 미추홀구 장고개로92번길38(도화동)",
      manager: "정명길",
      managerPhone: "010-1234-5678"
    },
  ]

  const modalData = {
    title: 'RPCase0402Modal',
    callback: () => alert('Modal Callback()'),
  };

  /******* 입출고 서류상신 - 수리기출고요청서 case 05의 첫 번째 스텝 *******/
  return <RPCase0501ModalWrap>
    <RPModalTop title="수리기서류상신" />
    <RPModalSearch dep1="업체명" dep2="현장명" dep3="장비정보" />
    <RPModalBody>
      <RPModalListTop type="type01" dep1="업체명" dep2="대표자" dep3="사업자번호" />
      {
        dummyData.map((item, idx) => {
          return <RPModalListItem item={item} key={idx} type="type01"/>
        })
      }
    </RPModalBody>
    <RPModalBottom>
      <button className="primary-btn" onClick={() => {
        closeModal()
        openModal({ ...modalData, content: <RPCase0502Modal />})
      }}>수리기검색</button>
      <button className="del-btn" onClick={closeModal}>취소</button>
    </RPModalBottom>
  </RPCase0501ModalWrap>
}

export default RPCase0501Modal;