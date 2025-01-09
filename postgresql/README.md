# PostgreSQL Docker Setup

このプロジェクトでは、Dockerを使用してPostgreSQLデータベースを簡単にセットアップできます。

## 前提条件

- Dockerがインストールされていること
- Docker Composeがインストールされていること

## 使用方法

### 1. リポジトリをクローン

まず、このリポジトリをローカルにクローンします。

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. PostgreSQLイメージの構築

`docker-compose.yml` ファイルに基づき、PostgreSQLのDockerイメージを構築します。

```bash
docker-compose build
```

### 3. コンテナの起動

以下のコマンドでコンテナを起動します。

```bash
docker-compose up
```

`-d`オプションを使用しないため、ログはリアルタイムでターミナルに出力されます。

### 4. コンテナの確認

以下のコマンドで、起動しているコンテナを確認できます。

```bash
docker ps
```

コンテナ名として `sample-db` が表示されているはずです。

### 5. PostgreSQLへの接続

PostgreSQLは以下の情報で接続可能です：

- **ホスト名**: `localhost`
- **ポート**: `5432`
- **ユーザー名**: `postgres`
- **パスワード**: `postgres`

例えば、`psql` を使用して接続する場合：

```bash
psql -h localhost -p 5432 -U postgres
```

パスワードの入力を求められたら、`postgres` を入力してください。

## ディレクトリ構造

```plaintext
.
├── docker-compose.yml      # Docker Compose設定ファイル
├── postgres
│   ├── init               # 初期化スクリプト格納ディレクトリ
│   └── image              # PostgreSQL用Dockerイメージ
```

### 初期化スクリプト

`./postgres/init` ディレクトリに配置したSQLスクリプトは、コンテナ起動時に自動的に実行されます。これにより、テーブル作成や初期データ投入を簡単に行えます。

## 環境変数

`docker-compose.yml` で指定されている環境変数は以下の通りです：

- `POSTGRES_USER`: PostgreSQLのユーザー名（デフォルト: `postgres`）
- `POSTGRES_PASSWORD`: PostgreSQLのパスワード（デフォルト: `postgres`）

## コンテナの停止と削除

### コンテナの停止

```bash
docker-compose down
```

### ボリュームの削除（データを完全に削除する場合）

```bash
docker-compose down -v
```

## トラブルシューティング

### 1. ポート競合エラー

ポート `5432` がすでに使用されている場合、`docker-compose.yml` の `ports` セクションでホスト側のポート番号を変更してください。

```yaml
ports:
  - "5433:5432"  # ホスト側のポートを5433に変更
```

### 2. 初期化スクリプトが実行されない

`./postgres/init` ディレクトリ内のスクリプトが正しく配置されているか、ファイル形式が適切かを確認してください。

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)のもとで提供されています。

