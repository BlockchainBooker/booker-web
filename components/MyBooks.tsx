import getContract from "lib/getContract";
import getWeb3 from "lib/getWeb3";
import React, { Component } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import contractDefinition from "../config/MyLibrary.json";
import Book from "./ui/Book";
import LoadingIndicator from "./ui/LoadingIndicator";


const dummy = [
    { name: "Carte", year: 2016, author: "Autor", price: 2, id: v4() },
    { name: "Carte 2", year: 2016, author: "Autor", price: 2, id: v4() },
    { name: "Carte 3", year: 2016, author: "Autor", price: 2, id: v4() },
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
    ownedBooks: any;
}

class Booker extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            ownedBooks: [],
            web3: null,
            accounts: null,
            contract: null,
        };
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3() as any;


            console.log(web3)
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            console.log(accounts)



            // Get the contract instance.
            const contract = await getContract(web3, contractDefinition);

            console.log(contract);

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract }, this.init);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };

    init = async () => {
        await this.getMyProfile();
    }

    getMyProfile = async () => {
        try {
            const { accounts, contract, web3 } = this.state
            let { ownedBooks = [] } = await contract.methods.getOwnedBooks().call({ from: accounts[0] });

            ownedBooks = ownedBooks.filter((item, index) => ownedBooks.indexOf(item) === index)

            let promises = [];

            ownedBooks.forEach(book => {
                promises.push(this.getBook(book))
            });

            const all = await Promise.all(promises)

            console.log("===========", all)

            this.setState({ ...this.state, ownedBooks: all })

        } catch (error) {
            console.log("getprofile err", error)
            throw error
        }
    }


    getBook = async (bookId) => {
        const { accounts, contract, web3 } = this.state
        const { author, name, price, default_amount: amount } = await contract.methods.getBook(bookId).call({ from: accounts[0] });
        return { author, name, price, amount, id: bookId, year: 2016 }
    }

    render() {

        const { ownedBooks } = this.state;

        if (!this.state.web3) {
            return <LoadingIndicator />
        }
        return (
            <div>
                <Grid>
                    {ownedBooks.map(book => <Book key={book.id} {...book} canBuy={false} />)}
                </Grid>
            </div>
        );
    }
}

export default Booker;
