
/**
 * react
 * 2. React: Timer Component
Create a React Timer component that counts down from a initial value, updates every second,
and allows the user to stop the timer manually.


- pass an inital value to ther component through a prop named initial.
- see the timer start automatically when the component mounts, decreasing by 1 every second.
  - Example: if initial=100 after 1 second, it should display 99, then 98, and so on.
- see the timer stop automatically when the value reaches 0.
- click the stop timer button to stop the countdown at its current value

the following data-testid attributes are required in the component for the tests to pass:
component | attribute
Title | app-title
Timer value | timer-value
Stope timer button | stop-button

Please note that components have these data-testid attributes for test cases and certain  classes and ids for rendering purposes.
they should not be changed.


//App.js
import React from 'react';
import Timer from './components/Timer';

const App = ({initial}) => {
  return (
    <div className='App min-h-screen bg-background'>
      <main>
        <Timer initial={initial} />
      </main>
    </div>
  );
}

export default App;

//timer.js
import React from 'react';
import "./index.css"

export default function Timer({ initial }) {
  return (
    <div className='timer-container'>

     //Timer Card
      <div className='timer-card'>
        //Timer display
        <div className='timer-display-wrapper'>
          <div className='timer-label'>Timer</div>

          //Static placeholder (no logic)
          <div className='timer-value' data-testtid="timer-value">
            //leave empty like original boilerplate, or show {initial} if desired
          </div>

          <div className='timer-subtitle'>Seconds remaining</div>
        </div>

        //stop button (no handler)
        <button className='btn-stop data-testid="stop-button"'>
          Stop Timer
        </button>
      </div>
    </div>
 */