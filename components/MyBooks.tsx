import getContract from "lib/getContract";
import getWeb3 from "lib/getWeb3";
import React, { Component } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import contractDefinition from "../config/SimpleStorage.json";
import Book from "./ui/Book";
import LoadingIndicator from "./ui/LoadingIndicator";

const dummy = [
    { name: "Carte", year: 2016, author: "Autor", price: 2, id: v4() },
    { name: "Carte 4", year: 2016, author: "Autor", price: 2, id: v4() }];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 16px;
`;

interface Props {
}

interface State {
    books: any;
    web3: any;
    accounts: any;
    contract: any;
}

class MyBooks extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            books: [...dummy],
            web3: null,
            accounts: null,
            contract: null,
        };
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3() as any;

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const contract = await getContract(web3, contractDefinition);

            console.log(contract);
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: contract });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };


    updateValue = async () => {
        try {
            const { accounts, contract } = this.state;
            await contract.methods.set("val").send({ from: accounts[0] });

            const response = await contract.methods.get().call();

            console.log(response);

        } catch (error) {
            console.log("eroare la update Value", error);
        }
    };

    render() {

        const { books } = this.state;

        if (!this.state.web3) {
            return <LoadingIndicator />
        }
        return (
            <div>
                <Grid>
                    {books.map(book => <Book key={book.id} {...book} />)}
                </Grid>
            </div>
        );
    }
}

export default MyBooks;
