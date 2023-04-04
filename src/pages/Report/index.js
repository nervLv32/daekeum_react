import React from "react";
import styled from "styled-components";
import TopSearch from "../../components/molecules/TopSearch";
import ReportMainTable from "../../components/report/ReportMainTable";
import ReportMainTableTop from "../../components/report/ReportMainTableTop";

const ReportWrap = styled.div`
  padding: 28px 30px 0;
`

const Report = () => {

  const dummyData = [
    {
      no: 1,
      date: "2023-02-08",
      company: "(주)대금지오웰",
      manager: "정명길",
      payState: "결재완료",
      site: "호남고속도로 첨단방면 연결로 개설공사 2구간",
      department: "수도권A",
      regionFirst: "인천",
      regionSecond: "미추홀구",
    },
    {
      no: 2,
      date: "2023-02-08",
      company: "(주)대금지오웰",
      manager: "정명길",
      payState: "결재완료",
      site: "호남고속도로 첨단방면 연결로 개설공사 2구간",
      department: "수도권A",
      regionFirst: "서울",
      regionSecond: "동작구",
    },
  ]

  return <>
    <TopSearch />
    <ReportWrap>
      <ReportMainTableTop />
      {
        dummyData.map((list, idx) => {
          return <ReportMainTable key={idx} list={list} />
        })
      }
    </ReportWrap>
  </>
}

export default Report
