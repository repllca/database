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

def insert_data(name, image_path):
    """データベースにデータを挿入します。"""
    try:
        # 画像ファイルをバイナリモードで読み込む
        with open(image_path, 'rb') as file:
            imagebin = file.read()  # 画像データをバイナリとして読み込む
        
        # データベースに接続
        connection = connect()
        cursor = connection.cursor()
        
        # クエリ実行: idはシーケンスで自動的に設定され、imageとnameを挿入
        cursor.execute(
            "INSERT INTO sample (image, name) VALUES (%s, %s)",
            (psycopg2.Binary(imagebin), name)  # 画像データと名前を挿入
        )
        
        # 変更をコミット
        connection.commit()
        print("データが挿入されました。")
    
    except Exception as e:
        print(f"データ挿入エラー: {e}")
    
    finally:
        # リソースを解放
        cursor.close()
        connection.close()
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


def fetch_data():
    """データベースからデータを取得して表示します。"""
    try:
        connection = connect()
        cursor = connection.cursor()
        
        cursor.execute("SELECT id, image, name FROM sample")  # 画像データを取得
        rows = cursor.fetchall()

        for row in rows:
            id = row[0]
            imagebin = row[1]  # 画像のバイナリデータ
            name = row[2]
            print(f"id: {id}, name: {name}")

            # バイナリデータをPILを使って表示
            image = Image.open(io.BytesIO(imagebin))  # バイナリデータを画像として開く
            image.show()  # 画像を表示

    except Exception as e:
        print(f"データ取得エラー: {e}")
    finally:
        cursor.close()
        connection.close()

# サンプルデータの挿入
# filepath = "./images/dog.png"
# insert_data("犬",filepath)

# データの取得
# fetch_data()
#テーブルの名前を取得してその名前と一致したテーブルを返す
print(get_table("class"))