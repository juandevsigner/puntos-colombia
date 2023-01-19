import AllRoutes from "./routes/AllRoutes";
import { handelRightClick } from './components/AppUtility';

const App = () => {
  document.addEventListener('contextmenu', handelRightClick);
  return <AllRoutes />;
};

export default App;
