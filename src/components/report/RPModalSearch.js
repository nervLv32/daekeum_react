import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const RPModalSearchWrap = styled.div`
  padding: 20px 30px;
  background-color: #f6f6f6;
  border-radius: 0 0 10px 10px;
`

const RPModalSearchNavigation = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  li {
    font-size: 10px;
    font-weight: 400;
    font-family: var(-font-mont);
    color: #1c1b1f;
  }
  img {
    display: inline-block;
    margin: 0 5px;
  }
`

const RPModalSearchComponent = styled.div`
  display: flex;
  align-items: center;
  input {
    height: 28px;
    width: calc(100% - 32px);
    border: 1px solid #555;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 12px;
    font-family: var(--font-mont);
    font-weight: 400;
    font-size: 9px;
    &::placeholder {
      color: #9da2ae;
    }
    &:focus {
      outline: none;
    }
  }
  .search-btn {
    width: 28px;
    height: 28px;
    background-color: #555;
    border: 1px solid rgba(238, 241, 255, 0.4);
    box-shadow: 3px 3px 15px rgba(28, 27, 31, 0.2);
    border-radius: 10px;
    background: #555 url('../icons/search-icon.png') no-repeat 50% center / 14px;
    cursor: pointer;
    margin-left: 4px;
  }
`

const RPModalSearch = ({ dep1, dep2, dep3, changeParam }) => {

  const [search, setSearch] = useState('')
  let debounce = null

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    debounce = setTimeout(() => {
      if(changeParam){
        changeParam('searchword', search)
      }
    }, 500)
    return () => clearTimeout(debounce)
  }, [search])

  return <RPModalSearchWrap>
    <RPModalSearchNavigation>
      <li>{dep1}</li>
      <img src="../../icons/tab-navi-rightarrow.png" alt="right arrow" />
      <li>{dep2}</li>
      {
        dep3 && <>
          <img src="../../icons/tab-navi-rightarrow.png" alt="right arrow" />
          <li>{dep3}</li>
        </>
      }
    </RPModalSearchNavigation>
    <RPModalSearchComponent>
      <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
      <button className="search-btn" />
    </RPModalSearchComponent>
  </RPModalSearchWrap>
}

export default RPModalSearch;
