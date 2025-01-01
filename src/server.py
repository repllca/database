from sanic import Sanic
from sanic.response import text,json

app = Sanic("app")

@app.route("/")
async def main(request):
    return text("hello world")


@app.route("/form", methods=["POST"])
async def handle_form(request):
    print("POST /form - リクエスト受信:", request.form)
    password = request.form.get("email")
    email = request.form.get("password")
    return json({"password": password, "email": email})



@app.get("/users")
async def users(request):
    return text("nitani")    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7776)