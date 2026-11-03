from flask import Flask, send_from_directory
from pathlib import Path

app = Flask(__name__, static_folder="static", static_url_path="")

@app.get("/")
def home():
    return send_from_directory(Path(app.static_folder).resolve(), "index.html")

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
