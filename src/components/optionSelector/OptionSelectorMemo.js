import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  color: #9DA2AE;
  &.active{
    color: #1C1B1F;
  }
`
const OptionSelectedMemo = ({item, updateKey, updateBody, selected}) => {
  return <Select
    name={updateKey}
    className={selected[updateKey] ? 'active' : ''}
    value={selected[updateKey] || ''}
    onChange={(e) => {updateBody({
      ...selected,
      [updateKey] : e.target.value
    })}}
  >
    <option value="" disabled>{item.length ? '항목선택' : '-'}</option>
    {
      item.length && item.map((it, idx) => <option value={it.value} key={idx}> {it.value} </option> )
    }
  </Select>
}

export default OptionSelectedMemo
