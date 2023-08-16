import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  color: #9DA2AE;
  &.active{
    color: #1C1B1F;
  }
`
const OptionSelectedMemo = ({
                              list,
                              updateValue,
                              body,
                              depth1,
                              depth2,
                              id
                            }) => {
  return <>
    <Select
      id={depth2 ? depth2 : depth1}
      name={depth2 ? depth2 : depth1}
      className={ depth2 ? (body[depth1][depth2] ? 'active' : '') : (body[depth1] ? 'active' : '')}
      value={depth2 ? (body[depth1][depth2] || '') : (body[depth1] || '')}
      onChange={(e) => id ? updateValue(e) : updateValue(depth2 ? depth2 : depth1, e.target.value)}
    >
      <option value="" disabled>{list.length ? '항목선택' : '-'}</option>
      {
        list.length && list.map((it, idx) => <option value={it.value} key={idx}> {it.value} </option> )
      }
    </Select>
  </>
}

export default OptionSelectedMemo
