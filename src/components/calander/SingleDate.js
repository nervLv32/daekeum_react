import StandardCalendar from '../molecules/calendar/StandardCalendar';
import styled from 'styled-components';
import SingleCalendar from '../molecules/calendar/SingleCalendar';
import {useState} from 'react';

const DailyWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999999999;
  width: 100vw;
  height: 100vh;
  border-radius: 20px 20px 0 0;
`

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.5);
`

const Content = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100vw;
  border-radius: 20px 20px 0px 0px;
  background-color: #fff;
  flex-direction: column;
 `
const ModalBody = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: scroll;
  flex: 1;
  padding: 17px 30px;
`
const ModalBtm = styled.div`
  flex: 1;
  padding: 17px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  & > *:not(:last-child) {
      margin-right: 10px;
    }
  > button {
    cursor: pointer;
    width: calc(50% - 5px);
  }
  .primary-btn {
    height: 34px;
    padding: 0 30px;
    font-size: 14px;
    font-weight: 700;
    background : linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
    border-radius: 10px;
    color: #fff;
  }
  .del-btn {
    padding: 0 15px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #1F319D;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    color: #1c1b1f;
    background-color: #fff;
  }
`

const SingleDate = ({type, submit, close}) => {

  const [date, setDate] = useState('');

  console.log(type)
  return <DailyWrap>
    <Overlay>
      <Content>
        <ModalBody>
          <SingleCalendar setDay={setDate} />
        </ModalBody>
        <ModalBtm>
          <button className="primary-btn" onClick={() => submit(type, date)}>적용</button>
          <button className="del-btn" onClick={() => close(type)}>취소</button>
        </ModalBtm>
      </Content>
    </Overlay>
  </DailyWrap>
}


export default SingleDate
