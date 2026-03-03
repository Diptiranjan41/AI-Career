import React from "react";

const NavigationControls = ({
  currentIndex = 0,
  totalQuestions = 0,
  onPrevious = () => {},
  onNext = () => {},
  onSubmit = () => {},
  isRecording = false,
  audioAvailable = false,
  interviewState = {},
  currentSection = "descriptive"
}) => {
  // Safe access with fallbacks
  const safeInterviewState = interviewState || {};

  const isInteractionBlocked = safeInterviewState.cameraRequired && !safeInterviewState.cameraEnabled;

  const getCurrentAnswerStatus = () => {
    if (currentSection === "descriptive") {
      const answers = safeInterviewState.userAnswers || [];
      const currentAnswer = answers[currentIndex] || "";
      return {
        text: `${currentAnswer.length} characters`,
        answered: currentAnswer.length > 0
      };
    } else {
      // For MCQ and Aptitude sections
      const answers = currentSection === "mcq" 
        ? safeInterviewState.mcqAnswers || {} 
        : safeInterviewState.aptitudeAnswers || {};
      return {
        text: answers[currentIndex] !== undefined ? 'Answered' : 'Not answered',
        answered: answers[currentIndex] !== undefined
      };
    }
  };

  const answerStatus = getCurrentAnswerStatus();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Status Information */}
        <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
          <span>
            {answerStatus.text} • 
            {answerStatus.answered ? ' ✅ Answered' : ' ❌ Not answered'}
          </span>
          
          {safeInterviewState.sirenPlaying && (
            <span className="text-red-500">🚨 Siren Active</span>
          )}
          
          {isRecording && audioAvailable && (
            <span className="text-blue-500">🎤 Recording...</span>
          )}
          
          {!safeInterviewState.faceVisible && safeInterviewState.faceDetectionEnabled && (
            <span className="text-orange-500">👁️ Face Detection Issue</span>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          {/* Previous Button */}
          {currentIndex > 0 && (
            <button
              onClick={onPrevious}
              disabled={isInteractionBlocked}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
          )}
          
          {/* Section Navigation - Show when at first/last question of section */}
          {safeInterviewState.interviewType === "full" && currentSection !== "descriptive" && currentIndex === 0 && (
            <button
              onClick={onPrevious}
              disabled={isInteractionBlocked}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Section
            </button>
          )}
          
          {/* Next/Submit Buttons */}
          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={onNext}
              disabled={isInteractionBlocked}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Question
            </button>
          ) : safeInterviewState.interviewType === "full" && currentSection !== "aptitude" ? (
            <button
              onClick={onNext}
              disabled={isInteractionBlocked}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Section
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={safeInterviewState.isSubmitting || isInteractionBlocked}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {safeInterviewState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                'Submit Answers'
              )}
            </button>
          )}
        </div>
      </div>

      {/* Audio Error Display */}
      {safeInterviewState.audioError && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{safeInterviewState.audioError}</p>
          {safeInterviewState.audioError.includes('no-speech') && (
            <p className="text-sm text-red-600 mt-1">
              Tips: Speak clearly and ensure your microphone is working properly.
            </p>
          )}
        </div>
      )}

      {/* Speech Recognition Tips */}
      {safeInterviewState.interviewMode === "audio" && !isRecording && currentSection === "descriptive" && audioAvailable && (
        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-700">
            <strong>Tip:</strong> Click the microphone button and speak clearly. The speech recognition works best in Chrome/Edge browsers.
          </p>
        </div>
      )}

      {/* Camera Required Warning */}
      {isInteractionBlocked && (
        <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-700">
            <strong>Camera Required:</strong> Please enable your camera to continue with the interview.
          </p>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span className="capitalize">
          {currentSection} Section
        </span>
      </div>
    </div>
  );
};

export default NavigationControls;