export const projects = [
  {
    id: "portfolio-website",
    title: "This website",
    date: "Feb 2025",
    summary: "I thought it would be fun to style this like a Jupyter notebook, since I've been using those a lot the past year. I tried to replicate my VSCode theme, Default Dark Modern",
    description: `I started off with raw HTML & CSS to avoid bloat. A few days later I switched to Svelte since I was handling so much state in raw JS.

I use a library called \`highlight.js\` to make syntax-highlighted code blocks, stylized like Jupyter

I mostly stuck with the colors from the VSCode theme, but I added a few highlight colors that I enjoy (I use them in my old websites!).

Here are the [figma](https://www.figma.com/design/KNDGLOnLBGOMOtokZkl8wO/Showcase-November-2024?node-id=319-2&t=qUygRzLqeLDNKF3R-1) and [github](https://github.com/danielmccannsayles/portfolio-notebook) for this website.

I hope its readable and helpful in getting to know me! The website showcases my technical skills with modern web technologies while maintaining a clean, notebook-style aesthetic that reflects my data science background.

The color scheme draws from VSCode's Default Dark Modern theme, creating a familiar environment for developers while remaining accessible to all visitors. The responsive design works seamlessly across desktop and mobile devices.

Technical implementation includes Svelte for state management, highlight.js for code syntax highlighting, and custom CSS variables for theming. The modular component structure makes it easy to maintain and extend.

I particularly enjoyed working on the interactive elements and ensuring the notebook metaphor felt authentic while remaining functional as a portfolio website.`
  },
  {
    id: "arena-ai-safety",
    title: "ARENA AI safety",
    date: "Mar 2025",
    summary: "To familiarize myself with AI safety & ML fundamentals, I self-learned Chapter 0 of the ARENA AI safety program",
    description: `I completed the first chapter of the ARENA AI safety course to build foundational knowledge in AI safety and machine learning fundamentals.

I originally planned to complete the entire course, but decided to pivot after the first chapter when I felt confident in the core concepts.

My work can be seen on [github](https://github.com/danielmccannsayles/my-arena). The course material covers essential topics in tensor operations, PyTorch fundamentals, neural network architecture, and the training process including optimization and backpropagation.

I found this extremely helpful for shoring up my fundamental knowledge of Tensors, PyTorch, and neural networks. The hands-on approach of implementing everything from scratch was challenging but rewarding.

The focus on building everything myself gave me much more confidence when working on ML projects and using PyTorch. I now have significantly more context when reading AI research papers and understanding the underlying mechanisms.

Key areas covered included tensor manipulation, automatic differentiation, neural network layers, loss functions, optimizers, and training loops. The practical exercises reinforced theoretical concepts through implementation.

This foundation has proven invaluable for subsequent AI projects and my broader understanding of machine learning systems. The emphasis on understanding rather than just using libraries aligns well with my learning philosophy.

While I didn't complete the full program, Chapter 0 provided exactly the depth I needed to confidently engage with AI safety concepts and continue my journey in this field.`
  },
  {
    id: "kid-fight-game",
    title: "Kid-Fight Game",
    date: "Nov 2024",
    summary: "A game exploring using an LLM to arbitrate a fight with words. Sort of like when you were a kid, and would have an imaginary fight where you one-upped the other person",
    description: `My friend Devin is interested in game design, and I was talking with him about how having 'real AI' in games is going to allow awesome interactive experiences.

I thought it would be fun to see what could be done creatively with AI. As a kid I used to have arguments with friends where we would one up each other - I would have a laser, he would have a laser deflecting mirror, I would have gone back in time and weakened his mirror so it cracked, etc.

I wanted to approximate some of this back and forth creativity in a tabletop manner, like Magic or Pokemon. The project had two distinct phases: a Pygame era and a simulation era.

The first pass involved finding a pygame chess implementation and building on top of it. This introduced coupled game display and logic that lasted for a while. I learned about pygame events, asynchronous LLM calling, pathfinding, and behavioral logic for game pieces.

The second pass focused on multiplayer functionality using socket networking. I decoupled display logic from game logic, creating a clean server-client architecture where the server handles functionality and clients handle presentation.

The original concept involved having an LLM act as an impartial judge, adding or subtracting bonuses to characters based on existing board state and creative descriptions. Players would create characters through natural language descriptions, and the AI would generate stats and interactions.

Key technical implementations included structured prompts for character creation, JSON-based board state communication, threaded server architecture for multiplayer support, and schema enforcement for reliable LLM responses.

Reflection: I learned about async programming, network protocols, and object-oriented Python. The importance of decoupling logic and display became clear during the refactor. In hindsight, we tried to tackle creativity evaluation and board game mechanics simultaneously - focusing on one would have been more effective.

Next steps would involve implementing a card-based system instead of a physical board to better prototype AI-judged creativity, similar to Magic: The Gathering but with dynamic, AI-generated interactions.`
  },
  {
    id: "llm-chaining-exploration",
    title: "LLM Chaining Exploration", 
    date: "Oct 2024",
    summary: "An exploration of a research paper into agentic AI workflows. Chaining LLM calling and testing out different patterns",
    description: `During downtime at work, I explored a Cisco research project focused on agentic AI workflows to improve performance on math problem-solving benchmarks.

I optimized the codebase, explored asynchronous alternatives, and reduced costs while increasing speed. I also investigated alternative methods for connecting LLM calls and evaluated their effectiveness in problem-solving.

The project started with a research paper that chained LLM calls to improve math problem performance. Their methodology involved examining problems, generating helpful conditions through iteration, creating solution pools, and generating solution steps using the condition pool.

My contributions included rewriting code for modularity, converting GPT calls to async (reducing 7-minute single-problem runtime from 19 sequential requests), switching to cheaper GPT models, moving from OpenAI Assistants to direct chat completions, and adding comprehensive logging and schema enforcement.

I experimented with different chaining patterns beyond simple repetition and averaging. Instead of generating the same things repeatedly, I focused on error correction - finding mistakes and fixing them directly through multiple checks on conditions and reassessment of solution steps.

The most interesting approach involved generating step-by-step solutions in one pass, then verifying each step individually. If a step was incorrect, I would regenerate it and all following steps, creating a more structured problem-solving flow.

Technical implementation included async HTTP clients with timeout handling, custom logging systems for concurrent data management, retry logic with exponential backoff, and structured response schemas for reliable LLM communication.

Key insights: Benchmarking multi-LLM systems is extremely challenging due to randomness in responses. LLMs can be easily influenced by previous incorrect assumptions and seem to perform worse in longer chains. Error correction with LLMs is currently imperfect.

I gained valuable experience with Python codebases, asynchronous libraries (anyio with asyncio backend), multi-LLM interaction complexities, and the significant overhead involved in improving chained LLM performance.

The project highlighted the importance of defining success metrics early and the value of tools like LangChain for rapid prototyping when exploring different patterns and prompts.`
  },
  {
    id: "cisco-llm-generation",
    title: "Cisco LLM Generation Data Science",
    date: "Aug 2024", 
    summary: "A Cisco project where I do some data science to try and improve a LLM generation process",
    description: `I had the opportunity to work on a Cisco project exploring how well an LLM email-generation process was performing. The system generated emails which were then reviewed by users, optionally modified, and sent.

As a metric for process effectiveness, stakeholders were calculating a diff between the generated and sent emails. I was tasked with exploring this diff methodology and investigating improvements.

Data analysis is fascinating to me - creating visualizations that tell compelling stories to your audience. The metrics you show executives differ completely from those for technical stakeholders or customers.

I spent several weeks immersing myself in the data, pouring over hundreds of examples, exploring different sorting and filtering methods, and creating impactful visualizations and metrics.

My approach included multiple techniques for cleaning data before calculating diffs. I experimented with ChatGPT for text preprocessing, semantic similarity matching, and regex-based cleaning to get scores that more accurately reflected generation quality.

Key technical implementations included custom diff visualization functions using Python's difflib, semantic similarity detection using sentence transformers, sliding window algorithms for signature chunk removal, and interactive Jupyter widgets for data exploration.

I developed methods to detect and handle common patterns like trailing additions and signature chunks that artificially inflated diff scores. This involved vectorizing text by sentences and using cosine similarity to identify and remove boilerplate content.

The project taught me about the pitfalls of data analysis - it's easy to get lost in minutia. I made some progress on improving the diff calculation and explored alternative methods, but learned valuable lessons about Python, data visualization, and analysis methodology.

One unexplored area was using diff scores to improve the generation process itself. It would be interesting to collate all diff data, sort by similar corrections, and automatically generate recommendations for common problems.

My drive to automate and explore new ideas is something I look forward to bringing to smaller companies with more cross-functional opportunities.

The project lead remarked: "Your curiosity, ability to learn new concepts, and come up with out-of-the-box ideas are impressive."

This experience reinforced my passion for data-driven insights and my ability to tackle ambiguous problems with creative technical solutions.`
  },
  {
    id: "llm-verbal-assistant", 
    title: "LLM Verbal Assistant",
    date: "Jul 2024",
    summary: "A small project making an app to transcribe verbal notes with added AI assistant functionality",
    description: `I think well when walking and wanted to brainstorm ideas while in this flow state. Going back for my computer or pulling out my phone interrupts my thinking. I needed voice-transcribed notes.

Additionally, I find conversational dialog conducive to developing better ideas. If an LLM could respond to my notes and add context or argue points, it might help ideation.

The concept was simple: a basic iOS app sends audio to a Node server on my computer, the server transcribes audio and listens for wake words, upon wake word detection a ChatGPT call is triggered with context, and the response is converted to audio and sent back to the app.

I worked on this for a couple weeks in July during free time. The full code is available on [github](https://github.com/danielmccannsayles/minerva_server_2.0).

Technical implementation included Swift audio recording with AVAudioEngine, real-time audio streaming to Node server, Rev.ai integration for speech transcription, wake word detection and processing, ChatGPT API integration with streaming responses, and text-to-speech conversion with audio streaming back to the mobile app.

The iOS app handled audio session setup, real-time PCM buffer processing, audio format conversion and resampling, and background audio streaming with pause/resume functionality.

The Node server managed streaming sessions with Rev.ai, processed transcription events (partial and final), implemented wake word detection, maintained conversation context, and handled streaming text-to-speech conversion.

Key challenges included managing audio format conversions, handling async operations across audio streams, maintaining conversation context and history, and coordinating multiple streaming processes (audio in, transcription, LLM response, TTS out).

I stopped the project because I wasn't convinced of its utility over simply going for walks to clear my mind then writing on my computer. A "perfect" AI assistant with transcription, note-taking, function calling, and LLM rewriting would be useful, but required significant development and personal adaptation.

Takeaways: I don't enjoy Swift but can hack together functionality with ChatGPT assistance. Tech stacks are tools for doing things - doing things is what matters. Measurable outcomes for prototype stages are crucial for validation.

Overall, I learned about LLM calling, voice recording, audio processing, Node streams, and servers. Got a good benchmark for tackling technically unfamiliar territory with AI assistance.`
  },
  {
    id: "cisco-hackathon",
    title: "Cisco Hackathon",
    date: "May 2024",
    summary: "A Cisco Hackathon, exploring generative AI, that my team won!",
    description: `I competed in an internal Cisco hackathon exploring how to improve customer experience use cases with AI. My team won 1st place out of over 20 teams!

The competition spanned two weeks and was hosted by a different Cisco organization, exposing me to different products and settings than I was used to.

I played several key roles on the team: collaborating closely with our team lead to hash out ideas and transform his customer knowledge into winning implementation, and executing by quickly learning to build a smart AI assistant using Streamlit with a RAG system using FAISS and LangChain.

This project showcases my holistic skill set - I'm at my best when I can work closely with the product, stakeholders, and implementation itself. The combination of technical execution and strategic collaboration proved effective.

Technical implementation included building a RAG (Retrieval-Augmented Generation) system using FAISS for vector similarity search, LangChain for LLM orchestration and document processing, Streamlit for rapid prototyping and user interface, and integration with Cisco's internal systems and data sources.

The AI assistant could understand customer queries, retrieve relevant information from internal knowledge bases, generate contextually appropriate responses, and provide actionable recommendations for customer experience improvements.

Key technical challenges included processing and vectorizing large amounts of internal documentation, optimizing retrieval accuracy and speed, designing intuitive user interfaces for non-technical stakeholders, and ensuring system reliability and performance.

My team lead graciously said: "Daniel continuously demonstrated his ability to navigate high-level business strategy and translate that into ideas, concepts, code, and connections that support the achievement of those goals."

The project demonstrated the power of combining domain expertise with rapid technical implementation. The two-week timeline required efficient learning, quick decision-making, and effective collaboration.

Unfortunately I have no code I'm allowed to share, but the experience reinforced my enjoyment of meeting people, collaborating across disciplines, and creating solutions that directly impact customer experience.

Technologies used: LangChain, FAISS, RAG architecture, Streamlit for rapid prototyping.

This win validated my approach of combining technical skills with business understanding to create practical, impactful solutions.`
  }
];