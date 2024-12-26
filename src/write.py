import psycopg2
from PIL import Image
import io

# PostgreSQL への接続情報
DB_HOST = "localhost"         # Dockerのコンテナをローカルで動かしている場合は "localhost"
DB_PORT = "5432"              # PostgreSQL のポート番号
DB_NAME = "sample_db"         # 接続するデータベース名
DB_USER = "postgres"          # データベースユーザー名
DB_PASSWORD = "postgres"      # パスワード

def connect():
    """PostgreSQL データベースへの接続を確立します。"""
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

    
#テーブルの名前を取得してその名前と一致したテーブルを返す
def get_table(table_name):
    connection = connect()
    cursor = connection.cursor()

    cursor.execute(f"SELECT * FROM {table_name}")
    rows = cursor.fetchall()

    # テーブルの内容を表示
    cursor.close()
    connection.close()
    return rows



print(get_table("class"))