import Picker from 'react-scrollable-picker'
import styled from 'styled-components'
import {useEffect, useState} from 'react'

const YearWrap = styled.div`
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
  background-color: rgba(0, 0, 0, .5);
`
const Content = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100vw;
  border-radius: 20px 20px 0px 0px;
  background-color: #f7f7f7;
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
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #0129FF;
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

const Index = ({close, submit}) => {

  const hour = Array.from({length: 24}, (_, i) => i + 1)
  const min = Array.from({length: 59}, (_, i) => i)
  const [range, setRange] = useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  })
  const optionGroups = {
    hour: hour.map((i) => ({value: i, label: i})),
    minute: min.map(i => ({value: i, label: i})),
  }

  const handleChange = (name, value) => {
    setRange({
      ...range,
      [name]: value,
    })
  }

  console.log(new Date().getHours())

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  useEffect(() => {
    console.log(range)
  }, [range])

  const closeModal = () => {
  }

  const submitData = () => {
    closeModal()
  }

  return <YearWrap>
    <Overlay>
      <Content>
        <ModalBody>
          <Picker
            optionGroups={optionGroups}
            valueGroups={range}
            onChange={handleChange}
          />
        </ModalBody>
        <ModalBtm>
          <button className='primary-btn' onClick={submitData}>적용</button>
          <button className='del-btn' onClick={closeModal}>취소</button>
        </ModalBtm>
      </Content>
    </Overlay>
  </YearWrap>
}

export default Index
