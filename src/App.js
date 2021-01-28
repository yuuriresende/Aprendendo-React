import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import Person from './Person/Person'

const StyledButton = styled.button`
background-color: ${props => props.alt ? 'red' : 'green'};
color: white;
font: inherit;
border: 1px solid blue;
padding: 8px;
cursor: pointer;

&:hover {
  background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
  color: black;
}
` 
//propriedade do css recebe props por funcao, atingindo o alt do button
//alt no button passou por ref. o valor de showPersons
//showPersons eh alterado com clique do botao(togglePersonHandler)

class App extends Component {
  state = {
    persons:[
      {id: '1', name: 'yuri', age:24},
      {id: '2', name: 'liliana', age:50},
      {id: '3', name: 'marina', age:27}
    ],
    showPersons : false
  }

  // switchNameHandler = (newName) => {
  //   this.setState({
  //     persons:[
  //       {name: newName, age:24},
  //       {name: 'lili', age:50},
  //       {name: 'marina', age:27}
  //     ]
  //   })
  // }
  
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });    
    //em findIndex atraves da funcao anonima com retorno booleano
    //a verificacao eh feita se a pessoa tem o id desejado
    //o retorno da funcao findindex sera o indice(id) da pessoa
    
    const personCopy = {
      ...this.state.persons[personIndex]
    };
    //aqui um objeto eh criado com uma copia de state.persons[id da pessoa]
        
    personCopy.name = event.target.value;
    //a propriedade 'name', no novo objeto, recebe o evento de trocar de nome

    const personsCopy = [...this.state.persons];
    personsCopy[personIndex] = personCopy;
    
    //personscopy recebe o objeto inteiro de persons e atravez do id retornado acima, recebe 
    //a nova propriedade alterada na linha 56, somente naquele indice

    this.setState({persons: personsCopy});   
    //novo estado eh setado, com a copia do antigo, mesclado com as novas propriedades
    
  }

  deleteNameHandler = (personIndex) =>{
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons})

    //armazena em persons uma copia de state.persons
    //atraves da function splice recebendo o index passado no evento
    //persons armazena um novo estado que sera setado em setState
  }

  togglePersonHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState({showPersons: !doesShow});

  //verifica e seta o estado para mostrar ou nao mostrar o componente Person
  }

  render() {   
    const style = {
     

    };
    //inline style, chamado button 

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            name={person.name} 
            age={person.age}
            click={() => this.deleteNameHandler(index)}
            key={person.id}
            changed={(event) => this.nameChangeHandler(event, person.id)}/>
          })}            
        </div>        
      );
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor:'lightred',
      //   color:'black'
      // }
      // metodo alternativo utilizando inline style e Radium(se nao me engano) 
    } 
    //verifica se a propriedade 'showPersons' eh true, se for true, monta os componentes 

    const classes = []
    if(this.state.persons.length <= 2){
      classes.push('red')
    }
    if(this.state.persons.length <= 1){
      classes.push('bold')
    }

    //forma alternativa de "forcar" um classe

    return (
      
      <div className="App">
        <h1>Hello I'm a React App</h1>
        <p className={classes.join(' ')}>Yeah its working</p>
        <StyledButton alt={this.state.showPersons} onClick={this.togglePersonHandler}>
        Name toggle
        </StyledButton>
        {persons}
      </div>
    
    );
  }
}

export default App;

