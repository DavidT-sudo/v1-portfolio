'useClient';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
      <Projects />
    </div>
  );
}

export default App;
