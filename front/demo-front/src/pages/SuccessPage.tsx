import React from "react";

const SuccessPage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff", // 背景色を薄い青に設定
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    color: "#333",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#4caf50", // 成功感を表す緑色
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: "1.2rem",
    color: "#555",
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "1.5rem",
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const handleButtonHover = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.style.backgroundColor = "#45a049"; // ホバー時の色
  };

  const handleButtonMouseOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.style.backgroundColor = "#4caf50"; // 元の色に戻す
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>ログイン成功！</h1>
      <p style={paragraphStyle}>ようこそ、アプリケーションへ。</p>
      <button
        style={buttonStyle}
        onMouseOver={handleButtonHover}
        onMouseOut={handleButtonMouseOut}
      >
        ホームに戻る
      </button>
    </div>
  );
};

export default SuccessPage;

