import Home from "./components/Home";
import Signup from "./components/Signup";
import Quesstate from './contextapi/Quesstate'
function App() {
  return (
    <>
      <Quesstate>
        <Home />
        {/* <Signup /> */}

      </Quesstate>

    </>
  );
}

export default App;
