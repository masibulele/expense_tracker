import { useEffect, useState } from "react";
import styled from "styled-components";


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
font-family: 'Montserrat', sans-serif;
font-weight: bold;
font-size: 18px;
gap:10px;
width:100%;
& input {
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
    background:#e6e8e9;
    width:90%;
}

`;

const Cell = styled.div`
display: flex;
padding: 10px 12px;
border-radius: 4px;
border: 1px solid #e6e8e9;
justify-content: space-between;
align-items: center;
border-right: 4px solid ${(props)=>props.isExpense ? "red": "green"};
width: 90%;
`;

const TransactionCell = (props)=>{

    return(
        <Cell isExpense={props.payload?.type === "EXPENSE"}>
            <span >{props.payload.desc} </span>
            <span>R{props.payload.amount}</span>
        </Cell>
    )

};

const TransactionComponent = (props)=>{
    const [filteredTransactions, updateTxn] = useState(props.transactions);
    const [searchText, updateSearchText] = useState("");
    // filter function

    const filterData = (searchText)=>{
        //check if search box is empty and return all transactions
        if(!searchText || !searchText.trim().length){
          updateTxn(props.transactions)  ;
          return;
        }

        // filter transations based on search words
        let txn = [...props.transactions]
        txn = txn.filter((payload)=>{
             return payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())

        });
        updateTxn(txn)



    };
    useEffect(()=> filterData(searchText),[props.transactions]);

    return <Container>
            Transaction
            <input placeholder="search"
                    value={searchText} 
                    onChange={(e)=>{ updateSearchText(e.target.value); filterData(e.target.value);}}/>
            {filteredTransactions?.length ? filteredTransactions.map((payload)=>{return <TransactionCell payload={payload} />}):""}
            </Container>
}


export default TransactionComponent