import React from "react";
import styled from "styled-components";

const TopSearchWrap = styled.div`
  background-color: #1F319D;
  border-radius: 0 0 20px 20px;
  padding: 0 30px 30px 30px;
  .search-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input-wrap {
      width: calc(100% - 50px);
      height: 45px;
      position: relative;
      z-index: 20;
      &::after {
        content: '';
        display: block;
        width: 17px;
        height: 17px;
        background: url('icons/search-icon.png') no-repeat 50% center / cover;
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
      }
    }
    input {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background-color: rgba(239, 242, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.06);
      padding: 0 40px 0 15px;
      font-size: 12px;
      font-weight: 600;
      color: white;
      font-family: var(--font-mont);
      border-radius: 15px;
      z-index: 10;
      &::placeholder {
        color: #F6F6F6;
      }
      &:focus {
        outline: none;
        border: 1px solid #F6F6F6;
      }
    }
    .submit-btn {
      width : 43px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #0C1D87;
      border: 1px solid rgba(238, 241, 255, 0.4);
      border-radius: 15px;
      cursor: pointer;
      margin-left: 7px;
      z-index: 10;
    }
  }
`

const TopSearch = ({ topMenu, setTopMenu }) => {

  return <TopSearchWrap>
    <div className="search-wrap">
      <div className="input-wrap">
        <input type="text" placeholder="Search" />
      </div>
      <button className="submit-btn" onClick={() => setTopMenu(prev => !prev)}>
        {
          topMenu ? (
            <i>
              <img src="../icons/topmenu-close-x.png" alt="widget icon" />
            </i>
          ) : (
            <i>
              <img src="../icons/widgets-icon.png" alt="widget icon" />
            </i>
          )
        }
      </button>
    </div>
  </TopSearchWrap>
}

export default TopSearch;