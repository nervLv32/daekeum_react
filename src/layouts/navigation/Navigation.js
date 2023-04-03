import styled from "styled-components";
import {useRecoilState} from "recoil";
import userAtom from "../../recoil/userAtom";

const NavigationWrap = styled.div`
  position: absolute;
  width: 200px;
  height: calc(100vh - 20px);
  background-color: #1F319D;
  top: 0;
  left: 0;
  color: white;
  padding: 10px;
  border-radius: 0 20px 20px 0;
`

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`



const Navigation = () => {
  const [user, setUser] = useRecoilState(userAtom)

  return<NavigationWrap>
    <p>
      {user.auth.userName}
    </p>
    <Ul>
      <li>접수메뉴</li>
      <li>통합등록</li>
      <li>재고</li>
      <li>서류상신</li>
      <li>영업등록</li>
    </Ul>
  </NavigationWrap>
}

export default Navigation
