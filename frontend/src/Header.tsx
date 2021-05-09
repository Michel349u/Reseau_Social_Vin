import React, {Component, ReactDOM, useState} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Query,useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import {GoogleMap} from 'react-google-maps';
import withScriptjs from "react-google-maps/lib/withScriptjs";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";


const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});

interface users{
    id:number;
    nom:string;
    prenom: string;
    email: string;
    mdp: string;
    type: string;
    lat: number;
    long: number;
    age: number
}
interface vins{
    id:number;
    typev:string;
    typer:string;
    nom:string;
    idVignoble:number;
    image:string;

}
interface posts{
    id: number;
    title : string;
    body : string;
    published : boolean;
    author : {
        id : number;
        nom : string;
        prenom : string;
    }
    comments : [{
        id : number;
        text : string;
        author : {
            nom: string;
            prenom: string;
        }
    }]
}
interface IQueryResultPosts{
    posts : posts[];
}
interface vignobles{

}
interface IQueryResult{
    vins : vins[];
}
interface IQueryResultUser {
    users: users[];
}
const DATA_POSTS = gql`
    {
        posts{
            id
            title
            body
            published
            author{
                id
                nom
                prenom
            }
            comments{
                id
                text
                author{
                    nom
                    prenom
                }
            }

        }
    }`;
const DATA_VIGNOBLES = gql`
{
          users{
            id
            nom
            prenom
            email
            mdp
            type
            lat
            long
            age
          }
        }
    
`;

const DATA_VINS = gql`{    vins {
      id
      typev
      typer
      nom
  idVignoble
  image
      
    }
}`;

export const Posts = () => {
    let { loading, error, data } = useQuery<IQueryResultPosts>(DATA_POSTS);

    if(error) return <p>erreur : {error}</p>
    return (
        <section className="principal">

            <h3 >Liste des Postes</h3>
            {
                error ? (
                        <p>Erreur lors du chargement des données</p>
                    ) :
                    loading ? (
                        <p>Chargement des postes</p>
                    ) : (
                        <table className="tableau">
                            <thead>
                            <tr>
                                <th>Nom du poste</th>
                                <th>Sujet</th>
                                <th>Auteur :</th>
                            </tr>
                            </thead>

                            <tbody className="tabPoste">
                            {data && data.posts.map((element,key) =>
                                {
                                        return (
                                            <tr key={key}>
                                                <td colSpan={1}>{element.title}</td>
                                                <td colSpan={1}> {element.body} </td>
                                                <td colSpan={1}>{element.author.nom.toUpperCase()} {element.author.prenom}</td>

                                            </tr>
                                        )

                                }
                            )
                            }
                            </tbody>
                        </table>
                    )}
        </section>

    );

}
export const Header = () => {
    let { loading, error, data } = useQuery<IQueryResult>(DATA_VINS);
    const [search, setSearch]: [string, (search: string) => void] = React.useState("");
    const onSearchBarChange = (e: { target: { value: string; }; }) => {
        setSearch(e.target.value);
    };


    if(error) return <p>erreur : {error}</p>
    return (
        <section className="principal">

            <h3 >Liste des Vins</h3>
            <div className="search-box">
                <input className="search-txt" type="text" placeholder="Rechercher un vin par type,nom..." onChange={onSearchBarChange}/>
            </div>
            {
                error ? (
                    <p>Erreur lors du chargement des données</p>
                ) :
                loading ? (
                <p>Chargement des vins ...</p>
            ) : (
                <table className="tableau">
                    <thead>
                    <tr>
                        <th>Nom du vin</th>
                        <th>Type</th>
                        <th>Robe</th>
                        <th>Image</th>
                    </tr>
                    </thead>

                <tbody>
                    {data && data.vins.map((element,key) =>
                        {
                        if(search===""|| element.nom.toLowerCase().includes((search.toLowerCase())) || element.typev.toLowerCase().includes((search.toLowerCase())))
                            {
                                return (
                                    <tr key={key}>
                                        <td >{element.nom}</td>
                                        <td> {element.typev} </td>
                                        <td>{element.typer}</td>
                                        <td><img width="50px" src={element.image}></img></td>

                                    </tr>
                                )
                            }
                        }
                      )
                    }
                </tbody>
                </table>
            )}
        </section>

    );
};



interface IProps {
}


interface IState2{
    longitudes : number;
    latitudes : number;
    data : IQueryResultUser;
    search : string;
}
export class InfoVignobles extends React.Component<IProps, IState2>{
    constructor(props:IProps) {

        super(props);
        var u : users = {
            id:0,
            nom:'string',
            prenom: 'string',
            email: 'string',
            mdp: 'string',
            type: 'string',
            lat: 0,
            long: 0,
            age: 0
        };
        var terminal :IQueryResultUser = {users:[u,u]};
        this.state = {
            latitudes :  49.133333,
            longitudes : 6.166667,
            data : terminal,
            search : '',


        }
    }
    componentDidMount(): void {
        this.connexion();
    }
    lookFor = (e: { target: { value: string; }; }) => {
        var t = e.target.value;
        this.setState({search:t})
    }

