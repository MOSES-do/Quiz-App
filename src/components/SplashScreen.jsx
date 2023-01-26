

function SplashScreen({ setShowScreen }) {
  // const ref = useRef();
  // console.log(ref.current);
  // const revealRef = () => {
  //   ref.current.style.display = 'none';
  //   ref.current.style.pointerEvents = "none";
  //   ref.current.style.transition = "100ms ease-out";
  // }


  return (
    // <div ref={ref} className="splash">
    <div className="splash">

      <h1>Quizzical</h1>
      <p>Test your knowledge base with random questions</p>
      <button onClick={() => setShowScreen(oldValue => !oldValue)} className="start-btn">Start quiz</button>
      {/* <button onClick={revealRef} className="btn">Start quiz</button> */}
    </div>
  )
}

export default SplashScreen;
