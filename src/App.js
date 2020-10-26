import './App.css';
import { useState, useMemo, useEffect } from 'react';

// slow function delays the activity of doubling the number and changing the theme
// its not just slowing hte updating and doubling hte number but for on clicking Chnage theme button also it takes half a second to actualy chnage the theme.
// The reason is when we update state in react its gonna re-render our entire component and it gonna runt he entire App() function form top to bottom
// which meamns that the slow function gets called every single time that we render our ap component.
// So whether we are updating the number or chnging the theme or whether some other componnet is causing this component to rerender, you are going to be be forcing it to go throught that slow function over and over again.
// this is a really big performance problem whne you have really slow functions that dont realy chnage that often
// React has builtin way - useMemo hook. memo stands for memoization which is essentially the idea of chaching the value so that you dont have to recompute it every single time.
// SO here slowFunciton(number) takes  number as paramter and its always going to give us same output evry time we give it the same input. So we can cache that value input and the output it gives us.
// That way if the number doesn't change, we dont have to recalculate our slow function over and over again.
// say useMemo() and give it a function and this funciton is going to be the thing that we actually memoize and we return the slowFunction.
// the second parameter is the dependency that it has, the thing that changes. ([number] in this case.).
// whe the number chnages, we need to re-run the code (funciton) inside the useMemo hook. but if the number doent chnage, we dont need to re-run this function inside the useMemo().

// change the number, the double number shows up with  little delay. ( as expected)
// when we click chane theme, the theme changes instantaniously. Thats because when we go thruough our code, we click chnage theme it cause our compoent to re-render. When it goes to useMemo(), it says well the number is exactly the same as it was last time so we are not going to recall the slowFunction() because we already know what the result is. its the exact same thing as it was last time. So we are saving ourself from recalculating hte number with the slowFucntion.

// we should not memoize everything because it gives us some performance and memory overheads.
// eg. useMemo() and additional function is being called on every render. and also its saving the previous number value in some memory variable.

function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  // const doubleNumber = slowFunction(number);
  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number]);

  // const themeStyles = {
  //   backgroundColor: dark ? 'black' : 'white',
  //   color: dark ? 'white' : 'black'
  // }

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black'
    }
  }, [dark])

  //----------------------

  // Use case - referential equlity - when you compare 2 diff variables in JS, it sgoing to compare their reference in the case of objects and arrays.
  // here themeStyles is a specific object and no two objects are same
  // change a number in the number input, it prints 'Theme chnaged ' to the console. WHY ?
  // Every time we run the App function, we get a new themeStyle object being created and this new themeStyle object is not the same as old one
  // To make sure that we run useEffect only when our themeStyle object actually gets updated, we can use useMomo again. 
  // So now if our dark variable doesnt change, we dont reupdate our themeStyles so we get the exact same reference as we had the preveious time we rendered our app
// So now useEffect is comparing our old themeStyles with our new themeStyles but they both reference the exact same object


  useEffect(() => {
    console.log('Theme changed');
  }, [themeStyles])

  return (
    <div className="App">
      <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} /><br />
      <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
      <div style={themeStyles}>{doubleNumber}</div>
    </div>
  );
}

function slowFunction(num){
  console.log('Calling slow function');
  for(let i = 0; i <= 1000000000; i++){
  }
  return num * 2;
}

export default App;
