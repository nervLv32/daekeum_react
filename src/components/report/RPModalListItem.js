import React, { useState } from "react";
import styled from "styled-components";

const RPModalListItemWrap = styled.div`  `

const ListItemTop = styled.div`
  display: flex;
  align-items: center;
  background-color: #F6F6F6;
  padding: 10px;
  color: #1c1b1f;
  font-family: var(--font-mont);
  font-weight: 400;
  font-size: 12px;
  border-radius: 10px;
  margin-top: 9px;
  z-index: 2;
  position: relative;
  cursor: pointer;
  &.active {
    background-color: #FFEAE2;
  }
  > div {
    text-align: center;
    word-break: keep-all;
    &:not(:last-child) {
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 1px;
        height: 11px;
        background-color: #9da2ae;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
  &.type01 {
    .dep1, .dep3 {
      width: 33.333%;
    }
    .dep1 {
      word-break: keep-all;
    }
    .dep2 {
      width: calc(33.333% * 0.7);
    }
    .icon {
      width: calc(33.333% * 0.3);
    }
  }
  &.type02 {
    .dep1, .dep2 {
      width: 33.333%;
    }
    .dep1 {
      word-break: keep-all;
    }
    .dep3 {
      width: calc(33.333% * 0.7);
    }
    .icon {
      width: calc(33.333% * 0.3);
    }
  }
  &.type03, &.type04 {
    .dep2, .dep3, .dep4 {
      width: calc(50% / 3)
    }
    .dep1 {
      width: 10%;
    }
    .dep5 {
      width: 17%;
    }
    .dep6 {
      width: 13%;
    }
    .icon {
      width: 10%;
    }
  }
`
const ListItemBody = styled.div`
  padding: 20px 20px 10px;
  background-color: #EBECEF;
  position: relative;
  top: -10px;
  margin-bottom: -10px;
  z-index: 1;
  border-radius: 0 0 10px 10px;
  &.active {
    background-color: #FEF1EC;
  }
  &.type03 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  > div {
    display: flex;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: 6px;
    }
    dl {
      display: flex;
      align-items: center;
      color: #1c1b1f;
      font-size: 11px;
      &:not(:first-child) {
        margin-left: 10px;
      }
      dt {
        margin-right: 6px;
        font-weight: 500;
      }
      dd {
        font-weight: 400;
      }
    }
  }
`

