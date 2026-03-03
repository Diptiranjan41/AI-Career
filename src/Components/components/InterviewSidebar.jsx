import React from "react";

const InterviewSidebar = ({
  questions = [],
  currentIndex = 0,
  answers = [],
  faceDetection = {},
  cameraAvailable = false,
  audioAvailable = false,
  recordingTime = 0,
  currentSection = "descriptive",
  interviewState = {},
  onQuestionSelect = () => {},
  onSubmit = () => {}
}) => {
  // Safe access with fallbacks
  const safeFaceDetection = faceDetection || {};
  const safeStats = safeFaceDetection.stats || {};
  const safeInterviewState = interviewState || {};
  
  const getTotalQuestionsInSection = () => {
    if (currentSection === "descriptive") return questions.length;
    return questions.length; // Default fallback
  };

  const getCurrentAnswer = (index) => {
    return answers[index] || "";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isInteractionBlocked = safeInterviewState.cameraRequired && !safeInterviewState.cameraEnabled;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Section Progress</span>
              <span className="text-sm font-semibold text-blue-600">
                {currentIndex + 1}/{getTotalQuestionsInSection()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / Math.max(getTotalQuestionsInSection(), 1)) * 100}%` }}
              />
            </div>
          </div>

          {safeInterviewState.interviewType === "full" && (
            <>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Descriptive</span>
                  <span className="text-sm font-semibold text-green-600">
                    {answers.filter(answer => answer && answer.trim() !== "").length}/{questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(answers.filter(answer => answer && answer.trim() !== "").length / Math.max(questions.length, 1)) * 100}%` }}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Time Used</span>
              <span className="text-sm font-semibold text-red-600">
                {formatTime(45 * 60 - (safeInterviewState.timeLeft || 0))}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((45 * 60 - (safeInterviewState.timeLeft || 0)) / (45 * 60)) * 100}%` }}
              />
            </div>
          </div>

          {/* Face Detection Progress */}
          {safeInterviewState.faceDetectionEnabled && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Face Detections</span>
                <span className="text-sm font-semibold text-purple-600">
                  {safeStats.totalDetections || 0}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(safeStats.totalDetections || 0, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Audio Recording */}
          {audioAvailable && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Recording</span>
                <span className="text-sm font-semibold text-blue-600">
                  {formatTime(recordingTime)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: getTotalQuestionsInSection() }, (_, index) => (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              disabled={isInteractionBlocked}
              className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                currentIndex === index
                  ? 'bg-blue-500 text-white shadow-md'
                  : getCurrentAnswer(index) && getCurrentAnswer(index).trim() !== ""
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${isInteractionBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Section Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Section</h3>
        <div className={`px-4 py-3 rounded-lg ${
          currentSection === "descriptive" ? "bg-blue-100 text-blue-800" :
          currentSection === "mcq" ? "bg-purple-100 text-purple-800" :
          "bg-orange-100 text-orange-800"
        }`}>
          <div className="font-medium capitalize">{currentSection} Questions</div>
          <div className="text-sm mt-1">
            {currentSection === "descriptive" && "Type your answers"}
            {currentSection === "mcq" && "Multiple choice questions"}
            {currentSection === "aptitude" && "Aptitude test questions"}
          </div>
        </div>
      </div>

      {/* End Test Button */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <button
          onClick={onSubmit}
          disabled={safeInterviewState.isSubmitting}
          className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {safeInterviewState.isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Ending Test...
            </span>
          ) : (
            'End Test & Submit Answers'
          )}
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Once you end the test, you cannot return to the interview
        </p>
      </div>
    </div>
  );
};

export default InterviewSidebar;