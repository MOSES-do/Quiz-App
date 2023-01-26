# Quiz-App

A solo project from the Bob Ziroll react series.

This app fetches questions from an api and scores users upon submission.

In the process of building this app I learnt:

1. React hooks(useState and UseEffect)
2. Props drilling (Passing elements from parent to child component)
3. Conditional rendering. E.g the splash screen was rendered with a useState boolean value
4. Using boolean values to determine the state of an app in order to pass a conditional statement
   for another action. E.g. A useState was set up with a boolean value of "false" and only to be true
   if the question clicked from the api useState is the same as the currentQuestion in the option props.
   If so, we pass the selection answer to the return value of the api state.
   
 Challenges:
 I had issues when i mapped the return value of the api in both the "Exam" component and the "Options"components, as
 it caused the options displayed within each question to be the number of questions in total.
 
 Solution: I mapped the Exam component and passed its value to the Option component and then, mapped the value passed
 in the Option component.


It was a fun build in all. I learnt alot.
https://quiziffy.netlify.app/
