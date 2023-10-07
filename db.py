import psycopg2

db_params = {
  'dbname': 'battleship',
  'user': 'postgres',
  'password': 'root',
  'host': 'localhost', 
  'port': '5432'       
}

__connection = None

def get_connection():
  global __connection
  if __connection == None:
    __connection = psycopg2.connect(**db_params)
  return __connection

def get_scores():
  scores_string = "(user_id, score, id)\n"
  cursor = get_connection().cursor()

  query="SELECT * FROM scores;"
  cursor.execute(query)
  
  results = cursor.fetchall()
  for row in results:
    scores_string = scores_string + str(row) + "\n"

  cursor.close()
  print("String scores", scores_string)
  return scores_string

def get_games():
  games_string = ""
  cursor = get_connection().cursor()

  query="SELECT * FROM games;"
  cursor.execute(query)
  
  results = cursor.fetchall()
  for row in results:
    games_string = games_string + str(row) + "\n"

  cursor.close()
  print("String games", games_string)
  return games_string

def save_scores(score):
  print("Saving scores")
  cursor = get_connection().cursor()
  query="INSERT INTO scores (user_id, score) VALUES (%s, %s);"
  for s in score:
    id=s["id"]
    value=int(s["score"])

    print(id, value)

    cursor.execute(query, (id,value,))

  get_connection().commit()

  cursor.close()

def save_game(winner_id):
  winner_id=str(winner_id)
  cursor = get_connection().cursor()

  query="INSERT INTO games (winner_id) VALUES (%s);"
  cursor.execute(query, (winner_id,))

  get_connection().commit()

  cursor.close()
