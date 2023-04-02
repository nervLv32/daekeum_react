import styled from "styled-components";

//DummyImage
import ProfileImage from '../../../assets/dummyImage/profile.jpeg'
import Typo from "../../atom/Typo";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import userAtom from "../../../recoil/userAtom";

const InfoWrap = styled.div`
  padding: 30px;
  background: #0C1D87;
  border-radius: 20px;
  filter: drop-shadow(3px 3px 15px #0C1D87);
`

const Welcome = styled.div`
  height: 60px;

  p {
    padding: 3px;
  }
`

const Image = styled.div`
  box-sizing: border-box;

  width: 60px;
  height: 100%;
  float: left;
  margin-right: 20px;
  background-image: url(${props => props.src ? props.src : ''});
  background-position: center center;
  background-size: cover;
  /* Gray_ */

  border: 1px solid #9DA2AE;
  border-radius: 20px;
`
const UserInfo = () => {

  const [user, setUser] = useRecoilState(userAtom)

  useEffect(() => {
    setUser({
      auth: {
        userName: '한소희'
      }
    })
  }, [])

  return <InfoWrap>
    <Welcome>
      <Image src={ProfileImage}/>
      <Typo text={'Welcome!'} fontSize={'11px'} fontWeight={'300'} fontFamily={'Montserrat'}
            color={'rgba(239, 242, 255, 0.7)'}/>
      <Typo text={`${user.auth.userName} 님`} fontSize={'19px'} fontWeight={'700'}/>
    </Welcome>
  </InfoWrap>
}

export default UserInfo
