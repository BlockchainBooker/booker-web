import getContract from "lib/getContract";
import getWeb3 from "lib/getWeb3";
import React, { Component } from "react";
import styled from "styled-components";
import swal from 'sweetalert';
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
  balance: number;
  ethBalance: number;
}

class Booker extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      books: [...dummy],
      web3: null,
      accounts: null,
      balance: null,
      contract: null,
      ethBalance: null,
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
      this.setState({ web3, accounts, contract }, this.getEthBalance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  buyBook = async (bookId) => {
    try {


      console.log("buy book", bookId)

      const { accounts, contract } = this.state;
      // await contract.methods.set("val").send({ from: accounts[0] });

      const response = await contract.methods.get().call();
      console.log(response)
      // throw new Error("ee");
      // refetch books
      swal({
        title: "Yay!",
        text: "You bought the book",
        icon: "success",
      });
    } catch (error) {
      console.log(error)
      swal({
        title: "Failed to buy book",
        icon: "error",
      });
    }

  }


  storeValue = async () => {
    const { accounts, contract } = this.state
    await contract.methods.set(5).send({ from: accounts[0] })
    alert('Stored 5 into account')
  };

  getValue = async () => {
    try {
      const { accounts, contract } = this.state
      const response = await contract.methods.getBooks().call({ from: accounts[0] })
      console.log(response)
      this.setState({ balance: response })
    } catch (error) {
      console.log(error)
    }

  };

  addBook = async () => {
    try {
      const { accounts, contract } = this.state
      const id = v4()
      const response = await contract.methods.addBook(`carte ${id}`, "author", 2016, 1).call({ from: accounts[0] })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  getEthBalance = async () => {
    const { web3, accounts } = this.state

    console.log(accounts)

    const balanceInWei = await web3.eth.getBalance(accounts[0])

    console.log(balanceInWei)
    this.setState({ ethBalance: balanceInWei / 1e18 })
  };

  render() {

    const { books } = this.state;

    if (!this.state.web3) {
      return <LoadingIndicator />
    }
    return (
      <div>
        <p>ETH BALANCE: {this.state.ethBalance}</p>
        <button onClick={this.getValue}>Get value</button>
        <button onClick={this.addBook}>add book</button>
        <button onClick={this.storeValue}>set value</button>
        <Grid>
          {books.map(book => <Book key={book.id} {...book} canBuy={true} buyBook={this.buyBook} />)}
        </Grid>
      </div>
    );
  }
}

export default Booker;
