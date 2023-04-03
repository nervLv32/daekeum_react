import React from "react"
import styled from "styled-components";
import { getOrderState } from "../../util/utils";

const OrderStateBtnComponent = styled.button`
  padding: 4px 8px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.ready {
    background-color: #5A55CA;
    i {
      background : url('../icons/receipt-ready-icon.png') no-repeat 50% center / cover;
    }
  }
  &.add {
    background-color: #EA583F;
    i {
      background : url('../icons/receipt-add-icon.png') no-repeat 50% center / cover;
    }
  }
  &.done {
    background-color: #0CA35A;
    i {
      background : url('../icons/receipt-done-icon.png') no-repeat 50% center / cover;
    }
  }
  i {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
  span {
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 700;
  }
`

const OrderStateBtn = ({ state }) => {
  return <OrderStateBtnComponent className={getOrderState(state)}>
    <i></i>
    <span>{state}</span>
  </OrderStateBtnComponent>
}

export default OrderStateBtn;