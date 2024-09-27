import { useState } from "react";
import { Button } from "./components/ui/button";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className="bg-red-50">hi</div>
    <Button>Click me</Button>
    </>)
}

export default App;
