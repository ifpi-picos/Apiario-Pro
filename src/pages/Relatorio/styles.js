import styled from "styled-components";

export const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

export const Main = styled.main`
  width:88%;
  max-width: 800px;
  padding: 20px;
  margin-top: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ReportItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ReportTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const ReportValue = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
`;

