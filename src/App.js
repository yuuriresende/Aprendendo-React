import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person'

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
    //personIndex busca o index no state inicial e verifica se eh o id que quer ser mudado
    //o retorno sera booleano,

    const personCopy = {
      ...this.state.persons[personIndex]
    };

    
    personCopy.name = event.target.value;

    const personsCopy = [...this.state.persons];
    personsCopy[personIndex] = personCopy;

    this.setState({persons: personsCopy});

     

    //
  }

  deleteNameHandler = (personIndex) =>{
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons})

    //copia os objetos de person em um novo objeto
    //atraves da function splice e o id passado por referencia
    //conseguimos salvar o objeto copiado no objeto antigo
  }

  togglePersonHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState({showPersons: !doesShow});

  //verifica e seta o estado para mostrar ou nao mostrar o componente Person
  }

  render() {   
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }

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
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor:'lightred',
        color:'black'
      }
    } 
    //verifica se a propriedade 'showPersons' eh true, 

    const classes = []
    if(this.state.persons.length <= 2){
      classes.push('red')
    }
    if(this.state.persons.length <= 1){
      classes.push('bold')
    }

    return (
    <StyleRoot>
      <div className="App">
        <h1>Hello I'm a React App</h1>
        <p className={classes.join(' ')}>Yeah its working</p>
      
        <button style={style} onClick={this.togglePersonHandler}>Name toggle</button>
        {persons}
      </div>
    </StyleRoot>
    );
  }
}

export default Radium(App);

