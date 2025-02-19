<script>
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";
  import CodeCell from "../../components/CodeCell.svelte";
  import Chips from "../../components/Chips.svelte";
  import Teaser from "../../components/Teaser.svelte";
</script>

<Section
  title="### LLM Verbal Assistant"
  subtitle="*July 2024*"
  hideToStart={true}
>
  <div slot="hiddenBlurb">
    <Teaser
      text="A small project making an app to transcribe verbal notes and added AI assistant functionality"
    />
  </div>
  <MdCell
    md={`I think well when walking, and I would like to be able to brainstorm ideas while in that flow state. Going back for my computer or pulling out my phone often interrupts what I'm thinking. It would be nice to have voice transcribed notes.

Additionally, I find that a conversational dialog is conducive to developing better ideas. If I could have an LLM respond to my notes, and add context or argue points, it might help my ideation.

I worked on this for a couple of weeks in July while I had some free time. The idea is simple ->`}
  />

  <MdCell
    md={`1. A basic iOS app that sends audio to a Node server on my computer.`}
  />
  <Section title="Code:" inset={true} hideToStart={true}>
    <CodeCell
      code={`struct ContentView: View {
    // The view is incredibly basic, so not included here
    ...

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
                        if !self.isPaused {
                            self.sendAudioBuffer(buffer)
                        }
                    }
                   ...
            }
        }
    } 
    ...
`}
      language="swift"
    />
    <CodeCell
      code={`..ContentView{    
    // Part of startRecording
    func sendAudioBuffer(_ buffer: AVAudioPCMBuffer) {
        guard AVAudioFormat(commonFormat: .pcmFormatInt16, sampleRate: buffer.format.sampleRate, channels: 1, interleaved: true) != nil else {
            print("Error creating audio format")
            return
        }
        // Create an audio converter to resample the buffer to the sample rate
        let targetSampleRate: Double = 16000.0
        let targetFormat = AVAudioFormat(commonFormat: .pcmFormatInt16, sampleRate: targetSampleRate, channels: 1, interleaved: true)!
        let converter = AVAudioConverter(from: buffer.format, to: targetFormat)
        let convertedBuffer = AVAudioPCMBuffer(pcmFormat: targetFormat, frameCapacity: AVAudioFrameCount(targetFormat.sampleRate) * buffer.frameLength / AVAudioFrameCount(buffer.format.sampleRate))!
        // Handle buffer/converter errors
        var error: NSError? = nil
        converter?.convert(to: convertedBuffer, error: &error, withInputFrom: { _, outStatus in
            outStatus.pointee = AVAudioConverterInputStatus.haveData
            return buffer
        })
        // Send the actual audio 
        ...
    }`}
      language="swift"
    />

    <CodeCell
      code={`..ContentView{    
      // Trigger wake manually
      func wakeServer() {
          stopRecording()
          // Request
          let url = URL(string: "\(serverAddress)/wake")!
          var request = URLRequest(url: url)
          request.httpMethod = "GET"
          let task = URLSession.shared.dataTask(with: request) { data, response, error in
              DispatchQueue.main.async {
                  ...
                  if httpResponse.statusCode == 200 {
                      self.message = "Server wake successful"
                      // Save data to a temporary file to play it
                      if let data = data {
                          let tempDirectory = FileManager.default.temporaryDirectory
                          let tempFileURL = tempDirectory.appendingPathComponent("tempAudio.mp3")
                          do {
                              try data.write(to: tempFileURL)
                              self.playAudio(from: url)
                          } 
                      }
                  } 
              }
          }
          // Return to regularly scheduled programming
          task.resume `}
      language="swift"
    />
  </Section>

  <MdCell
    md={`2. The Node server transcribes the audio and listens for a wake word. `}
  />
  <Section title="Code:" inset={true} hideToStart={true}>
    <CodeCell
      code={`//index.ts

/** Initiate a new recording stream.
 * Calls startStreamingSession & processTextListener
 */
app.get('/startSession', async (_, res) => {
    const response = await startStreamingSession(revClient, revAiStream, bufferStream)
    if (response.connected) {
      outputPaths = setupFolders()
      
      processTextListener(
        transcriptionDataObject,
        revAiStream as Duplex,
        outputPaths
      )
      res.sendStatus(200)
    } else {
      res.status(400).send(\`Error starting session: \${response.error}\`)
    }
  })`}
      language="typescript"
    />
    <CodeCell
      code={`//helpers/rev-streaming.ts

// RevClient, revAiStream, and bufferStream are global variables passed in by reference, and modified in this function
export function startStreamingSession (revClient: RevAiStreamingClient | null, revAiStream: Duplex | null, bufferStream: PassThrough | null) {
    revClient = new RevAiStreamingClient(REV_AI_API_KEY, audioConfig)
    revAiStream = revClient.start()
  
    // Listen once for initialization
    let connectedPromise: Promise<{ connected: boolean; error?: string }> =
      new Promise((resolve, _) => {
        revClient!.once('connectFailed', error => {
          resolve({ connected: false, error })
        })
  
        revClient!.once('connect', connectionMessage => {
          console.log(
            \`Connected with message: \${JSON.stringify(connectionMessage)}\`
          )
          resolve({ connected: true })
        })
  
        setTimeout(() => {
          resolve({
            connected: false,
            error: 'Took longer than 5 seconds to initiate'
          })
        }, 5000)
      })
  
    //Add listeners to audio stream
    audioProcessing(revAiStream)
  
    // Buffer stream to handle incoming PCM data
    bufferStream = new PassThrough()
  
    // Pipe the duplex stream to our revAiStream so it can be accessed elsewhere
    bufferStream.pipe(revAiStream)
  
    return connectedPromise
  }`}
      language="typescript"
    />
    <CodeCell
      code={`//processing/text_processing.ts

export function processTextListener (
  transcriptionDataObject: TranscriptionDataObject,
  revAiStream: Duplex,
  outputPaths: OutputPaths
) {
  // Process events received from Rev.ai transcript (response) stream. rev.ai returns 'partial' and 'final' chunks
  revAiStream.on('data', data => {
    console.log('*')
    if (data.type === 'partial') {
      const newWord: string = data.elements[data.elements.length - 1]
        .value as string
      transcriptionDataObject.partialData += newWord + ' '
    } else if (data.type === 'final') {
      let sentence = ''
      for (const element of data.elements) {
        sentence +=
          element.value +
          (element.type === 'punct' && element.value === '.' ? '\n' : ' ')
      }
      transcriptionDataObject.finalData += sentence
      transcriptionDataObject.partialData = '' 
    }

    // Call format - I was experimenting w/ having ChatGPT format the notes to fix transciption errors, of which there were many
    if (transcriptionDataObject.finalData.length >= 300) {
      formatDocument(transcriptionDataObject.finalData, outputPaths)
      transcriptionDataObject.finalData = '' 
    }
  })

  revAiStream.on('close', (err: any) => {})
}
`}
      language="typescript"
    />
  </Section>

  <MdCell
    md={`3. Upon this wake word a call to ChatGPT is triggered with the past \`x\` amount of context, and a response is generated.`}
  />
  <Section title="Code:" inset={true} hideToStart={true}>
    <CodeCell
      code={`//index.ts

  //.. part of wake function
    // Get the formatted notes. Add in the transciptionDataObject. Send this to the gpt api
    let formattedFile = ''
    const ffPath = \`\${outputPaths.generated}/formatted_note.md\`
    if (fs.existsSync(ffPath)) {
      formattedFile = fs.readFileSync(ffPath, 'utf-8')
    }
    const fChunk =
      formattedFile.length > 4000 ? formattedFile.slice(-4000) : formattedFile
    const extraData =
      transcriptionDataObject.finalData + transcriptionDataObject.partialData
    formatDocument(extraData, outputPaths)
    const chatResponse = await getAnswerStreaming(fChunk + extraData)

    // Convert gpt response stream to a text stream
    const textStream = new Transform({
      writableObjectMode: true,
      transform (chunk: ChatCompletionChunk, encoding, callback) {
        const finishReason = chunk.choices[0].finish_reason
        if (finishReason) {
          if (finishReason !== 'stop') console.log(finishReason)
          // End stream
          this.push(null)
          return callback()
        }
        this.push(chunk.choices[0].delta.content ?? 'ERR')
        callback()
      }
    })
    chatResponse?.pipe(textStream)
    // Text to speech (shown in next code chunk)
    const audioStream = textStreamToAudioStream(textStream)`}
      language="typescript"
    />
  </Section>

  <MdCell
    md={`4. The response is turned into audio, and sent to the app. The conversation transcription & response are stored as notes`}
  />
  <Section title="Code:" inset={true} hideToStart={true}>
    <CodeCell
      code={`//llm_stuff/text_to_speech.ts
      
/** Create a passthrough, to pipe the audioStream through it. 
 * As text is recieved (in chunks of 100 or line end), run it through the TTS.
 * Write returned audio to the passthrough. When that audio ends, resume textStream
 * When the text stream ends, handle the last bit
 * Returns the readable passThroughStream
*/
export function textStreamToAudioStream (textStream: Readable): Readable {
    const passThroughStream = new PassThrough()
    let accumulatedText = ''
  
    textStream.on('data', async chunk => {
      accumulatedText += chunk.toString()
      if (accumulatedText.length > 100 || accumulatedText.includes('\n')) {
        textStream.pause() // Pause the text stream to wait for the current chunk to be processed
        try {
          const audioStream = (await convertTextToSpeech(
            accumulatedText
          )) as Readable
          audioStream.pipe(passThroughStream, { end: false })
          audioStream.on('end', () => {
            textStream.resume() // Resume the text stream after the chunk is processed
          })
        } catch (err) {
          passThroughStream.emit('error', err)
        }
        accumulatedText = ''
      }
    })
  
    textStream.on('end', async () => {
      if (accumulatedText) {
        try {
          const audioStream = (await convertTextToSpeech(
            accumulatedText
          )) as Readable
          audioStream.pipe(passThroughStream, { end: false })
          audioStream.on('end', () => {
            passThroughStream.end() // End when the last chunk is processed
          })
        } catch (err) {
          passThroughStream.emit('error', err)
        }
      } else {
        passThroughStream.end() // End if there's no remaining text
      }
    })
  
    textStream.on('error', err => {
      passThroughStream.emit('error', err)
    })
  
    return passThroughStream
  }`}
      language="typescript"
    />
  </Section>

  <!--  End coding -->
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
