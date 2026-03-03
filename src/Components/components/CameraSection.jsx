import React, { useEffect } from 'react';

const CameraSection = ({ videoRef, faceDetection, isRecording, cameraAvailable }) => {
  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.play().catch(error => {
        console.log('Video play error:', error);
      });
    }
  }, [videoRef]);

  if (!cameraAvailable) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📷</div>
            <p>Camera not available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-3 left-3 flex items-center space-x-2 bg-red-500 text-white px-2 py-1 rounded-md">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">REC</span>
          </div>
        )}
        
        {/* Face Detection Status */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className={`px-3 py-2 rounded-lg text-white text-sm font-medium ${
            faceDetection.isFaceDetected ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {faceDetection.isFaceDetected ? '✅ Face Detected' : '❌ No Face Detected'}
          </div>
        </div>
        
        {/* Confidence Score */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
          Confidence: {faceDetection.stats.confidenceScore}%
        </div>
      </div>
      
      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="font-semibold">Detections</div>
          <div>{faceDetection.stats.totalDetections}</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="font-semibold">Missed</div>
          <div>{faceDetection.stats.missedFrames}</div>
        </div>
      </div>
    </div>
  );
};

export default CameraSection;