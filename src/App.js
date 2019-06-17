import React, { Component } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import './App.scss';

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      num: 1
    }
  }



  render() {
    return (
      <ApolloProvider client={client}>
        <div className="m-5">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className="page-item"
                onClick={() => {
                  if (this.state.num > 1) {
                    return this.setState({ num: this.state.num - 1 })
                  }
                }}
              >
                <button className="page-link" >Previous</button>
              </li>
              <li className="page-item"><button className="page-link" >{this.state.num}</button></li>
              <li
                className="page-item"
                onClick={() => {
                  if(this.state.num<25){
                    return this.setState({ num: this.state.num + 1 })
                  }
                }}
              >
                <button className="page-link" >Next</button>
              </li>
            </ul>
          </nav>
          <Query
            query={gql`
            {
              characters(page: ${this.state.num}) {
                info {
                  count
                  next
                  prev
                  pages
                }
                results {
                  name
                  id
                  image
                }
              }
            }
          `}
          >


            {({
              loading,
              error,
              data: { characters: { info, results } = {} }
            }) => {
              console.log(loading,info, error);
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;



              return results.map(({ name, id, image }) => <div key={id} className="d-flex"> <img alt="character"  src={image} /> <p >{name}</p> </div>);
            }}
          </Query>
        </div>
      </ApolloProvider>
    )
  };
}

export default App;
