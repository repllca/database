import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router を使用してページ遷移

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const navigate = useNavigate(); // ページ遷移のための関数

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await fetch('http://localhost:7776/form', {
        method: 'POST',
        body: formData, // フォームデータを送信
      });

      const data = await res.json();

      if (data.success === true) {
        // 成功時にページ遷移
        navigate('/dashboard'); // 遷移先のパス（例: ダッシュボード）
      } else {
        // エラー応答の処理
        setResponse('ログインに失敗しました: ' + (data.message || '理由不明'));
      }
    } catch (err) {
      console.error(err);
      setResponse('サーバーエラーが発生しました。');
    }
  };

  return (
    <div>
      <h1>ログインフォーム</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">送信</button>
      </form>
      {response && (
        <div>
          <h2>サーバーからの応答:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default LoginPage;


