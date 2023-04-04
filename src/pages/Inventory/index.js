import React from "react";
import styled from "styled-components";
import InventoryTable from "../../components/inventory/InventoryTable";
import InventoryTableTop from "../../components/inventory/InventoryTableTop";
import TopSearch from "../../components/molecules/TopSearch";

const InventoryWrap = styled.div`
  padding: 28px 30px 0;
`

const Inventory = () => {

  const dummyData = [
    {
      no: 1,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 2,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 3,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 4,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 5,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    },
    {
      no: 6,
      part: "감속기",
      code: "TNUGM03002",
      name: "G/M(대금감속기)",
      count: "1.0",
      standard: "2T*Φ610(하단)*Φ205(상단)*410(H)",
    }
  ]
  return <>
    <TopSearch />
    <InventoryWrap>
      <InventoryTableTop />
      {
        dummyData.map((list, idx) => {
          console.log(list)
          return (
            <InventoryTable list={list} />
          )
        })
      }
    </InventoryWrap>
  </>
}

export default Inventory
