import React ,{ useState }from 'react';
import logo from './logo.svg';
import './App.css';
import SuccessPage from './pages/SuccessPage';
import LoginPage from './pages/LoginPage';
LoginPage
// メインコンポーネント
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <div>
      {isAuthenticated ? (
        <SuccessPage />
      ) : (
        <LoginPage onSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
};

export default App;
