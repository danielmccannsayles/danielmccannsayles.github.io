export const llmChainingExploration = {
  id: "llm-chaining-exploration",
  title: "LLM Chaining Exploration",
  date: "Oct 2024",
  summary:
    "An exploration of a research paper into agentic AI workflows. Chaining LLM calling and testing out different patterns",
  description: `During downtime at work, I explored a Cisco research project focused on agentic AI workflows to improve performance on math problem-solving benchmarks.

I optimized the codebase, explored asynchronous alternatives, and reduced costs while increasing speed. I also investigated alternative methods for connecting LLM calls and evaluated their effectiveness in problem-solving.

The project started with a research paper that chained LLM calls to improve math problem performance. Their methodology involved examining problems, generating helpful conditions through iteration, creating solution pools, and generating solution steps using the condition pool.

My contributions included rewriting code for modularity, converting GPT calls to async (reducing 7-minute single-problem runtime from 19 sequential requests), switching to cheaper GPT models, moving from OpenAI Assistants to direct chat completions, and adding comprehensive logging and schema enforcement.

I experimented with different chaining patterns beyond simple repetition and averaging. Instead of generating the same things repeatedly, I focused on error correction - finding mistakes and fixing them directly through multiple checks on conditions and reassessment of solution steps.

The most interesting approach involved generating step-by-step solutions in one pass, then verifying each step individually. If a step was incorrect, I would regenerate it and all following steps, creating a more structured problem-solving flow.

Technical implementation included async HTTP clients with timeout handling, custom logging systems for concurrent data management, retry logic with exponential backoff, and structured response schemas for reliable LLM communication.

Key insights: Benchmarking multi-LLM systems is extremely challenging due to randomness in responses. LLMs can be easily influenced by previous incorrect assumptions and seem to perform worse in longer chains. Error correction with LLMs is currently imperfect.

I gained valuable experience with Python codebases, asynchronous libraries (anyio with asyncio backend), multi-LLM interaction complexities, and the significant overhead involved in improving chained LLM performance.

The project highlighted the importance of defining success metrics early and the value of tools like LangChain for rapid prototyping when exploring different patterns and prompts.`,
};