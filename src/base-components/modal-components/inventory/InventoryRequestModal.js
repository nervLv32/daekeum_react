import React, {useState} from 'react'
import styled from 'styled-components'
import {useModal} from '../../../hooks/useModal'
import {Calendar} from '../../../assets/icon/Svg'
import {DateFormat} from '../../../util/dateFormat'

const InventoryRequestModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;

  .list-top {
    .title {
      padding: 15px 0;
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
      font-weight: 700;
      font-size: 16px;
      color: #1c1b1f;
    }
  }
`
const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    background-color: #F6F6F6;
    padding: 1rem .5rem .5rem;
    font-size: 1.3rem;
    &:last-child {
      padding: 0 .5rem 1rem;
    }

    span {
      display: flex;

      b {
        color: #1F319D;
        margin: 0 .5rem;
      }

      span {
        margin: 0 .5rem 0 1rem;
        color: #9DA2AE;
      }

      svg {
        fill: #555555;
        width: 1.5rem;
        height: 1.5rem;
        align-self: center;
        margin-left: .5rem;
      }
    }
  }
`
const ModalBody = styled.div``
const Section = styled.section`
  > div.title {
    background-color: #1F319D;
    color: white;
    text-align: center;
    line-height: 3.5rem;
    font-size: 1.5rem;
  }
`

const ModalBtm = styled.div`
  display: flex;
  flex-direction: row;
`
const Button = styled.button`
  flex: 1;
  margin: 2rem;
  border-radius: 1.5rem;
  background-color: #1F319D;
  padding: .5rem;
  color: #F6F6F6;
  font-size: 2rem;
  font-weight: bold;

  &.del {
    border: 1px solid #1F319D;
    background-color: white;
    color: #1F319D;
  }
`

const Choice = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 20px 10px;
  >div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #9DA2AE;
    padding: 10px;
    border-radius: 10px;
    align-items: center;
    &.noFill {
      background-color: transparent;
    }
    >div{
      button:first-child {
        border: 1px solid #000;
        padding: 3px 10px;
        border-radius: 5px;
        margin-right: 10px;
        background-color: white;
      }
      button{
        margin-right: 5px;
      }
    }
  }
`

const InventoryRequestModal = () => {
  const {closeModal} = useModal()
  const [body, setBody] = useState({
    입고요청일: DateFormat(new Date()),
    발송공장: '공장',
    요청자: '요청자',
  })

  const [list, setList] = useState({
    품목리스트: [{
      품목코드: 'TNUGM03002',
      파트: '감속기',
      품명: 'G/M(대금감속기)',
      재고: '1',
      비고: '규격 : 2T*Φ610(하단)*Φ205(상단)*410(H)    사용모델 R10D-06',
    },{
      품목코드: 'TNUGM03002',
      파트: '감속기',
      품명: 'G/M(대금감속기)',
      재고: '1',
      비고: '규격 : 2T*Φ610(하단)*Φ205(상단)*410(H)    사용모델 R10D-06',
    },],
    요청리스트: [],
  })

  //TODO - 이제 기능 붙혀보자

  return <InventoryRequestModalWrap>
    <div className='list-top'>
      <div className='title'>간편입력</div>
      <TitleWrap>
        <div>
          <span><b>입고요청일</b> {body.입고요청일.substr(0, 10) || ''} <Calendar/> </span>
        </div>
        <div>
          <span><b>발송공장</b> {body.발송공장 || ''} <span>|</span> <b>요청자</b> {body.요청자 || ''} </span>
        </div>
      </TitleWrap>
    </div>
    <ModalBody>
      <Section>
        <div className={'title'}> 품목리스트</div>
        <Table item={list.품목리스트}/>
        <div className={'title'}> 요청리스트</div>
        <Table item={list.품목리스트}/>
      </Section>
      <Choice>
        <div className={list.요청리스트.length <= 0 ? 'noFill' : ''}>
          {
            list.요청리스트.length > 0 &&<>
              <p>1개 선택</p>
              <div>
                <button> 선택취소 </button>
                <button> X </button>
              </div>
            </>
          }
        </div>
      </Choice>
    </ModalBody>
    <ModalBtm>
      <Button>입력완료</Button>
      <Button className='del'>취소</Button>
    </ModalBtm>
  </InventoryRequestModalWrap>
}

const CustomTable = styled.div`
`
const TableContent = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  background: #C7CAD1;
  flex-wrap: wrap;

  &.body {
    margin-top: 10px;
    background-color: white;
    padding: 0;
    li{
      font-family: Montserrat;
      font-weight: normal;
    }
  }

  li {
    border-left: 1px solid #9DA2AE;
    flex: 2;
    text-align: center;
    color: #1C1B1F;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;

    &.small {
      flex: 1;
    }
    &:nth-child(5n + 1), &:nth-child(5n){
      border: none;
    }
    
    &.underLine {
      min-width: 100vw;
      background-color: #EBECEF;
      margin-top: 1rem;
      padding: 1rem 0;
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
`
const Table = ({item}) => {
  console.log(item)
  return <CustomTable>
    <TableContent>
      <li> 품목코드</li>
      <li className={'small'}> 파트</li>
      <li> 품명</li>
      <li className={'small'}> 재고</li>
    </TableContent>
    {
      item.length > 0 &&
      <TableContent className={'body'}>
        {
          item.map((it, key) => {
            return <>
              <li>{it.품목코드}</li>
              <li className={'small'}>{it.파트}</li>
              <li>{it.품명}</li>
              <li className={'small'}>{it.재고}</li>
              <li className={'underLine'}> {it.비고} </li>
            </>
          })
        }
      </TableContent>
    }
  </CustomTable>
}

export default InventoryRequestModal
