from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String


class Base(DeclarativeBase):
    pass


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///User_dara.db"

db = SQLAlchemy(model_class=Base)
db.init_app(app)


class UserData(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    score: Mapped[int] = mapped_column(Integer)


with app.app_context():
    db.create_all()


@app.route("/save_high_score", methods=['POST'])
def save_high_score():
    data = request.json
    save_score = data['save_score']
    print(save_score)
    # save score in dataBase
    user = db.session.execute(db.select(UserData).where(UserData.name == "nikhil")).scalar()
    user.score = save_score
    db.session.commit()

    return jsonify({'success': True})


@app.route("/get_high_score")
def get_high_score():
    user = db.session.execute(db.select(UserData).where(UserData.name == "nikhil")).scalar()
    return jsonify({"score": user.score})


@app.route("/")
def home():
    # get score
    user = db.session.execute(db.select(UserData).where(UserData.name == "nikhil")).scalar()
    high_score = user.score
    return render_template("index.html", high_score=high_score)


if __name__ == "__main__":
    app.run(debug=True)
