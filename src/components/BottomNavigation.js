import styled from "styled-components";
import {bottomNavigationRouterList} from "../route/RouterList";
import {NavLink} from "react-router-dom";

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;

  position: absolute;
  width: 100vw;
  height: 80px;
  left: 0;
  bottom: 0;

  background: #FFFFFF;
  box-shadow: 0px -6px 7px rgba(0, 0, 0, 0.03);
`

const NavStyle = styled(NavLink)`
  position: relative;
  flex: 1;
  margin: 5px;
  & > svg {
    /* home */
    pointer-events: none;
    position: absolute;
    left: 50%;
    top: 20%;
    fill:#9DA2AE;
    transform: translateX(-50%) translateY(-50%);
  }
  & > p {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 35%;
    display: inline-block;
    color: #1C1B1F;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
  }
  &.active{
    & > svg {
      fill: #1F319D;
    }
    & > p {
      color: #1F319D;
    }
  }
`

const BottomNavigation = () => {

  return <>
    <Navigation>
      {
        bottomNavigationRouterList.map((item, key) => {
          return <NavStyle key={key} to={item.path}>
            {item.icon}
            <p>{item.title}</p>
          </NavStyle>
        })
      }
    </Navigation>
  </>
}

export default BottomNavigation


