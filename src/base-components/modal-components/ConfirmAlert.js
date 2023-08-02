import styled from 'styled-components'

const ModalBody = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: white;
  width: 50%;
  min-width: 220px;
  border-radius: 15px;
  padding-top: 20px;
  p{
    text-align: center;
    font-size: 13pt;
    line-height: 2rem;
    b{
      font-weight: normal;
      color: #1F319D;
    }
  }
`

const ConfirmBtn = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  background-color: #F6F6F6;
  border-radius: 15px;
  padding: 15px;
  margin-top: 15px;

  button {
    padding: 5px 0;
    flex: 1;
    border: 1px solid #0129FF;
    border-radius: 10px;
    font-weight: bold;
    color: #0129FF;

    &:first-child {
      background-color: #0129FF;
      color: white;
    }
  }
`

const ConfirmAlert = ({client, site, text, submit, cancel}) => {
  console.log(client)
  return <ModalBody>
    <p> {client} { site && '/' + site} </p>
    <p> <b>{text}</b>하시겠습니까? </p>
    <ConfirmBtn>
      <button onClick={submit} > 예</button>
      <button onClick={cancel}> 아니오</button>
    </ConfirmBtn>
  </ModalBody>
}

export default ConfirmAlert
