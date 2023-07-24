import React from 'react'
import styled from 'styled-components'
import RPModalTop from '../../../../../components/report/RPModalTop'
import RPStepDeps from '../../../../../components/report/RPStepDeps'
import {useModal} from '../../../../../hooks/useModal'
import RPC04Step04Modal from './RPC04Step04Modal'
import RPC04Step02Modal from './RPC04Step02Modal'
import {useRecoilState} from 'recoil'
import {approvalSuliReq} from '../../../../../recoil/reportAtom'


const RPC04Step03ModalWrap = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow-y: scroll;
  width: 100%;
`

const RPC04Step03ModalBody = styled.div`
  overflow-y: scroll;
  padding-bottom: 70px;
`

const CustomerStatusWrap = styled.div`
  background-color: #ebecef;

  .title-wrap {
    height: 40px;
    padding: 8px 30px;
    background-color: #fff;
    border-bottom: 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-text {
      font-size: 14px;
      font-weight: 700;
      color: #1c1b1f;
    }

    .list-tab {
      display: flex;
      align-items: center;

      li {
        &:not(:last-child) {
          margin-right: 5px;
        }

        &.active {
          background-color: #0129ff;
        }

        cursor: pointer;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: 20px;
        color: #f6f6f6;
        font-family: var(--font-mont);
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
`

const SeparatorWrap = styled.div`
  padding: 14px 30px;
  background-color: #ebecef;

  h6 {
    font-weight: 500;
    font-size: 12px;
    color: #1c1b1f;
  }
`

const InfoList = styled.ul`
  background-color: #fff;

  li {
    height: 34px;
    padding: 0 30px;
    border-bottom: 1px solid #EBECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &.textarea-li {
      height: auto;
      padding: 14px 30px;
      margin-bottom: 50px;
      border-bottom: 0 none;

      dl {
        flex-direction: column;
        align-items: flex-start;

        dt {
          margin-bottom: 8px;
        }

        dd {
          width: 100%;

          textarea {
            resize: none;
            width: 100%;
            height: 80px;
            border: 1px solid #d9d9d9;
            font-size: 12px;
            font-weight: 400;
            color: #1c1b1f;
            padding: 4px;

            &:focus {
              outline: none;
              border-color: #1c1b1f;
            }
          }
        }
      }
    }

    dl {
      display: flex;
      align-items: center;
      width: 100%;

      dt {
        min-width: 80px;
        font-weight: 500;
        font-size: 12px;
        color: #1c1b1f;
      }

      dd {
        width: calc(100% - 80px);

        input {
          width: 100%;
          box-sizing: border-box;
          border: 0 none;
          font-size: 12px;
          font-weight: 400;
          color: #1c1b1f;

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: #9da2ae;
          }
        }
      }
    }
  }
`

const ModalBtm = styled.div`
  padding: 17px 30px;
  background-color: #f7f7f7;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
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


const RPC04Step03Modal = () => {

  const {openModal, closeModal} = useModal()
  const [body, setBody] = useRecoilState(approvalSuliReq)

  const modalData = {
    title: 'RPDoc01Modal Modal',
    callback: () => alert('Modal Callback()'),
  }

  const updateBody = (key, value) => {
    setBody({
      ...body,
      운송비: {
        ...body.운송비,
        [key]: value,
      },
    })
  }
  /******* 수리기입고요청서 케이스의 두번째 *******/
  return <RPC04Step03ModalWrap>
    <RPModalTop title='수리기입고요청서'/>
    <RPStepDeps
      dep='dep3'
      dep1title='거래처현황 세부정보'
      dep2title='계약사항'
      dep3title='청구·수금현황'
      dep4title='축중기체크'
    />
    {/* 거래처 현황 */}
    <RPC04Step03ModalBody>

      <CustomerStatusWrap>
        <div className='title-wrap'>
          <h6 className='title-text'>청구현황 및 수금현황</h6>
        </div>

        <SeparatorWrap>
          <h6>입고운송비</h6>
        </SeparatorWrap>

        <InfoList>
          <li>
            <dl>
              <dt>조건</dt>
              <dd>
                <input type={'text'}
                       value={body.운송비.입고운송비조건}
                       onChange={e => updateBody('입고운송비조건', e.target.value)}
                       placeholder='항목을 입력하세요'/>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>청구방법</dt>
              <dd>
                <input type={'text'}
                       value={body.운송비.입고운송비청구방법}
                       onChange={e => updateBody('입고운송비청구방법', e.target.value)}
                       placeholder='항목을 입력하세요'/>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>입고운임</dt>
              <dd>
                <input type={'text'}
                       value={body.운송비.입고운임}
                       onChange={e => updateBody('입고운임', e.target.value)}
                       placeholder='항목을 입력하세요'/>
              </dd>
            </dl>
          </li>
        </InfoList>

        <SeparatorWrap>
          <h6>출고운송비</h6>
        </SeparatorWrap>

        <InfoList>
          <li>
            <dl>
              <dt>조건</dt>
              <dd>
                <input type={'text'}
                       value={body.운송비.출고운송비조건}
                       onChange={e => updateBody('출고운송비조건', e.target.value)}
                       placeholder='항목을 입력하세요'/>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>청구방법</dt>
              <dd>
                <input type={'text'}
                       value={body.운송비.출고운송비청구방법}
                       onChange={e => updateBody('출고운송비청구방법', e.target.value)}
                       placeholder='항목을 입력하세요'/>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>출고운임</dt>
              <dd>
                <input type={'text'}
                       value={body.운송비.출고운임}
                       onChange={e => updateBody('출고운임', e.target.value)}
                       placeholder='항목을 입력하세요'/>
              </dd>
            </dl>
          </li>
          <li className='textarea-li'>
            <dl>
              <dt>업무협의사항</dt>
              <dd>
                <textarea value={body.운송비.업무협의사항} onChange={e => updateBody('업무협의사항', e.target.value)}/>
              </dd>
            </dl>
          </li>
        </InfoList>
      </CustomerStatusWrap>

      <ModalBtm>
        <button className='del-btn' onClick={() => {
          closeModal()
          openModal({...modalData, content: <RPC04Step02Modal/>})
        }}>이전
        </button>
        <button className='primary-btn' onClick={() => {
          closeModal()
          openModal({...modalData, content: <RPC04Step04Modal/>})
        }}>다음
        </button>
      </ModalBtm>
    </RPC04Step03ModalBody>
  </RPC04Step03ModalWrap>
}

export default RPC04Step03Modal
