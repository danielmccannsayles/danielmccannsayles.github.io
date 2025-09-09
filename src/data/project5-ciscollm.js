export const ciscoLlmGeneration = {
  id: "cisco-llm-generation",
  title: "Cisco LLM Generation Data Science",
  date: "Aug 2024",
  summary:
    "A Cisco project where I do some data science to try and improve a LLM generation process",
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

This experience reinforced my passion for data-driven insights and my ability to tackle ambiguous problems with creative technical solutions.`,
};