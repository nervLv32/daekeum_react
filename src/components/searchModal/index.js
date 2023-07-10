import styled from "styled-components";
import {useEffect, useState} from "react";
import ClientList from "./clientList";

const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`

const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.5);
`

const ModalBody = styled.div`
  background-color: white;
  margin: 2rem;
  padding: 2rem;
  border-radius: 2rem;
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #8885CB;
  background-color: #fff;
  padding: 10px 15px;
  height: 35px;
  border-radius: 10px;
  font-family: var(--font-mont);
  color: #1c1b1f;
  &::placeholder {
    color: #9DA2AE;
  }
`

const Ul = styled.ul`
  max-height: 25rem;
  overflow-y: scroll;
`

const Index = ({data, searchFetch}) => {

  let debounce = null

  const [searchWord, setSearchWord] = useState('')
  const [searchList, setSearchList] = useState([])
  const [search, setSearch] = useState({
    searchword: '',
    pageSize: 10,
    currentPage: 1
  })

  const closeModal = () => {

  }

  useEffect(() => {
    debounce = setTimeout(() => {
      setSearch({...search, searchword: searchWord})
    }, 500)
    return () => clearTimeout(debounce)
  }, [searchWord])

  useEffect(() => {
    searchFetch(search).then(res => {
      setSearchList(res.data)
    })
  }, [search])

  return<ModalWrap>
    <ModalOverlay
      onClick={closeModal}
    >
      <ModalBody>
        <Input type={'text'} placeholder={'업체명을 입력해주세요'} value={searchWord} onChange={e => setSearchWord(e.target.value)}/>
        <Ul>
          {
            data.content === 'clientlist' ?
              <ClientList searchList={searchList}/> :
              null
          }
        </Ul>
      </ModalBody>
    </ModalOverlay>
  </ModalWrap>
}

export default Index
