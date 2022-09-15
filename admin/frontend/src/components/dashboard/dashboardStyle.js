import styled from "styled-components"

const DashboardStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .data-container{
    display : flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap : nowrap;
  }

  .status-container{
    width: 100%;
    max-width: fit-content;
    display: flex;
    flex-direction: column;
  }
  .chart-container{
    width: 100%;
    max-width: 30%;
    display: flex;
    flex-direction: column;
  }
`
export default DashboardStyled
