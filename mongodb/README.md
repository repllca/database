# MongoDB Docker Compose Setup

このプロジェクトでは、Docker Composeを使用してMongoDBをセットアップします。このREADMEでは、必要な手順とコマンドを説明します。

## 前提条件

- Dockerがインストールされていること
- Docker Composeがインストールされていること

## セットアップ内容

`docker-compose.yml`ファイルで以下の設定を行っています：

- MongoDBの公式イメージを使用
- 初期化用スクリプト (`init_user_db.js`) を読み込み
- ホストマシンとコンテナ間でデータベースファイルを共有するためのボリューム設定
- 初期ユーザーとパスワードの設定

## ディレクトリ構成

以下のようなディレクトリ構造になっています：

```
.
├── docker-compose.yml
├── db/                # データベースデータ用のボリューム
├── configdb/          # ConfigDB用のボリューム
└── init_user_db.js    # 初期化スクリプト
```

## 使用方法

### 1. リポジトリをクローンまたはダウンロード

```bash
git clone <リポジトリのURL>
cd <リポジトリのディレクトリ>
```

### 2. 必要なファイルを確認

- `docker-compose.yml` ファイルが正しく設定されていることを確認してください。
- 初期化スクリプト `init_user_db.js` を適切に編集してください。

### 3. コンテナの起動

以下のコマンドを実行してコンテナを起動します：

```bash
docker-compose up
```

バックグラウンドで実行したい場合は以下を使用してください：

```bash
docker-compose up -d
```

### 4. 動作確認

コンテナが正常に起動したことを確認するには、以下のコマンドを使用します：

```bash
docker ps
```

また、MongoDBに接続するには、以下のコマンドを実行します：

```bash
docker exec -it mongodb mongosh -u root -p password --authenticationDatabase admin
```

### 5. コンテナの停止

以下のコマンドでコンテナを停止します：

```bash
docker-compose down
```

### 6. データの永続化

データは `db/` および `configdb/` ディレクトリに永続化されます。これらのディレクトリを削除しない限り、データは保持されます。

## 環境変数

`docker-compose.yml` で以下の環境変数を設定しています：

- `MONGO_INITDB_ROOT_USERNAME`: 管理者ユーザー名（デフォルト: `root`）
- `MONGO_INITDB_ROOT_PASSWORD`: 管理者パスワード（デフォルト: `password`）

必要に応じて値を変更してください。

## 注意事項

- 初期化スクリプト (`init_user_db.js`) は読み取り専用としてマウントされています (`:ro`)。
- セキュリティのため、本番環境では強力なパスワードを使用してください。

以上でMongoDBのセットアップは完了です。

