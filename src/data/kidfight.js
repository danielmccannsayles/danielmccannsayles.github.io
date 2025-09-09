export const kidFightGame = {
  id: "kid-fight-game",
  title: "Kid-Fight Game",
  date: "Oct - Nov 2024",
  summary: "A game exploring using an LLM to arbitrate a fight with words. Sort of like when you were a kid, and would have an imaginary fight where you one-upped the other person",
  content: [
    {
      type: "md",
      content: `My friend Devin is interested in game design. I was talking with him about how having 'real AI' in games is going to allow awesome interactive stuff. 
    
> I thought it would be fun to see what could be done creatively with AI.

As a kid I used to have arguments with friends where we would one up the other. I would have a laser, he would have a laser deflecting mirror, I would have gone back in time and weakened his mirror so it cracked, etc. 

I wanted to approximate some of this back and forth creativity - in a table-top manner, like Magic or Pokemon.

*There were two distinct phases to this project* - I'll talk a bit about each, but only show code for the second. You can check out the repository [here](https://github.com/danielmccannsayles/KidFightGame) on my github

#### First pass / Pygame era:
We first started by finding a pygame game implementing chess. It made sense to just start with that chessboard. Unfortunately this introduced a pattern of coupled game display and logic that lasted for a while. 

> A fun (terrible) problem I encountered was in using a matrix to create the board, and then trying to index into it using 'x' and 'y', which are unintuitively 'flipped'. This same thing came up recently with Tensors, and I experienced flashbacks..

This was pretty fun. Lots of learning how to use pygame. I learned about using pygame events to allow occurences to happen in time w/ the clock. Calling chatgpt was done asynchronously to avoid stalling, in a new thread. We implemented some path finding and behavioural logic for the game pieces.

A lot of this part of the project was sort of irrelevant to my larger goals. I spent a day making a custom input for pygame that expended to fit text. We spent a while getting rid of the chess code - e.g. click and other methods. Adding in all the correct offsets in pygame. 

I learned a fair amount about OOP as well, something I'm not super familiar with. Pygame is cool, but it also took a fair amount of boilerplate to make something simple. Though maybe this is just all game development.. it's [really not my field](https://youtu.be/noZ1gBRXd5E?t=314) .

#### Second pass / Simulation era:

I ended up being busy for a bit, but when I came back I had a fresh perspective. I realized that this would never be fun/useful unless two people could type, which necessitates multiplayer. So I set up a simple network protocol using the socket library. 

This also led me to decouple the display logic and the game logic, and cleared up a lot. Instead of having all these pygame classes that handled their state and display, I have all that logic in python classes on the server. I communicate the board state through a json object, and have pygame classes on the frontend/client. You can see below the seperation of logic - the client cares about looks, and the server cares about functionality.`,
    },
    {
      type: "code",
      contents: [
        {
          language: "python",
          content: `# Client implementation of Board
class Board:
    def __init__(self, size: int, x_offset, y_offset, rows: int):
        self.width = size
        self.height = size
        self.x_offset = x_offset
        self.y_offset = y_offset
        self.square_size = size // rows
        self.rows = rows
        self.squares: list[Square] = self.generate_squares()

    def update_board(self, board_list: list[str | PieceData]):
        """Update board from json data. Clear everything on squares, then re-add"""
        if len(self.squares) != len(board_list):
            print(
                "This should not happen.. mismatch btwn server and client ",
                len(self.squares),
                len(board_list),
            )

        for data, square in zip(board_list, self.squares):
            square.occupying_piece = None
            square.highlight = False

            if is_piece_data(data):
                piece = Piece(self.square_size, data)
                square.occupying_piece = piece

            elif data == "H":
                square.highlight = True

    def draw(self, display):
        for square in self.squares:
            square.draw(display)
            
    ...`,
        },
        {
          language: "python",
          content: `# Server implementation of Board
class Board:
    def __init__(self, rows: int):
        self.rows = rows
        self.squares: list[list[Square]] = self.generate_squares()
        self.bases = self.make_bases()
        self.characters: dict[str, list[Character]] = {"black": [], "white": []}

    def to_json(self):
        """Got through the squares and serialize each of them and return it. Returns a flattened list"""
        flat_squares = [square for columns in self.squares for square in columns]
        json_list = [square.to_json() for square in flat_squares]

        return json_list

    def generate_squares(self):
        output: list[list[Square]] = []
        for row in range(self.rows):
            inner_list = []
            for column in range(self.rows):
                inner_list.append(Square(row, column))

            output.append(inner_list)
        return output

    def add_piece_safe(self, pos: tuple[int], piece: DefaultPiece):
        """Add the given piece to the given position on the board. Fails quietly w/ console log. Sets the pieces position to square position"""
        square = self.get_pos(pos)
        if not square:
            print("invalid square", pos)
            return
        if self.check_if_occupied(square):
            print("already occupied")
            return

        square.occupying_piece = piece
        piece.set_pos((square.row, square.column))

    ...`,
        },
      ],
    },
    {
      type: "md",
      content: `They communicate through a simple network protocol, using sockets.

\`mserver.py\` hosts a server which starts threaded processes as clients join. 
\`mclient.py\` initiates a new pygame \`ServerGame.py\` process that uses the Network \`network.py\` class to communicate with the server. 

Below are snippets from each file to hopefully convey their main functions.`,
    },
    {
      type: "code",
      contents: [
        {
          language: "python",
          content: `# mserver
import socket
from _thread import start_new_thread
from client.helpers import get_mock_board
import json
from server.ServerGame import ServerGame
from address import SERVER_ADDRESS

# Class to handle game logic. 
server_game = ServerGame()

# Global to communicate whether players are here or not
players = {"black": False, "white": False}

def threaded_client(conn: socket.socket, color: str):
    # Start connection by sending initial obj
    initial = json.dumps(
        {"loading": False, "board": server_game.board.to_json()}
    ).encode()
    conn.send(initial)

    while True:
        try:
           # Recieve Data ..

            # If we get data saying we want a new character
            if "description" in json_data:
                server_game.create_character(color, json_data["description"])
                print("recieved description ", json_data["description"])

            # Call this every iteration. handles game logic & and other stuff
            board_json, loading = server_game.gameloop(color)

            # Return 
            conn.sendall(json.dumps({"loading": loading, "board": board_json}).encode())
        except Exception as e:
           break

    print("Lost connection to ", color)
    players[color] = False
    conn.close()


""" Handle new connections"""
while True:
    p1 = players["black"]
    p2 = players["white"]

    conn, addr = s.accept()

    # Add players ..`,
        },
        {
          language: "python",
          content: `# mclient => ServerGame.py
import time
import threading
from llm.call_gpt import generate_character_stats_multiplayer
from server.classes.Board import Board
from server.classes.Character import Character


class Clock:
    def __init__(self, interval, stopped=False):
        """Interval in seconds"""
        self.interval = interval
        self.last_time = time.time()
        self.stopped = stopped

    def check(self):
        """Returns true if interval has passed"""

    ...


class ServerGame:
    def __init__(self):
        self.main_clock = Clock(1)
        self.sub_clock = Clock(1, stopped=True)

        # Board object for representation.
        self.board = Board(10)

        # Lock prevents main check from running twice (called in two threads)
        self.lock = threading.Lock()

    def callback(self, response, color):
        """Callback is a method to have access to self - called in thread to get async GPT"""
        self.character_to_add[color] = Character(
            (0, 0),
            color=color,
            board=self.board,
            attack_dmg=response["AD"],
            hp=response["HP"],
            move_distance=response["MD"],
        )

    def create_character(self, color, description: str):
        "Call gpt to create a character. Currently making a new thread to do so. daemon means it will be terminated"
        if self.loading_character[color]:
            return

        self.loading_character[color] = True
        description = description or "bland default character"

        threading.Thread(
            target=generate_character_stats_multiplayer,
            args=(description, color, self.callback),
            daemon=True,
        ).start()

   

    def gameloop(self, color):
        """Runs constantly in while loop"""
        if self.main_clock.check():
            # Do stuff..

        if self.sub_clock.check():
            self.move_character()

        # Check if we need to add a character
        character = self.character_to_add[color]
        if character:
            # Add character..

        # Return current board
        return self.board.to_json(), self.loading_character[color]`,
        },
      ],
    },
    {
      type: "md",
      content: `The original idea of this game was to explore the added creativity an LLM could bring. In this case, the idea was to have an impartial judge add or subtract to bonuses to characters depending on the existing characters on the board.

A next step was to add behavior, and then to add special moves, but we did not get around to this.
Instead we were pretty sidetracked by building out the main game engine functionality.
Anyways here's the general prompt/schema we hoped to follow.

Of some note is the Strength section. We wanted to allow the LLM judge to give bonuses to characters against other characters specifically.`,
    },
    {
      type: "code",
      contents: [
        {
          language: "python",
          content: `CHARACTER_PROMPT = """
You are a character creator. Your job is to determine the stats of a character based on these two things:
1. A list of existing characters on the board (a list of json objects, of the format {id: <int>, description: <str>}) 
2. A description of the character passed in (a string)

These stats are as follows:
1. HP - Health points. This is not to exceed 10, or go below 1. Some examples for reference:
    A knight in armor might have a high HP, like 6. An archer might have a low HP, like 3. A mouse might have a tiny HP, like 1.

    ...
"""

API_SCHEMA = {
    "name": "character_stats",
    "strict": True,
    "schema": {
        "type": "object",
        "properties": {
            "HP": {"type": "integer"},
            "AD": {"type": "integer"},
            "MD": {"type": "integer"},
            "Behavior": {"type": "integer"},
            "Strength": {
                "type": "object",
                "properties": {
                    "against_id": {"type": ["integer", "null"]},
                    "modifier": {"type": ["integer", "null"]},
                },
                "required": ["against_id", "modifier"],
                "additionalProperties": False,
            },
        ...
}}}`,
        },
      ],
    },
    {
      type: "md",
      content: `Reflection:

1. Learned more about async and anyio, network protocol, and OOP w/ Python
2. It's important to always decouple logic & display - it would've been much easier to refactor for the simulation if I had followed this practice from the beginning

Next steps:

In hindsight, we tried to tackle two things at the same time, and it would have been better to only tackle one. Either a 
1. creative response game using AI to evaluate that creativity
2. simulator/board game, with physical pieces and a map

I'd actually like to make the first one right now - instead of a physical board, using some sort of card game, Magic-like system would be much better for a prototype of on the fly, AI-judged creativity. I have some other things to do first though..

This leads to one final lesson learned, which is common in many of my projects..
> simplify prototypes & identify measurable objectives! BEFORE starting`,
    },
  ],
};