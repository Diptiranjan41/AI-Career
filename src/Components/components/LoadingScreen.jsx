import React from 'react';
import { Camera, Mic, Check, X } from 'lucide-react';

const LoadingScreen = ({ 
  message = "Loading...", 
  progress = 0,
  cameraAvailable = false,
  audioAvailable = false 
}) => {
  const loadingMessages = [
    "Setting up your interview environment...",
    "Checking media devices...",
    "Initializing camera and microphone...",
    "Loading interview questions...",
    "Almost ready...",
    "Starting your mock interview..."
  ];

  const displayMessage = message || loadingMessages[Math.min(Math.floor(progress / 20), loadingMessages.length - 1)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          {/* Loading Spinner */}
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          </div>
          
          {/* Loading Text */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Preparing Your Interview
          </h2>
          
          <p className="text-gray-600 mb-6">
            {displayMessage}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">
            {progress}% complete
          </p>

          {/* Device Status */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Device Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera size={16} className={cameraAvailable ? "text-green-500" : "text-gray-400"} />
                  <span className="text-sm text-gray-600">Camera</span>
                </div>
                {cameraAvailable ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-gray-400" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mic size={16} className={audioAvailable ? "text-green-500" : "text-gray-400"} />
                  <span className="text-sm text-gray-600">Microphone</span>
                </div>
                {audioAvailable ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">
              💡 Quick Tips
            </h3>
            <ul className="text-xs text-blue-700 text-left space-y-1">
              <li>• Ensure good lighting on your face</li>
              <li>• Find a quiet environment</li>
              <li>• Test your microphone and camera</li>
              <li>• Have a glass of water nearby</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;