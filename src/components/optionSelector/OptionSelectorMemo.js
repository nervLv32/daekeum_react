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
                            }) => {
  return <Select
    name={depth2}
    className={body[depth1][depth2] ? 'active' : ''}
    value={body[depth1][depth2] || ''}
    onChange={(e) => updateValue(depth2, e.target.value)}
  >
    <option value="" disabled>{list.length ? '항목선택' : '-'}</option>
    {
      list.length && list.map((it, idx) => <option value={it.value} key={idx}> {it.value} </option> )
    }
  </Select>
}

export default OptionSelectedMemo
