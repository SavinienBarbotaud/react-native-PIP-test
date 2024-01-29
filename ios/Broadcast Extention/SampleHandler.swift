//
//  SampleHandler.swift
//  Broadcast-extention
//
//  Created by Apizee on 24/01/2024.
//

import ReplayKit

class SampleHandler: RPBroadcastSampleHandler {

  private var clientConnection: SocketConnection?
  private var uploader: SampleUploader?
  private var frameCount = 0

  private enum Constants {
    static let appGroupIdentifier = "group.com.apirtc.reactAPIRTC.Broadcast-Extention"
  }

  private var socketFilePath: String {
    let sharedContainer = FileManager.default.containerURL(
      forSecurityApplicationGroupIdentifier: Constants.appGroupIdentifier)

    return sharedContainer?.appendingPathComponent("rtc_SSFD").path ?? ""
  }

  override init() {
    super.init()
    if let connection = SocketConnection(filePath: socketFilePath) {
      clientConnection = connection
      setupConnection()

      uploader = SampleUploader(connection: connection)
    }
  }

  override func broadcastStarted(withSetupInfo setupInfo: [String: NSObject]?) {
    // User has requested to start the broadcast. Setup info from the UI extension can be supplied but optional.
    frameCount = 0
    DarwinNotificationCenter.shared.postNotification(.broadcastStarted)
    openConnection()
  }

  override func broadcastPaused() {
    // User has requested to pause the broadcast. Samples will stop being delivered.
  }

  override func broadcastResumed() {
    // User has requested to resume the broadcast. Samples delivery will resume.
  }

  override func broadcastFinished() {
    DarwinNotificationCenter.shared.postNotification(.broadcastStopped)
    clientConnection?.close()
  }

  override func processSampleBuffer(
    _ sampleBuffer: CMSampleBuffer, with sampleBufferType: RPSampleBufferType
  ) {
    switch sampleBufferType {
    case .video:
      // very simple mechanism for adjusting frame rate by using every third frame
      frameCount += 1
      if frameCount % 3 == 0 {
        uploader?.send(sample: sampleBuffer)
      }
    default:
      break
    }
  }

  func openConnection() {
    let queue = DispatchQueue(label: "broadcast.connectTimer")
    let timer = DispatchSource.makeTimerSource(queue: queue)
    timer.schedule(deadline: .now(), repeating: .milliseconds(100), leeway: .milliseconds(500))
    timer.setEventHandler { [weak self] in
      guard self?.clientConnection?.open() == true else {
        return
      }

      timer.cancel()
    }

    timer.resume()
  }

  func setupConnection() {
    clientConnection?.didClose = { [weak self] error in
      if let error = error {
        self?.finishBroadcastWithError(error)
      } else {
        // the displayed failure message is more user friendly when using NSError instead of Error
        let JMScreenSharingStopped = 10001
        let customError = NSError(
          domain: RPRecordingErrorDomain, code: JMScreenSharingStopped,
          userInfo: [NSLocalizedDescriptionKey: "Screen sharing stopped"])
        self?.finishBroadcastWithError(customError)
      }
    }
  }

}
