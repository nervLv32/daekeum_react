import React, { useState } from "react"
import styled from "styled-components";
import RPModalBody from "../../../../../components/report/RPModalBody";
import RPModalBottom from "../../../../../components/report/RPModalListBottom";
import RPModalListItem from "../../../../../components/report/RPModalListItem";
import RPModalListTop from "../../../../../components/report/RPModalListTop";
import RPModalSearch from "../../../../../components/report/RPModalSearch";
import RPModalTop from "../../../../../components/report/RPModalTop";
import { useModal } from "../../../../../hooks/useModal";

import RPCase0401Modal from "./RPCase0401Modal";


const RPCase0402ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`

const RPCase0402Modal = () => {

  const { openModal, closeModal } = useModal();

  const dummyData = [
    {
      division: "회수",
      dkno: "15222",
      mcno: "F003",
      model: "R10DN",
      bolt: "380",
      direction: "역방향",
      site: "광주순환고속도로 5공구"
    },
  ]

  const modalData = {
    title: 'RPDoc Modal Modal',
    callback: () => alert('Modal Callback()'),
  };

  /******* 입출고 서류상신 - 수리기입고요청서 04의 두 번째 스텝 *******/
  return <RPCase0402ModalWrap>
    <RPModalTop title="수리기서류상신" />
    <RPModalSearch dep1="업체명" dep2="현장명" dep3="장비정보" />
    <RPModalBody>
    <RPModalListTop type="type04" dep1="구분" dep2="DKNO" dep3="MCNO" dep4="기종" dep5="전압" dep6="방향" />
      {
        dummyData.map((item, idx) => {
          return <RPModalListItem item={item} key={idx} type="type04" />
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
        openModal({ ...modalData, content: <RPCase0401Modal />})
      }}>취소</button>
    </RPModalBottom>
  </RPCase0402ModalWrap>
}

export default RPCase0402Modal;