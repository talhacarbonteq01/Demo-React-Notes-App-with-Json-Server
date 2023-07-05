import logo from './logo.svg';
import './App.css';

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Talha'
  const age = 23

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Hamza' age={23 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App;
