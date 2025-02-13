<script>
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";
  import CodeCell from "../../components/CodeCell.svelte";
  import { SpeechCode1 } from "./code";
</script>

<Section title="### Speech to LLM App">
  <MdCell
    md={`
    I wanted to take better notes/ have a personal AI assistant.  I worked on this for a couple of weeks in July while I had some free time. 

I like to talk to myself when walking, and I would like to be able to brainstorm ideas. Ideally I could offload some cognitive tasks, such as recalling or looking things up. I also find that in a back and forth manner I can come up with better ideas.

To do this I made a very simple iOS app that sends audio to a node server that transcribes the audio and listens for a wake word. Upon this wake word a call to ChatGPT is triggered with the past context. The iOS app receives this audio.

All the audio is also transcribed and kept as notes. I also explored using calls to ChatGPT to clean up this audio, though this naive approach didn’t work super well. 

Some things I considered doing but didn’t get around to were:
Adding keywords that could create new notes, or give the context of the previous x lines of notes to ChatGPT, along with a command to format it in some way.
More generally, giving more options to ChatGPT - e.g. searching, or custom function calling. 

Takeaways:
I do not enjoy Swift. I was able to hack together an app using a lot of ChatGPT and debugging. 
Tech stacks are just *tools* that allow you to do *things*. Doing *things* is what’s important. 
I struggled with audio transcription - I tend to mumble and the transcriber I was using did not like that.
I didn’t have a measurable goal - 
I stopped working on this because it wasn’t giving validation
It’s important to build in measurable outcomes to prototype stages - how can I validate if this idea is *worth continuing*? What value can I derive from *each stage*
I called this Minerva because it sounded cool. After I made the repo I found out there is another AI tool called Minerva.. fools rarely differ I suppose..
`}
  />

  <CodeCell
    htmlCode={SpeechCode1}
    truncatedCode="struct ConventView: View {'{'}..."
    output="none"
  />
</Section>
