import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  color: #9DA2AE;
  &.active{
    color: #1C1B1F;
  }
`
const Index = ({item, updateKey, updateBody, selected, selectIndex}) => {
  return <Select
    name={updateKey}
    className={selected[selectIndex][updateKey] ? 'active' : ''}
    value={selected[selectIndex][updateKey] || ''}
    onChange={(e) => {updateBody(updateKey, e.target.value)}}
  >
    <option value="" disabled>{item.length ? '항목선택' : '-'}</option>
    {
      item.length && item.map((it, idx) => <option value={it.value} key={idx}> {it.value} </option> )
    }
  </Select>
}

export default Index
