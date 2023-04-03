import styled from "styled-components"
import TopSearch from "../../components/molecules/TopSearch"
import { useModal } from "../../hooks/useModal";
import ReceiptCard from "../../components/receipt/ReceiptCard";
import ReceiptListModal from "../../base-components/modal-components/ReceiptListModal";

const ReceiptWrap = styled.div`
  padding: 28px 30px;
  
`

const Receipt = () => {

  const { openModal } = useModal();
  const modalData = {
    title: 'Receipt Modal',
    content: <ReceiptListModal />,
    callback: () => alert('Modal Callback()'),
  };

  const dummyData = [
    {
      no: 41377,
      date: "2023-02-01",
      state: '접수대기',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41375,
      date: "2023-02-01",
      state: '접수완료',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41379,
      date: "2023-02-01",
      state: '처리완료',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '',
      managerPhone: '',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41377,
      date: "2023-02-01",
      state: '접수대기',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41375,
      date: "2023-02-01",
      state: '접수완료',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '정명길',
      managerPhone: '010-6476-1544',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
    {
      no: 41379,
      date: "2023-02-01",
      state: '처리완료',
      company: '주식회사 대금지웰',
      regionFirst: '인천',
      regionSecond: '미추홀구',
      site: '반도체 클러스터 일반산업단지 조성사업 2공구',
      manager: '',
      managerPhone: '',
      siteAddress: '인천광역시 미추홀구 장고개로 92번길 38',
      detail: '12개월 임대 문의 - 8롤 바이백 월대, 일시불 두건 견적서 요청 - 하자명시 요청',
    },
  ]

  return (
    <>
      <TopSearch />
      <ReceiptWrap>
        {
          dummyData.map((item, key) => {
            return <ReceiptCard
              key={key}
              no={item.no}
              date={item.date}
              state={item.state}
              company={item.company}
              regionFirst={item.regionFirst}
              regionSecond={item.regionSecond}
              site={item.site}
              manager={item.manager}
              onClick={() => openModal({ ...modalData, content: <ReceiptListModal item={item} /> })}
            />
          })
        }
      </ReceiptWrap>
    </>
  )
}

export default Receipt
