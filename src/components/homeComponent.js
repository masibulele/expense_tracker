import { useEffect, useState } from "react";
import OverviewComponent from "./overviewComponent"
import TransactionComponent from "./transactionComponent"
import styled from "styled-components";


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin 30px 0 10px;
font-family: 'Montserrat', sans-serif;
font-weight: bold;
width: 360px;
`;


const HomeComponent = (props)=>{
    const [transactions,updateTransaction] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);

    const addTransaction = (payload)=>{
        const transactionArry = [...transactions];
        transactionArry.push(payload);
        updateTransaction(transactionArry);

    };

    // calculate balance
    const calculateBalance = ()=>{
        let exp = 0;
        let inc = 0;
        transactions.map((payload)=>{
            payload.type === "EXPENSE"
            ? (exp = exp + payload.amount)
            : (inc = inc + payload.amount);
        });
        updateExpense(exp);
        updateIncome(inc);
    };
    useEffect(()=> calculateBalance(),[transactions]);

    return (<Container>
                <OverviewComponent addTransaction={addTransaction} expense= {expense}  income= {income}/>
                <TransactionComponent transactions={transactions}/>
            </Container>)
}


export default HomeComponent