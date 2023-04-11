import styled from "styled-components";
import { useRecoilState } from "recoil";
import userAtom from "../../recoil/userAtom";
import menuAtom from "../../recoil/menuAtom";
import { NavLink } from "react-router-dom";

const NavigationWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: -100%;
  z-index: 300;
  transition: right 0.3s linear;
  &.view {
    right: 0;
    .navigation-dim {
      visibility: visible;
      opacity: 1;
    }
  }
  .navigation-dim {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 200;
    opacity: 0;
    visibility: hiddden;
    transition: all 0.2s 0.3s linear;
  }
`

const NavigationWrap = styled.div`
  position: absolute;
  width: 70%;
  
  height: 100vh;
  background: #1F319D url("../images/sidemenu-bg.png") 100% bottom no-repeat;
  top: 0;
  right: 0;
  color: white;
  border-radius: 0 20px 20px 0;
  z-index: 300;
  padding: 100px 30px 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .side-menu {
    .user-info-wrap {
      padding-bottom: 35px;
      margin-bottom: 35px;
      border-bottom : 1px solid rgba(239, 242, 255, 0.2);
      display: flex;
      align-items: center;
      .img-wrap {
        margin-right: 15px;
        width: 55px;
        height: 55px;
        background-image: url('/static/media/profile.176d64d9469bfc785840.jpeg');
        background-position: center center;
        background-size: cover;
        border-radius: 20px;
        box-shadow: 3px 3px 15px #0C1D87;
        border: 1px solid #9da2ae;
      }
      .text-wrap {
        p {
          font-size: 17px;
          font-weight: 700;
          line-height: 19px;
          color: #fff;
          margin-bottom: 2px;
        }
        span {
          font-size: 11px;
          font-weight: 400;
          line-height: 19px;
          color: #9da2ae;
        }
      }
    }
    .side-menu-list {
      li {
        &:not(:last-child) {
          margin-bottom: 24px;
        }
        a {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #fff;
          i {
            display: inline-block;
            width: 28px;
            height: 28px;
            margin-right: 16px;
          }
          p {
            font-weight: 500;
            font-size: 14px;
          }
        }
      }
    }
  }
  .logout {
    width: 100%;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 9px 6px 18px;
    background: rgba(0, 182, 239, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 38px;
    font-family: var(--font-mont);
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
    i {
      width: 28px;
      height: 28px;
      background-color: #00b6ef;
      box-shadow : 0px 0px 10px rgba(0, 0, 0, 0.25);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`



const Navigation = () => {
  const [user, setUser] = useRecoilState(userAtom)
  const [menuState, setMenuState] = useRecoilState(menuAtom)

  const sideMenuNavi = [
    {
      path: "receipt",
      iconSrc: "icon-side-receipt.png",
      title: "접수메뉴"
    },
    {
      path: "regis",
      iconSrc: "icon-side-regis.png",
      title: "통합등록"
    },
    {
      path: "inventory",
      iconSrc: "icon-side-inventory.png",
      title: "재고"
    },
    {
      path: "report",
      iconSrc: "icon-side-report.png",
      title: "서류상신"
    },
    {
      path: "sale",
      iconSrc: "icon-side-sale.png",
      title: "영업등록"
    }
  ]
  
  return (
    <NavigationWrapper className={menuState.isOpen ? "view" : "hidden"}>
      <div className="navigation-dim" onClick={() => setMenuState({ isOpen: false })}></div>
      <NavigationWrap>
        <div className="side-menu">
          <div className="user-info-wrap">
            <div className="img-wrap">
              <img src='' />
            </div>
            <div className="text-wrap">
              <p>
                {user.auth.userName}
              </p>
              <span>경영지원실 전산팀</span>
            </div>
          </div>
          <ul className="side-menu-list">
            {
              sideMenuNavi.map((item, key) => {
                return <li key={key}>
                  <NavLink to={item.path} onClick={() => setMenuState({ isOpen: false })}>
                    <i>
                      <img src={`../icons/${item.iconSrc}`} alt="sidemenu icon" />
                    </i>
                    <p>{item.title}</p>
                  </NavLink>
                </li>
              })
            }
          </ul>
        </div>
        <div className="logout">
          LOGOUT
          <i>
            <img src="../icons/icon-logout.png" alt="logout btn" />
          </i>
        </div>
      </NavigationWrap>
    </NavigationWrapper>
  )
}

export default Navigation
