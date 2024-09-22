# Snake Game with High Score and Leaderboard

## Overview
This project is a classic Snake game implemented with a modern twist. The game features a backend to handle user data, high scores, and a leaderboard, providing a personalized gaming experience.

## Watch The Video
[![Video Thumbnail](https://img.youtube.com/vi/mpLLt3EGm0Y/hqdefault.jpg)](https://www.youtube.com/watch?v=mpLLt3EGm0Y)

Click the image to watch the video.👆
## Check Out This LinkedIn Post
[View the LinkedIn post here](https://www.linkedin.com/feed/update/urn:li:activity:7204754130039435264/)

## Live Demo
You can view the live version of the Snake game project at the following link:
[Live Demo](https://snake-game-pi-lemon.vercel.app/)


## Features
- **Personalized Experience**: Players can enter their name to fetch their high score.
- **Real-time Score Updates**: The game updates scores instantly when a new high score is achieved.
- **Leaderboard**: Displays the ranking of all players based on their scores.

## Technologies Used
- **Backend**: Flask and SQLAlchemy
- **Frontend**: HTML, Tailwind CSS, JavaScript

## Project Structure
```
snake-game/
|
├── instance/
│   └── User_data.db
|
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── media/
│       ├── background_music.mp3
│       ├── eat_food.mp3
│       ├── game_over.mp3
│       ├── refresh.png
│       └── turning_sound.mp3
│
├── templates/
│   └── index.html
│
├── app.py
├── README.md
└── requirements.txt
```

## Setup and Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/nikhiltelase/snake-game.git
    cd snake-game
    ```

2. **Create a virtual environment and activate it**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install the dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the application**:
    ```bash
    flask run
    ```

5. **Access the game**:
    Open your web browser and navigate to `http://127.0.0.1:5000`

## How to Play
- Enter your name to start the game.
- Use arrow keys to control the snake.
- Eat the food to grow the snake and increase your score.
- Avoid colliding with the walls and the snake’s body.
- Your high score is saved automatically.
- Check the leaderboard to see your rank among other players.

## Endpoints
- **/save_high_score** (POST): Save the high score for a user.
- **/get_high_score** (POST): Retrieve the high score for a user.
- **/get_all_user** (GET): Retrieve the list of all users and their scores.

## Future Enhancements
- Add more food types with different score values.
- Implement difficulty levels.
- Add sound and music controls.
- Improve mobile responsiveness.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Special thanks to all the open-source libraries and tools used in this project.

Enjoy the game and happy coding! 🎮🐍

---
