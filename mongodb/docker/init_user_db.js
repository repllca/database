db = db.getSiblingDB('user_management');

// ユーザーコレクションの作成
db.createCollection('users');

// 初期ユーザーの追加（例: 管理者アカウント）
db.users.insertOne({
  username: "admin",
  email: "admin@example.com",
  password_hash: "$2b$10$examplehash", // パスワードはハッシュ化（例: bcrypt使用）
  created_at: new Date(),
  updated_at: new Date(),
  roles: ["admin"],
  is_active: true
});
