<script>
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";
  import CodeCell from "../../components/CodeCell.svelte";
  import Chips from "../../components/Chips.svelte";
</script>

<Section title="### Speech to LLM App" hideToStart={true}>
  <div slot="hiddenBlurb">
    A small project involving LLM calling and audio transcription
  </div>
  <MdCell
    md={`I think well when walking, and I would like to be able to brainstorm ideas while in that flow state. Going back for my computer or pulling out my phone often interrupts what I'm thinking. It would be nice to have voice transcribed notes.

Additionally, I find that a conversational dialog is conducive to developing better ideas. I worked on this for a couple of weeks in July while I had some free time. 

The idea is simple ->

1. A basic iOS app that sends audio to a Node server on my computer. 

CODE

2. The Node server transcribes the audio and listens for a wake word. 

CODE


3. Upon this wake word a call to ChatGPT is triggered with the past 'x' amount of context. This 

CODE


4. All the transcribed audio and responses are kept as notes.

CODE


`}
  />

  <CodeCell
    code={`struct ContentView: View { ...
    func startRecording() {
        setupAudioSession()
        startServerSession { success, error in
            DispatchQueue.main.async {
                self.isLoading = false
                if success {
                    self.audioEngine = AVAudioEngine()
                    self.inputNode = self.audioEngine.inputNode
                    let nativeFormat = self.inputNode.inputFormat(forBus: 0)
                    let recordingFormat = AVAudioFormat(commonFormat: .pcmFormatInt16, sampleRate: nativeFormat.sampleRate, channels: 1, interleaved: true)!
                    self.inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer, time in
                        if !self.isPaused { // If paused don't send buffer
                            self.sendAudioBuffer(buffer)
                        }
                    }
                   ...
            }
        }
    }  `}
    language="swift"
  />

  <MdCell
    md={`Some things I considered doing but didn’t get around to were:
1. Adding keywords that could create new notes, or give the context of the previous x lines of notes to ChatGPT, along with a command to format it in some way.
2. More generally, giving more options to ChatGPT - e.g. searching, or custom function calling. 

I stopped this project because I wasn't convinced I was actually getting more benefit out of it than going on a walk to clear my mind and then writing on my computer. 

I still think that a \`perfect\` AI assistant with transcription and note taking and function calling, *AND* a LLM re-writing the notes for clarity/ future reference, or some sort of mental model, would be *decently* useful.

Unforunately this would require:
1. Much more development & edge case debugging
2. A period of adaptation for me => I found that I mumble a lot, and directly turning my thoughts into words *coherently enough* is harder than I thought. 

And I was not ready to commit to both of these. `}
  />

  <MdCell
    md={`Takeaways:
1. I do not enjoy Swift - However, I was able to hack together an app using a lot of ChatGPT and debugging. 
    
    > Tech stacks are just *tools* that allow you to do *things*. Doing *things* is what’s important. 
2. I didn’t have a measurable goal for this prototype stage - 
    1. As I mentioned above, the stage I reached was not super helpful to me, which meant I wasn't able to validate this project super well. 
    2. It’s important to build in measurable outcomes to prototype stages - how can I validate if this idea is *worth continuing*? What value can I derive from *each stage*

Overall, I learned a bit about calling LLMs, voice recording, audio processing, node Streams, and node servers.
got a good benchmark for how well I could do something technically unfamiliar with ChatGPT. `}
  />

  <Chips items={["LLMs", "Node", "Streams", "Swift"]} />
</Section>