const RPModalListItem = ({ item, type }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return <RPModalListItemWrap >
    {
      // 출고서류상신 1번케이스
      type === "type01" && (
        <ListItemTop className={`${isSelected ? 'active type01' : 'type01'}`} onClick={() => setIsSelected(prev => !prev)}>
          <div className="dep1">{item.company}</div>
          <div className="dep2">{item.ceo}</div>
          <div className="dep3">{item.companyNum}</div>
          <div className="icon" onClick={(e) => {
            e.stopPropagation();
            setIsOpen(prev => !prev);
          }}><img src="../icons/icon-rpmodal-grey-view.png" alt="view icon" /></div>
        </ListItemTop>
      )
    }
    {
      // 출고서류상신 2번케이스
      type === "type02" && (
        <ListItemTop className={`${isSelected ? 'active type02' : 'type02'}`} onClick={() => setIsSelected(prev => !prev)}>
          <div className="dep1">{item.site}</div>
          <div className="dep2">{item.regionFirst}-{item.regionLast}</div>
          <div className="dep3">{item.center}</div>
          <div className="icon" onClick={(e) => {
            e.stopPropagation();
            setIsOpen(prev => !prev);
          }}><img src="../icons/icon-rpmodal-grey-view.png" alt="view icon" /></div>
        </ListItemTop>
      )
    }
    {
      // 입고서류상신 3번케이스
      type === "type03" && (
        <ListItemTop className={`${isSelected ? 'active type03' : 'type03'}`} onClick={() => setIsSelected(prev => !prev)}>
          <div className="dep1">{item.division}</div>
          <div className="dep2">{item.dkno}</div>
          <div className="dep3">{item.mcno}</div>
          <div className="dep4">{item.model}</div>
          <div className="dep5">{item.operation}</div>
          <div className="dep6">{item.mif}</div>
          <div className="icon" onClick={(e) => {
            e.stopPropagation();
            setIsOpen(prev => !prev);
          }}><img src="../icons/icon-rpmodal-grey-view.png" alt="view icon" /></div>
        </ListItemTop>
      )
    }
    {
      // 입고서류상신 4번 / 5번케이스
      type === "type04" && (
        <ListItemTop className={`${isSelected ? 'active type04' : 'type04'}`} onClick={() => setIsSelected(prev => !prev)}>
          <div className="dep1">{item.division}</div>
          <div className="dep2">{item.dkno}</div>
          <div className="dep3">{item.mcno}</div>
          <div className="dep4">{item.model}</div>
          <div className="dep5">{item.bolt}</div>
          <div className="dep6">{item.direction}</div>
          <div className="icon" onClick={(e) => {
            e.stopPropagation();
            setIsOpen(prev => !prev);
          }}><img src="../icons/icon-rpmodal-grey-view.png" alt="view icon" /></div>
        </ListItemTop>
      )
    }

    {
      isOpen && (
        <ListItemBody className={`${isSelected ? 'active' : ''} ${type === "type03" ? "type03" : ''}`}>
          {/* 출고서류상신 1번 */}
          {
            type === "type01" && (
              <>
                <div>
                  <dl>
                    <dt>업태</dt>
                    <dd>{item.sector}</dd>
                  </dl>
                  <dl>
                    <dt>종목</dt>
                    <dd>{item.category}</dd>
                  </dl>
                </div>
                <div>
                  <dl>
                    <dt>주소</dt>
                    <dd>{item.address}</dd>
                  </dl>
                </div>
                <div>
                  <dl>
                    <dt>담당자</dt>
                    <dd>{item.manager}</dd>
                  </dl>
                  <dl>
                    <dt>휴대폰번호</dt>
                    <dd>{item.managerPhone}</dd>
                  </dl>
                </div>
              </>
            )
          }
          {/* 출고서류상신 2번 */}
          {
            type === "type02" && (
              <>
                <div>
                  <dl>
                    <dt>주소</dt>
                    <dd>{item.siteAddress}</dd>
                  </dl>
                </div>
                <div>
                  <dl>
                    <dt>담당자</dt>
                    <dd>{item.manager}</dd>
                  </dl>
                  <dl>
                    <dt>연락처</dt>
                    <dd>{item.managerPhone}</dd>
                  </dl>
                </div>
                <div>
                  <dl>
                    <dt>이메일</dt>
                    <dd>{item.managerEmail}</dd>
                  </dl>
                </div>
              </>
            )
          }
          {/* 입고서류상신 3번 */}
          {
            type === "type03" && (
              <>
                <div>
                  <dl>
                    <dt>시작일</dt>
                    <dd>{item.startDate}</dd>
                  </dl>
                  <dl>
                    <dt>종료일</dt>
                    <dd>{item.endDate}</dd>
                  </dl>
                </div>
                <div>
                  <dl>
                    <dt>초기개월</dt>
                    <dd>{item.defaultMonth}</dd>
                  </dl>
                  <dl>
                    <dt>변경개월</dt>
                    <dd>{item.changeMonth}</dd>
                  </dl>
                  <dl>
                    <dt>임대료</dt>
                    <dd>{item.price}</dd>
                  </dl>
                </div>
              </>
            )
          }
          {/* 수리기서류 4,5번 케이스 */}
          {
            type === "type04" && (
              <>
                <div>
                  <dl>
                    <dt>현장명</dt>
                    <dd>{item.site}</dd>
                  </dl>
                </div>
              </>
            )
          }
        </ListItemBody>
      )
    }

  </RPModalListItemWrap>
}

export default RPModalListItem;