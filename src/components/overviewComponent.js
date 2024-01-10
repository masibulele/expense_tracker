
import styled from "styled-components"
import {useState} from "react"


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin 10px;
width: 100%;
`;

const BalanceBox = styled.div`
display: flex ;
justify-content: space-between;
align-items: center;
font-size: 18px;
width: 100%;

`
const AddTransaction = styled.div`
background: black;
color: white;
padding: 5px 10px;
border-radius: 4px;
cursor: pointer;
font-weight: bold;
font-size: 15px;
margin: 0 5px;
text-align: center;

`;
const AddTransactionContainer = styled.div`
display: flex;
flex-direction: column;
border: 1px solid #e6e8e9;
gap: 10px;
padding: 10px 15px;
margin: 20px;
width: 90%;
& input {
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
}

`;
const RadioBox = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    & input{
        width: unset;
        margin: 0 10px;
    }

`;

const AddTransactionView = (props)=>{
    const [amount, setAmount] = useState();
    const[desc, setDesc] = useState();
    const[type, setType] = useState("EXPENSE");
    

    const addNewTransaction = ()=>{
        props.addTransaction({amount:Number(amount), desc, type, id:Date.now()})
        props.toggleTxnAdd();
    };

    return <AddTransactionContainer>
        <input placeholder="Amount" type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
        <input placeholder="Description" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
        <RadioBox>
            <input type="radio"
                    id="expense" 
                    name="type" 
                    value="EXPENSE" 
                    checked={type==="EXPENSE"}
                    onChange={(e)=>{setType(e.target.value)}}
                    />
            <label htmlFor="expense"> Expense</label>
            <input type="radio" 
                    id="income" 
                    name="type" 
                    value="INCOME" 
                    checked={type==="INCOME"}
                    onChange={(e)=>{setType(e.target.value)}}
                    />
            <label htmlFor="income"> Income </label>
            
        </RadioBox>
        <AddTransaction onClick={addNewTransaction}> Add Transaction</AddTransaction>

        </AddTransactionContainer>
};

const ExpenseContainer = styled.div`
display: flex;
flex-direction: row;
margin 20px;
gap: 12px;
`;

const ExpenseBox = styled.div`
display: flex;
flex-direction: column;
padding: 10px 15px;
border-radius: 4px;
border: 1px solid #e6e8e9;
width: 135px;
font-size: 14px;
margin: 5px 0;
& span{
    font-weight: bold;
    font-size: 20px;
    color: ${props => props.isIncome? 'green': 'red'};
}
`;



const OverviewComponent = (props)=>{
    const [isAddTxnVisible, toggleTxnAdd] = useState(false)

    return <Container>
        <BalanceBox>
            Balance: R{props.income - props.expense}
            <AddTransaction onClick={()=>{toggleTxnAdd(!isAddTxnVisible)}}>{isAddTxnVisible? "Cancel": "Add"}</AddTransaction>
        </BalanceBox>
        {isAddTxnVisible && <AddTransactionView toggleTxnAdd={toggleTxnAdd} addTransaction={props.addTransaction} />}
        <ExpenseContainer>
            <ExpenseBox isIncome={false}>
                Expense <span>R {props.expense}</span>
            </ExpenseBox> 
            <ExpenseBox isIncome={true} >
                Income <span>R {props.income}</span>
            </ExpenseBox> 

        </ExpenseContainer>
    </Container>
}


export default OverviewComponent