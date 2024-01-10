import Header from "./components/header";
import HomeComponent from "./components/homeComponent";
import styled from "styled-components";


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin 30px 0 10px;
font-family: 'Montserrat', sans-serif;
font-weight: bold;

`;



function App() {
  return (
    <Container>
      <Header>Personal Expense Tracker</Header>
      <HomeComponent />
    </Container>
  );
}

export default App;
