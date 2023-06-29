import styled from "styled-components";
import logo from '../../assets/icon/로고.svg'

const BackgroundCircle = styled.div`
  position: absolute;
  width: 150vw;
  height: 100vh;
  border-radius: 100vh;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  background: #1F319D;
`
const Logo = styled.img`
  position: absolute;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 100px;
`

const LoginWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 300px;
  height: 370px;
  background: #FFFFFF;
  box-shadow: 3px 3px 15px rgba(28, 27, 31, 0.2);
  border-radius: 20px;`
const InfoText = styled.p`
  font-family: 'Montserrat';
  margin-top: 40px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #1C1B1F;
`
const InputWrap = styled.div`
  width: 222px;
  margin: 50px auto;
  input:first-child{
    margin-bottom: 30px;
  }
`
const InputAuthInfo = styled.input`
  font-family: 'Montserrat';
  width: 100%;
  height: 30px;
  font-style: normal;
  border: none;
  border-bottom: 1px solid #1F319D;
  padding-bottom: 14px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  outline: none;
  &::placeholder{
    color: #9DA2AE;
  }
  
  &:focus{
    &::placeholder{
      color: #1F319D;
    }
  }
`
const Button = styled.button`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  
  padding: 11px 88px;

  width: 235px;
  height: 42px;

  /* Primary */
  background: #1F319D;
  border-radius: 999px;
  color: white;
`
const Footer = styled.p`
  position: absolute;
  bottom: 30px;
  width: 100vw;
  
  text-align: center;
  
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  text-align: center;

  color: #777777;
`

const Login = () => {
  return<>
    <BackgroundCircle />
    <LoginWrap>
      <Logo src={logo} alt={''} />
      <InfoText> Login Account </InfoText>
      <InputWrap>
        <InputAuthInfo type={'text'} placeholder={'ID'} />
        <InputAuthInfo type={'password'} placeholder={'Password'} />
      </InputWrap>
      <Button
        onClick={() => alert(1)}
      >
        LOG IN
      </Button>
    </LoginWrap>
    <Footer>Copyright <b>DAEKUM GEOWELL</b> All rights reserved</Footer>
  </>
}

export default Login
