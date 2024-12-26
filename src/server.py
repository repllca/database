from sanic import Sanic
from sanic.response import text

app = Sanic("app")

@app.route("/")
async def main(request):
    return text("hello world")

@app.get("/users")
async def users(request):
    return text("nitani")    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7776)