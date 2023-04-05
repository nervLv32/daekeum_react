import styled from "styled-components";
import {bottomNavigationRouterList} from "../../route/RouterList";
import {NavLink} from "react-router-dom";

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;

  position: fixed;
  width: 100vw;
  height: 80px;
  padding: 15px;
  left: 0;
  bottom: 0;

  background: #FFFFFF;
  box-shadow: 0px -6px 7px rgba(0, 0, 0, 0.03);
`

const NavStyle = styled(NavLink)`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-bottom: 2px;;
  }
  & i > svg {
    fill: #9DA2AE;
  }
  & > p {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #9DA2AE;
  }
  &.active{
    & i > svg {
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
          console.log(item.path)
          return <NavStyle key={key} to={item.path}>
            <i>{item.icon}
            </i>
            <p>{item.title}</p>
          </NavStyle>
        })
      }
    </Navigation>
  </>
}

export default BottomNavigation


