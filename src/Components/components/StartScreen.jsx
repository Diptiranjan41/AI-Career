import React, { useState, useEffect } from 'react';
import { Settings, Video, Mic, Play, CameraOff, Star, Clock, Users, Award } from 'lucide-react';

const StartScreen = ({ 
  onStartInterview = () => {}, 
  onOpenConfig = () => {}, 
  cameraAvailable = true,
  audioAvailable = true 
}) => {
  const [interviewConfig, setInterviewConfig] = useState({
    difficulty: 'medium',
    interviewType: 'full',
    enableFaceDetection: cameraAvailable,
    enableAudioRecording: audioAvailable,
    duration: 45
  });

  const [isTesting, setIsTesting] = useState({
    camera: false,
    microphone: false
  });

  // Update settings when device availability changes
  useEffect(() => {
    setInterviewConfig(prev => ({
      ...prev,
      enableFaceDetection: cameraAvailable && prev.enableFaceDetection,
      enableAudioRecording: audioAvailable && prev.enableAudioRecording
    }));
  }, [cameraAvailable, audioAvailable]);

  const handleStartInterview = () => {
    onStartInterview(interviewConfig);
  };

  const testCamera = async () => {
    if (!cameraAvailable) {
      alert('Camera is not available on this device');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsTesting(prev => ({ ...prev, camera: true }));
      // Stop the stream after test
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        setIsTesting(prev => ({ ...prev, camera: false }));
      }, 3000);
    } catch (error) {
      alert('Camera access denied or not available');
    }
  };

  const testMicrophone = async () => {
    if (!audioAvailable) {
      alert('Microphone is not available on this device');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsTesting(prev => ({ ...prev, microphone: true }));
      // Stop the stream after test
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        setIsTesting(prev => ({ ...prev, microphone: false }));
      }, 3000);
    } catch (error) {
      alert('Microphone access denied or not available');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl text-white">🤖</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            AI Mock Interview
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Practice your interview skills with AI-powered feedback and real-time analysis
          </p>
          
          {/* Device Status Alerts */}
          <div className="flex justify-center gap-4 mb-6">
            {!cameraAvailable && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
                <CameraOff size={20} className="text-yellow-600" />
                <span className="text-yellow-700 font-medium">Camera not available</span>
              </div>
            )}
            {!audioAvailable && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
                <Mic size={20} className="text-yellow-600" />
                <span className="text-yellow-700 font-medium">Microphone not available</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Features & Stats */}
          <div className="space-y-6">
            {/* Features Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🌟 Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Video className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Real-time Face Detection</h4>
                    <p className="text-sm text-gray-600">Monitor your presence and engagement</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mic className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Audio Recording & Analysis</h4>
                    <p className="text-sm text-gray-600">Get feedback on your speech patterns</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Award className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">AI-Powered Feedback</h4>
                    <p className="text-sm text-gray-600">Detailed scoring and improvement tips</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Interview Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Clock className="mx-auto text-blue-600 mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-800">45 min</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center">
                  <Users className="mx-auto text-green-600 mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-800">20+</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="text-center">
                  <Star className="mx-auto text-yellow-600 mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-800">3</div>
                  <div className="text-sm text-gray-600">Difficulty Levels</div>
                </div>
                <div className="text-center">
                  <Award className="mx-auto text-purple-600 mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-800">100%</div>
                  <div className="text-sm text-gray-600">AI Evaluated</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Configuration */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">⚙️ Interview Setup</h3>
              <button
                onClick={onOpenConfig}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Advanced Settings"
              >
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Interview Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Type
                </label>
                <select
                  value={interviewConfig.interviewType}
                  onChange={(e) => setInterviewConfig(prev => ({
                    ...prev,
                    interviewType: e.target.value
                  }))}
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
                  value={interviewConfig.difficulty}
                  onChange={(e) => setInterviewConfig(prev => ({
                    ...prev,
                    difficulty: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Device Testing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Test Your Devices
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={testCamera}
                    disabled={!cameraAvailable || isTesting.camera}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      isTesting.camera 
                        ? 'bg-green-500 text-white' 
                        : cameraAvailable 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Video size={18} />
                    {isTesting.camera ? 'Testing...' : 'Test Camera'}
                  </button>
                  
                  <button
                    onClick={testMicrophone}
                    disabled={!audioAvailable || isTesting.microphone}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      isTesting.microphone 
                        ? 'bg-green-500 text-white' 
                        : audioAvailable 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Mic size={18} />
                    {isTesting.microphone ? 'Testing...' : 'Test Mic'}
                  </button>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartInterview}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <Play size={24} />
                Start Mock Interview
              </button>

              {/* Quick Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Quick Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Ensure good lighting on your face</li>
                  <li>• Find a quiet environment</li>
                  <li>• Test your devices before starting</li>
                  <li>• Have a glass of water nearby</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;