from flask import Flask, request, render_template, jsonify
from dotenv import load_dotenv
import os

load_dotenv()
MONGODB_URL = os.getenv("MONGODB_URL")

app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient({MONGODB_URL})
db = client.toyproject220712

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/movie')
def movie():
  return render_template('movie.html')

@app.route("/todo", methods=["POST"])
def list_post():
  list_receive = request.form['list_give']
  doc = {'list': list_receive}
  db.test.insert_one(doc)
  return jsonify({'msg': 'db에 연결 성공!'})

if __name__ == '__main__':
  app.run('0.0.0.0', port=5000, debug=True)