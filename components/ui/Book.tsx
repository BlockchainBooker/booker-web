import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  user-select: none;
  background: white;
  flex-direction: column;
  align-items: center;
  height: 300px;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

const Book = ({ name, price, author, year }) => {

    return (
        <Container>
            <h1>{name}</h1>
            <p>Author: {author}</p>
            <p>Year: {year}</p>
            <p style={{ color: "red" }}>Price: {price}</p>
        </Container>
    )
}




export default Book;
