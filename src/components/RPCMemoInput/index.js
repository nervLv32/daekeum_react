import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import fetchService from '../../util/fetchService'
import OptionSelectedMemo from '../optionSelector/OptionSelectorMemo'
import {useRecoilState, useRecoilValue} from 'recoil'
import {exportDocumentBody, firstExportDocuBody, shipCondBody} from '../../recoil/reportAtom'
import {CommaPriceRegis} from '../../util/commaPrice'

const MemoInputWrap = styled.div`
  dl {
    border-bottom: 1px solid #ebecef;
    padding: 14px 30px 10px;

    dt {
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 500;
      color: #1c1b1f;
    }

    dd {
      input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #d9d9d9;
        height: 30px;
        padding-left: 4px;
        font-weight: 500;
        font-size: 12px;

        &:focus {
          outline: none;
        }
      }
    }
  }
`


const Index = () => {

  const [body, setBody] = useRecoilState(exportDocumentBody)
  const [option, setOption] = useState({
    shipcond: [],
    shipchungu: [],
  })


  const optionFetch = async () => {
    setOption({
      shipcond: [...(await fetchService('/approval/comboShipCond', 'post', {})).data],
      shipchungu: [...(await fetchService('/approval/comboShipChungu', 'post', {})).data],
    })
  }
  useEffect(() => {
    optionFetch()
  }, [])

  const updateValue = (key, value) => {
    setBody({
      ...body,
      운송조건: {
        ...body.운송조건,
        [key]: value
      }
    })
  }

  return <MemoInputWrap>
    <dl>
      <dt>운송비조건</dt>
      <dd>
        <OptionSelectedMemo
          list={option.shipcond || []}
          updateValue={updateValue}
          body={body}
          depth1={'운송조건'}
          depth2={'운송비조건'}
          />
      </dd>
    </dl>
    <dl>
      <dt>운송비청구방법</dt>
      <dd>
        <OptionSelectedMemo
          list={option.shipcond || []}
          updateValue={updateValue}
          body={body}
          depth1={'운송조건'}
          depth2={'운송비청구방법'}
        />
      </dd>
    </dl>
    <dl>
      <dt>운송비</dt>
      <dd>
        <input type={'text'} value={CommaPriceRegis(body.운송조건.운송비 || '')}
               onChange={e => updateValue('운송비', e.target.value.replaceAll(',',''))}/>
      </dd>
    </dl>
    <dl>
      <dt>특기사항</dt>
      <dd>
        <input type={'text'} value={body.운송조건.특기사항 || ''}
               onChange={e => updateValue('특기사항', e.target.value)}/>
      </dd>
    </dl>
  </MemoInputWrap>
}

export default Index
