import React from "react";

const Modals = ({
  showConfigModal = false,
  onCloseConfigModal = () => {},
  interviewConfig = {},
  onConfigUpdate = () => {},
  faceDetection = {},
  cameraAvailable = false,
  audioAvailable = false
}) => {
  // Safe access with fallbacks
  const safeFaceDetection = faceDetection || {};
  const safeInterviewConfig = interviewConfig || {};

  const handleSkipCamera = () => {
    onConfigUpdate({ 
      cameraRequired: false,
      cameraEnabled: false,
      faceDetectionEnabled: false 
    });
    if (safeFaceDetection.stopFaceDetection) {
      safeFaceDetection.stopFaceDetection();
    }
  };

  return (
    <>
      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Interview Settings</h3>
              <button
                onClick={onCloseConfigModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Interview Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Type
                </label>
                <select
                  value={safeInterviewConfig.interviewType || "full"}
                  onChange={(e) => onConfigUpdate({ interviewType: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="full">Full Stack Interview</option>
                  <option value="technical">Technical Only</option>
                  <option value="behavioral">Behavioral Only</option>
                </select>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={safeInterviewConfig.difficulty || "medium"}
                  onChange={(e) => onConfigUpdate({ difficulty: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Camera Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Camera Settings
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={safeInterviewConfig.cameraRequired !== false}
                      onChange={(e) => onConfigUpdate({ cameraRequired: e.target.checked })}
                      className="mr-2"
                      disabled={!cameraAvailable}
                    />
                    <span className={!cameraAvailable ? "text-gray-400" : "text-gray-700"}>
                      Require Camera {!cameraAvailable && "(Not Available)"}
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={safeInterviewConfig.enableFaceDetection !== false}
                      onChange={(e) => onConfigUpdate({ enableFaceDetection: e.target.checked })}
                      className="mr-2"
                      disabled={!cameraAvailable}
                    />
                    <span className={!cameraAvailable ? "text-gray-400" : "text-gray-700"}>
                      Enable Face Detection {!cameraAvailable && "(Camera Required)"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Audio Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audio Settings
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={safeInterviewConfig.enableAudioRecording !== false}
                      onChange={(e) => onConfigUpdate({ enableAudioRecording: e.target.checked })}
                      className="mr-2"
                      disabled={!audioAvailable}
                    />
                    <span className={!audioAvailable ? "text-gray-400" : "text-gray-700"}>
                      Record Audio Responses {!audioAvailable && "(Not Available)"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Device Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Device Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Camera</span>
                    <span className={`text-sm font-medium ${
                      cameraAvailable ? "text-green-600" : "text-red-600"
                    }`}>
                      {cameraAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Microphone</span>
                    <span className={`text-sm font-medium ${
                      audioAvailable ? "text-green-600" : "text-red-600"
                    }`}>
                      {audioAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={onCloseConfigModal}
                  className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={onCloseConfigModal}
                  className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Camera Required Overlay */}
      {safeInterviewConfig.cameraRequired && !safeInterviewConfig.cameraEnabled && cameraAvailable && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📹</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Camera Required</h3>
            <p className="text-gray-600 mb-6">
              You must enable camera to continue with the interview.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => onConfigUpdate({ cameraEnabled: true })}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-200"
              >
                Enable Camera
              </button>
              <button
                onClick={handleSkipCamera}
                className="w-full py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200"
              >
                Skip Camera
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;