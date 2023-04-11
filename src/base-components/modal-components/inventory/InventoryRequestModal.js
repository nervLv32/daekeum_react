import React from "react";
import styled from "styled-components";
import { useModal } from "../../../hooks/useModal";

const InventoryRequestModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  
`

const InventoryRequestModal = () => {
  const { closeModal } = useModal();

  return <InventoryRequestModalWrap>
    hello
  </InventoryRequestModalWrap>
}

export default InventoryRequestModal;