    connexion = async () => {
        var users: IQueryResultUser;
        users = await client.query({
            query: DATA_VIGNOBLES, variables: {}
        }).then(result => {
            users = result.data;
            this.setState({data:users})

            return users;
        });
        /*
        * <WrappedMap
                        containerElement={<div style={{height: `200px`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                        googleMapURL={`maps.googleapis.com/maps/api/js?key=AIzaSyByJT3-JBDLN1_PpBCfAzJ5xGM7h1YzBq4&language=fr`}
                        loadingElement={<div style={{height: `100%`}}/>}>
                    </WrappedMap>*/
    };
     Map = () => {

        return (
            <GoogleMap
                defaultZoom={17}
                defaultCenter={{lat: this.state.latitudes, lng: this.state.longitudes}}>
            </GoogleMap>
        )
    }
    changeData = (a:number,b:number) => {
         if(a!=null) {
             this.setState({latitudes: a});
             this.setState({longitudes: b});
         }
    }

    render(){
        const WrappedMap : any = withScriptjs(withGoogleMap(this.Map));
        return(
            <section className="principal">

                <h3 >Liste des Vignobles</h3>

                <div style={{width: '50vw', height: '250px', margin: '0 auto', textAlign : 'center'}} className="tabMap">
                    <WrappedMap
                        containerElement={<div style={{height: `100%`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyByJT3-JBDLN1_PpBCfAzJ5xGM7h1YzBq4`}
                        loadingElement={<div style={{height: `100%`}}/>}>
                    </WrappedMap>
                </div>
                <div>
                    <br />
                        <div className="search-box">
                            <input className="search-txt" type="text" onChange={this.lookFor} placeholder="Rechercher un vignoble par nom.." />

                        </div>
                    <p>Cliquez sur le nom d'un vignoble pour l'afficher sur la carte</p>
                    <table className="tableau">
                                <thead>
                                <tr>
                                    <th>Vignoble</th>
                                    <th>Email</th>
                                </tr>
                                </thead>

                                <tbody>
                                {this.state.data != null && this.state.data.users.map((element,key) =>
                                    {
                                        if( element.type!="User" && (this.state.search===""|| element.nom.toLowerCase().includes((this.state.search.toLowerCase())) || element.prenom.toLowerCase().includes((this.state.search.toLowerCase()))))
                                        {
                                            return (
                                                <tr key={key}>
                                                    <td ><button title="Affiche le vignoble sur la map" className="btnInfo" onClick={()=> this.changeData(element.lat,element.long)}>{element.nom.toUpperCase()} {element.prenom}</button></td>
                                                    <td> {element.email} </td>

                                                </tr>
                                            )
                                        }

                                    }
                                )
                                }

                                </tbody>
                            </table>
                        </div>
            </section>
        )
    }
}

interface IState {
    userConnected?: boolean
    data: any;
    userId: number;
    userName: string;
    userType: string;
    typeVinDispo: any[];
    idUser : number;
}
class Form extends React.Component<IProps, IState> { //Connexion de l'utilisateur (simulation par vérification du nom et mot de passe)

    constructor(props:IProps) {
        super(props);
        this.state = {
            data:null,
            userConnected:false,
            userId : -1,
            userName : '',
            userType : '',
            typeVinDispo : [],
            idUser : 0

        };
        this.connexion.bind(this);
        this.deconnexion.bind(this);
        this.getTypeRobe.bind(this);
    }
    getTypeRobe = async () => {
        var users: [];
        users = await client.query({
            query: gql`{
                vins{
                    typer
                }
            }`, variables: {}
        }).then(result => {
            var tab = [];

            for(var i = 0 ; i < result.data.vins.length ; i++){
                tab.push(result.data.vins[i].typer);

            }

            this.setState({typeVinDispo:tab})
            console.log(this.state.typeVinDispo);
            return users;
        });
    }
    connexion = async () => {
         var users: IQueryResultUser;
         users = await client.query({
             query: gql`{
          users{
            id
            nom
            prenom
            email
            mdp
            type
            lat
            long
            age
          }
        }`, variables: {}
         }).then(result => {
             users = result.data;

             return users;
         });
            var array = users.users;

            var  span = document.getElementById('error') as HTMLSpanElement;
             var inptCo = document.getElementById('co') as HTMLInputElement;
             var resCo : string='';var resMdp : string='';
             if(inptCo!=null) resCo=inptCo.value;
             var inptMdp = document.getElementById('mdp') as HTMLInputElement;


            var idMax = array[0].id;
            for(var i = 1 ; i < array.length ; i++) {
                if (array[i].id > idMax) {
                    idMax = array[i].id;
                }
            }
            this.setState({idUser : idMax})

             if(inptMdp!=null) resMdp =inptMdp.value;
             if(resMdp !== '' && resCo !== '') {

                 for (let a = 0; a < array.length; a++) {
                     if (array[a].nom === resCo && array[a].mdp === resMdp) {
                         this.setState({userConnected: true});
                         this.setState({userId: array[a].id});
                         this.setState({userName: array[a].nom});
                         this.setState({userType: array[a].type});
                        this.getTypeRobe();
                         return;
                     }
                    span.innerText = 'Nom d\'utilisateur / mot de passe non trouvé';


                 }
             } else span.innerText = 'Veuillez renseigner votre nom et mot de passe';


     };
    deconnexion = () => {
        this.setState({userConnected:false});
        this.setState({userId:-1});
        this.setState({userName:''});
        this.setState({userType:''});
    };
    createVin = async () => {
        var createUser: any;
        var nomVin = document.getElementById('nomVin') as HTMLInputElement;
        var typeVin = document.getElementById('typeVin') as HTMLInputElement;
        var imageVin = document.getElementById('imageVin') as HTMLInputElement;
        var robeVin = document.getElementById('robeVin') as HTMLInputElement;
        console.log(this.state.idUser+1);
        console.log(nomVin.value);
        console.log(typeVin.value);
        console.log(robeVin.value);
        console.log(this.state.userId);
        console.log(imageVin.value);
        createUser = await client.mutate({

            mutation: gql`mutation creationDeVin($id:ID! ,$nom : String!,$typev: String!, $typer: String!, $idVignoble : ID!, $image: String!)
            {
                createVin(
                    data: {
                        id: $id
                        nom : $nom
                        typev : $typev
                        typer : $typer
                        idVignoble : $idVignoble
                        image : $image
                    }){
                    id

                }
            }`
            , variables: { id:(this.state.idUser+1),nom: nomVin.value, typev: typeVin.value, typer: robeVin.value, idVignoble : this.state.userId, image: imageVin.value}
        }).then(result => {
            createUser = result.data;
            this.setState({idUser:this.state.idUser+1});
            var a = document.getElementById('container') as HTMLDivElement;
            a.style.display = 'none';
            window.location.reload(false);
            return createUser;
        });
    };
    affichePopup = () =>{
      var a = document.getElementById('container') as HTMLDivElement;
      a.style.display = 'block';
    };


    render(){
        return (
            <section className="principal">
                {
                    !this.state.userConnected ? (
                            <div>
                                <label>{this.state.userConnected}</label>
                                <label>Nom d'utilisateur : </label>
                                <input id="co" type="text" /> <span>Ex: "Andrew"</span> <br/>
                                <label>Mot de passe : </label>
                                <input id="mdp" type="password" /> <span>Ex : "1234"</span><br/>

                                <button onClick={this.connexion}>Connexion</button>
                                <br />
                                <span className="erreur" id="error"></span>

                            </div>
                        ) :
                        <div>
                        <p>Bienvenue  {this.state.userName} !  </p>
                            {
                                this.state.userType === 'User' ?
                                    <p>Connecté en tant qu'utilisateur</p> : <p>Connecté en tant que vignoble</p>

                            }
                            <button onClick={this.affichePopup}>Ajouter un vin</button><br />
                            <div className="container" id="container">
                                <div className="block">
                                    <div className="form">
                                    <label>Nom du vin</label><input id="nomVin" type="text"/><br />
                                    <label>Image du vin</label><input id="imageVin" type="text"/><br />
                                    <label>Type de robe</label>
                                        <select id="robeVin">
                                            {
                                                this.state.typeVinDispo.length > 0 ?
                                                    this.state.typeVinDispo.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item}>{item}</option>
                                                        )
                                                    },this)
                                                    :
                                                        <option>Chargement</option>

                                            }
                                        </select>
                                        <br />
                                        <label>Type de vin</label>

                                        <select id="typeVin">
                                            <option value="CHAMPAGNE">Champagne</option>
                                            <option value="VIN_BLANC">Vin blanc</option>
                                            <option value="VIN_ROSE">Vin rosé</option>
                                            <option value="VIN_ROUGE">Vin rouge</option>
                                        </select>
                                        <br />
                                        <button onClick={this.createVin}>Créer mon vin</button>
                                    </div>
                                </div>
                            </div>
                        <button onClick={this.deconnexion}>Déconnexion</button>
                        </div>
                }
            </section>
        );
    }

}
export default Form;
