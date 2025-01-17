from sanic import Sanic
from sanic.response import text,json
from write import *
# PostgreSQL への接続情報
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "bank_db"
DB_USER = "postgres"
DB_PASSWORD = "postgres"

app = Sanic("app")

@app.route("/")
async def main(request):
    login_vulnerable("admin@example.com", "admin123")
    return text("hello world")


@app.route("/form", methods=["POST"])
async def handle_form(request):
    
    print("リクエスト受信:", request.form)
    password = request.form.get("email")
    email = request.form.get("password")
    login_vulnerable(email, password)
    return json({"password": password, "email": email})



@app.get("/users")
async def users(request):
    return text("nitani")    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7776)