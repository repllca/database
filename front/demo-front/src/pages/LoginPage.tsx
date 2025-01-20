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
    <div style={styles.container}>
      <h1 style={styles.title}>ログインフォーム</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            メールアドレス:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            パスワード:
          </label>
          <input
            type="string"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          送信
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

// スタイルオブジェクト
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '1.2rem',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box' as const,
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    marginTop: '15px',
    color: 'red',
    fontSize: '1rem',
  },
};

export default LoginPage;
