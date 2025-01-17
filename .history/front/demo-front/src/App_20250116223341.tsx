import React from 'react';
import logo from './logo.svg';
import './App.css';
i
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
