import React, { useReducer, createContext } from "react";

import contextReducer from './contextReducer.js'

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{"amount":1200,"category":"Food","type":"Expense","date":"2022-11-16","id":"7083f3a7-c669-46c9-af3b-104eeee7a1c7"},{"amount":1500,"category":"Gifts","type":"Income","date":"2022-11-15","id":"306cb50d-a9b1-4db3-9132-f77da32431a3"},{"amount":7000,"category":"Savings","type":"Income","date":"2022-10-17","id":"75efd7b3-9fd9-42dd-9c17-bc2b6b32b6c2"},{"amount":2499,"category":"Clothes","type":"Expense","date":"2022-11-18","id":"1fa855e5-0849-40c8-a996-a7b95fb3ee60"}];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    const deleteTransaction = (id) => dispatch( { type: 'DELETE_TRANSACTION', payload: id });

    const addTransaction = ( transaction ) => dispatch({ type: 'ADD_TRANSACTION', payload: transaction });

    const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense'? acc - currVal.amount : acc + currVal.amount),0);

    console.log(transactions);

    return(
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
         }}>
            {children}
        </ExpenseTrackerContext.Provider>
    );
}