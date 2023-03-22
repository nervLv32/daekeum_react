import styled from "styled-components";

//DummyImage
import ProfileImage from '../../../assets/dummyImage/profile.jpeg'
import Typo from "../../atom/Typo";
import {useEffect, useState} from "react";

const UserInfoWrap = styled.div`
  display: flex;
`

const Blank = styled.div`
  flex: 1
`

const InfoWrap = styled.div`
  flex: 12;
  min-width: 180px;
  margin: 0 auto;
  background: #0C1D87;
  border-radius: 20px;
`

const Welcome = styled.div`
  margin: 30px;
  height: 60px;
  p{
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

  const [user, setUser] = useState({
    user_name: ''
  })

  useEffect(() => {
    setUser({user_name: '한소희'})
  },[])

  return<UserInfoWrap>
    <Blank />
    <InfoWrap>
      <Welcome>
        <Image src={ProfileImage} />
        <Typo text={'Welcome!'} fontSize={'11px'} fontWeight={'300'} fontFamily={'Montserrat'} color={'rgba(239, 242, 255, 0.7)'}/>
        <Typo text={`${user.user_name} 님`} fontSize={'19px'} fontWeight={'700'}/>
      </Welcome>
    </InfoWrap>
    <Blank />
  </UserInfoWrap>
}

export default UserInfo
