from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send
import utils
import db
import mail


game=[
  # {
  #   "id":0,
  #   "score":0,
  #   "boats":[
  #     {
  #       "x": 1,
  #       "y":4
  #     }
  #   ],
  # }
]
app = Flask(__name__)
socketio = SocketIO(app)
max_score = 0


@app.route('/send/email')
def send_email():
  print("innsend mail")
  on_send_email()
  return ""

@app.route('/player')
def player_page():
  id = utils.generate_random_id()
  return render_template('player.html', id=id)

@app.route('/')
def index():
  global game
  game=[]
  return render_template('index.html', players_length=1)


@socketio.on('connected/player')
def handle_connected_player(message):
  print("connected player->", message)
  game.append({"id": message, "score":0, "boats":[]})
  emit('update/players', game, broadcast=True)


@socketio.on('attack')
def handle_attack(message):
  x, y, id = message["x"],message["y"],message["id"]
  print('Mensaje recibido de attack', x,y,id)
  on_player_attack(x,y,id)
  emit('update/score', game, broadcast=True)
  emit('update/attack', {"x":x, "y":y, "id": id}, broadcast=True)

@socketio.on('connected/boats')
def handle_boats(message):
  boats, id = message["boats"],message["id"]
  on_send_boats(id, boats)

def on_send_boats(id, boats):
  global max_score
  max_score = len(boats)
  update_game_field_by_id(id, "boats", boats)

def update_game_field_by_id(id, fieldName, value):
  global game
  for i,g in enumerate(game):
    current_id = g["id"]
    if current_id != id:
      continue
    game[i][fieldName]= value

def on_player_wins(id):
  print("player wins ->", id)
  db.save_scores(game)

def on_send_email():
  mail.send_results(db.get_scores())

def on_player_acert_attack(id):
  global game
  for i,g in enumerate(game):
    current_id = g["id"]
    current_score = g["score"]
    if current_id != id:
      continue
    game[i]["score"]= current_score+1
    # db.save_scores(game)
    if current_score+1 == max_score or current_score+1%max_score==0:
      on_player_wins(id)

def on_player_attack(x,y,id):
  for g in game:
    current_id = g["id"]
    current_boats = g["boats"]
    if (current_id == id):
      continue
    for boat in current_boats:
      current_x, current_y = boat["x"], boat["y"] 
      if (current_x == x and current_y == y):
        print("Acerted")
        on_player_acert_attack(id)



if __name__ == '__main__':
  socketio.run(app, debug=True)
