const fs = require("fs");
const vscodeTextmate = require("vscode-textmate");
const onigasm = require("onigasm");
const { OnigScanner, OnigString } = require("onigasm"); // Import OnigScanner and OnigString

// Load the Onigasm regex engine
async function loadOnigasm() {
  const wasmBuffer = fs.readFileSync(
    require.resolve("./node_modules/onigasm/lib/onigasm.wasm")
  );
  const wasmArrayBuffer = wasmBuffer.buffer.slice(
    wasmBuffer.byteOffset,
    wasmBuffer.byteOffset + wasmBuffer.byteLength
  );
  await onigasm.loadWASM(wasmArrayBuffer);
  console.log("Onigasm WASM loaded successfully!");
}

// Tokenize and convert to HTML
async function highlightCode(code) {
  await loadOnigasm();

  const registry = new vscodeTextmate.Registry({
    onigLib: Promise.resolve({
      createOnigScanner: (patterns) => new OnigScanner(patterns),
      createOnigString: (s) => new OnigString(s),
    }),
    loadGrammar: async () => {
      const grammar = fs.readFileSync("./Python.tmLanguage", "utf-8");
      return vscodeTextmate.parseRawGrammar(grammar);
    },
  });

  const grammar = await registry.loadGrammar("source.python");
  const lines = code.split("\n");

  let result = "";

  let currentChunk = "<pre><code>";
  let ruleStack = null;
  let chunkLength = 0;
  const chunkSize = 300;

  for (const line of lines) {
    const lineTokens = grammar.tokenizeLine(line, ruleStack);
    ruleStack = lineTokens.ruleStack;

    let lineResult = "";

    for (const token of lineTokens.tokens) {
      const content = line
        .slice(token.startIndex, token.endIndex)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      const classes = token.scopes
        .map((scope) => scope.replace(/\./g, "-"))
        .join(" ");

      lineResult += `<span class="${classes}">${content}</span>`;
    }

    lineResult += "<br>";

    if (chunkLength + lineResult.length > chunkSize) {
      result += currentChunk + "</code></pre>\n";
      currentChunk = "<pre><code>";
      chunkLength = 0;
    }

    currentChunk += lineResult;
    chunkLength += lineResult.length;
  }

  if (currentChunk) {
    result += currentChunk + "</code></pre>";
  }

  return result;
}

const code = `
struct ContentView: View { ...
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
    } 
    ...

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
    }
    // WAKE (trigger server + response) --
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
                    // Save data to a temporary file and play it
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
        task.resume()
    }
    ...


`;

highlightCode(code).then((html) => {
  fs.writeFileSync("output.html", html);
});
