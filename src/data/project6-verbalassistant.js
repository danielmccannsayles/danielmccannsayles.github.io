export const llmVerbalAssistant = {
  id: "llm-verbal-assistant",
  title: "LLM Verbal Assistant",
  date: "Jul 2024",
  summary:
    "A small project making an app to transcribe verbal notes with added AI assistant functionality",
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

Overall, I learned about LLM calling, voice recording, audio processing, Node streams, and servers. Got a good benchmark for tackling technically unfamiliar territory with AI assistance.`,
};