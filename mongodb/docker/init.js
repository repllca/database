db = db.getSiblingDB('mydatabase'); // データベース名を指定
db.createUser({
  user: "nitani22", // 作成するユーザー名
  pwd: "tairakenn", // パスワード
  roles: [{ role: "readWrite", db: "mydatabase" }] // 権限
});