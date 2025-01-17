import psycopg2

# PostgreSQL への接続情報
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "bank_db"
DB_USER = "postgres"
DB_PASSWORD = "postgres"

def connect():
    """PostgreSQL データベースへの接続を確立します。"""
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

def get_table(table_name):
    """指定されたテーブルのデータを取得します。"""
    connection = connect()
    cursor = connection.cursor()

    try:
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()
    except psycopg2.Error as e:
        print(f"Error: {e}")
        rows = []
    finally:
        cursor.close()
        connection.close()

    return rows

def write_to_table(table_name, columns, values):
    """
    指定されたテーブルにデータを挿入します。

    Parameters:
        table_name (str): テーブル名
        columns (list): 挿入する列名のリスト
        values (tuple): 挿入する値のタプル
    """
    connection = connect()
    cursor = connection.cursor()

    column_names = ", ".join(columns)
    placeholders = ", ".join(["%s"] * len(values))
    query = f"INSERT INTO {table_name} ({column_names}) VALUES ({placeholders})"

    try:
        cursor.execute(query, values)
        connection.commit()
    except psycopg2.Error as e:
        print(f"Error: {e}")
    finally:
        cursor.close()
        connection.close()


def login_vulnerable(email, password):
    # データベース接続
    print("データベースに接続中...")
    conn = connect()
    cursor = conn.cursor()

    # クエリの作成
    query = f"SELECT * FROM customers WHERE email = '{email}' AND password = '{password}';"
    print("実行するクエリ:", query)  # デバッグ用出力

    try:
        cursor.execute(query)

        # 結果の確認
        result = cursor.fetchone()
        if result:
            print("ログイン成功")
        else:
            print("ログイン失敗: 指定したメールアドレスまたはパスワードが間違っています")

    except Exception as e:
        print("エラーが発生しました:", e)

    cursor.close()
    conn.close()

# テーブルの内容を表示
# print(get_table("customers"))

login_vulnerable("adminexample.com", "admin123")