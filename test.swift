// swift
struct ContentView: View {
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
        task.resume
