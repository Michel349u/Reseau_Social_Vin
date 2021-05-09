import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Header,  InfoVignobles, Posts } from './Header';
import Form from './Header';

const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});
interface IProps {
}
interface IState {
    visible?: boolean
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visible: true,

        };
    }
    changeVisibility = () =>{
        this.setState({visible:!this.state.visible})
    };

    render() {
        if(this.state.visible) {
            return (
            <ApolloProvider client={client}>
                <div className="App App-header">
                    <Form/>
                    <div className="afficheVignobles">
                        <button className="vignobles" onClick={this.changeVisibility} >Afficher les vignobles</button>
                    </div>
                    <Header/>
                    <Posts/>
                </div>
            </ApolloProvider>
        );}
        else return(
            <ApolloProvider client={client}>
                <div className="App App-header">
                    <div className="afficheVignobles">
                    <button onClick={this.changeVisibility}>Retour à l'accueil</button>
                    <InfoVignobles />
                    </div>
                </div>
            </ApolloProvider>
        )

    }
}
export default App;
