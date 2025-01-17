import React, { useState } from 'react';

// ログインページコンポーネント
const LoginPage: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await fetch('http://localhost:7776/form', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onSuccess(); // ログイン成功時にページを切り替える
      } else {
        setError('ログインに失敗しました');
      }
    } catch (err) {
      console.error(err);
      setError('サーバーエラーが発生しました');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;


