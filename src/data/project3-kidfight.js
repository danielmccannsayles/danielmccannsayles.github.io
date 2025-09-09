export const kidFightGame = {
  id: "kid-fight-game",
  title: "Kid-Fight Game",
  date: "Nov 2024",
  summary:
    "A game exploring using an LLM to arbitrate a fight with words. Sort of like when you were a kid, and would have an imaginary fight where you one-upped the other person",
  description: `My friend Devin is interested in game design, and I was talking with him about how having 'real AI' in games is going to allow awesome interactive experiences.

I thought it would be fun to see what could be done creatively with AI. As a kid I used to have arguments with friends where we would one up each other - I would have a laser, he would have a laser deflecting mirror, I would have gone back in time and weakened his mirror so it cracked, etc.

I wanted to approximate some of this back and forth creativity in a tabletop manner, like Magic or Pokemon. The project had two distinct phases: a Pygame era and a simulation era.

The first pass involved finding a pygame chess implementation and building on top of it. This introduced coupled game display and logic that lasted for a while. I learned about pygame events, asynchronous LLM calling, pathfinding, and behavioral logic for game pieces.

The second pass focused on multiplayer functionality using socket networking. I decoupled display logic from game logic, creating a clean server-client architecture where the server handles functionality and clients handle presentation.

The original concept involved having an LLM act as an impartial judge, adding or subtracting bonuses to characters based on existing board state and creative descriptions. Players would create characters through natural language descriptions, and the AI would generate stats and interactions.

Key technical implementations included structured prompts for character creation, JSON-based board state communication, threaded server architecture for multiplayer support, and schema enforcement for reliable LLM responses.

Reflection: I learned about async programming, network protocols, and object-oriented Python. The importance of decoupling logic and display became clear during the refactor. In hindsight, we tried to tackle creativity evaluation and board game mechanics simultaneously - focusing on one would have been more effective.

Next steps would involve implementing a card-based system instead of a physical board to better prototype AI-judged creativity, similar to Magic: The Gathering but with dynamic, AI-generated interactions.`,
};