import { h } from "preact";
import AuthProvider from "./AuthProvider";
import Routes from './Routes';
import './scss/index.scss';


function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
