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
    score = data['score']
    name = data['name']
    # save score in dataBase
    user = db.session.execute(db.select(UserData).where(UserData.name == name)).scalar()
    user.score = score
    db.session.commit()
    return jsonify({'success': True})


@app.route("/get_high_score", methods=['POST'])
def get_high_score():
    data = request.json
    name = data['user_name']
    user = db.session.execute(db.select(UserData).where(UserData.name == name)).scalar()
    if user == None:
        new_user = UserData(name=name, score=0)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"score": new_user.score})
    else:
        return jsonify({"score": user.score})


@app.route("/get_all_user")
def get_all_user():
    # get all user data
    all_data = db.session.execute(db.select(UserData).order_by(UserData.score)).scalars()
    # creating users list they contain user dict
    users = []
    i = UserData.query.count()
    for user in all_data:
        user_dict = {}
        user_dict["rank"] = i
        user_dict["name"] = user.name
        user_dict["score"] = user.score
        users.append(user_dict)
        i -= 1

    users_list = list(reversed(users))
    return jsonify({'all_users': users_list})


@app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
