from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer


class Base(DeclarativeBase):
    pass


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///User_dara.db"

db = SQLAlchemy(model_class=Base)
db.init_app(app)


class UserData(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    score: Mapped[int] = mapped_column(Integer)


with app.app_context():
    db.create_all()

new_score = UserData(score=9)

with app.app_context():
    db.session.add(new_score)
    db.session.commit()


# @app.route("/")
# def home():
#     return render_template("index.html")
#
#
# if __name__ == "__main__":
#     app.run(debug=True)
