import {useRoutes} from 'react-router-dom'
import RootRouter from "./route";

const App = () => {
  return useRoutes(RootRouter)
}

export default App;
