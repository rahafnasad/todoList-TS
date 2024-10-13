import './App.css'
import { TaskContextProvider } from './components/context/taskContext';
import GetData from './components/GetData'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
function App() {

  return (
    <TaskContextProvider>
      <div className='app'>
    <GetData/>
    </div>
    </TaskContextProvider>
    
  )
}

export default App
