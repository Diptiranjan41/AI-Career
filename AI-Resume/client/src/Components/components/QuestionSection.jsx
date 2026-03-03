import React from "react";

const QuestionSection = ({
  currentQuestion = null,
  questionIndex = 0,
  totalQuestions = 0,
  isRecording = false,
  audioLevel = 0,
  audioAvailable = false,
  onRecordingToggle = () => {},
  onSubmitAnswer = () => {},
  currentSection = "descriptive",
  interviewState = {}
}) => {
  // Safe access with fallbacks
  const safeInterviewState = interviewState || {};
  const safeCurrentQuestion = currentQuestion || {};

  const extractQuestionText = (question) => {
    if (!question) return "Question not available";
    if (typeof question === 'string') return question;
    if (typeof question === 'object' && question !== null) {
      return question.question || question.text || question.title || JSON.stringify(question);
    }
    return "Question not available";
  };

  const getCurrentOptions = () => {
    if (currentSection === "mcq" || currentSection === "aptitude") {
      return safeCurrentQuestion.options || [];
    }
    return [];
  };

  const getCurrentAnswer = () => {
    if (currentSection === "descriptive") {
      const answers = safeInterviewState.userAnswers || [];
      return answers[questionIndex] || "";
    } else {
      const answers = currentSection === "mcq" 
        ? safeInterviewState.mcqAnswers || {} 
        : safeInterviewState.aptitudeAnswers || {};
      return answers[questionIndex];
    }
  };

  const handleOptionSelect = (optionIndex) => {
    if (currentSection === "mcq" || currentSection === "aptitude") {
      // For demo purposes, we'll just log the selection
      console.log(`Selected option ${optionIndex} for question ${questionIndex} in ${currentSection} section`);
      
      // In a real app, you would update the state here
      // const newAnswers = { ...safeInterviewState.mcqAnswers, [questionIndex]: optionIndex };
      // onAnswerUpdate({ mcqAnswers: newAnswers });
    }
  };

  const handleTextAnswerChange = (text) => {
    // For demo purposes, we'll just log the answer
    console.log(`Answer for question ${questionIndex}: ${text}`);
    
    // In a real app, you would update the state here
    // const newAnswers = [...safeInterviewState.userAnswers];
    // newAnswers[questionIndex] = text;
    // onAnswerUpdate({ userAnswers: newAnswers });
  };

  const handleSubmit = () => {
    const answerData = {
      questionId: safeCurrentQuestion.id || questionIndex,
      answerText: getCurrentAnswer(),
      timestamp: new Date().toISOString(),
      section: currentSection
    };
    onSubmitAnswer(answerData);
  };

  const isInteractionBlocked = safeInterviewState.cameraRequired && !safeInterviewState.cameraEnabled;

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {currentSection === "descriptive" ? "Descriptive" : 
               currentSection === "mcq" ? "Multiple Choice" : "Aptitude"} Question {questionIndex + 1} of {totalQuestions}
            </h2>
            <p className="text-gray-600 text-sm">
              {currentSection === "descriptive" ? "Type your detailed answer" : 
               currentSection === "mcq" ? "Choose the correct option" : "Solve the aptitude question"}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {currentSection}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {safeInterviewState.difficulty || "medium"}
            </span>
          </div>
        </div>
        
        {/* Question Content */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <p className="text-gray-800 text-lg leading-relaxed font-medium">
            {extractQuestionText(safeCurrentQuestion)}
          </p>
        </div>

        {/* Question Controls */}
        <div className="flex flex-wrap gap-2">
          {/* Audio Recording Button */}
          {audioAvailable && currentSection === "descriptive" && (
            <button
              onClick={onRecordingToggle}
              disabled={isInteractionBlocked}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } ${isInteractionBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>{isRecording ? '🛑 Stop Recording' : '🎤 Start Recording'}</span>
            </button>
          )}

          {/* Audio Level Indicator */}
          {isRecording && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-1 h-${level} rounded-full ${
                      audioLevel >= level * 20 ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">Recording...</span>
            </div>
          )}

          {/* Submit Answer Button */}
          <button
            onClick={handleSubmit}
            disabled={isInteractionBlocked || !getCurrentAnswer()}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        </div>
      </div>

      {/* Answer Section */}
      {currentSection === "descriptive" ? (
        <DescriptiveAnswerSection
          currentAnswer={getCurrentAnswer()}
          onAnswerChange={handleTextAnswerChange}
          isInteractionBlocked={isInteractionBlocked}
          isRecording={isRecording}
          audioAvailable={audioAvailable}
        />
      ) : (
        <MCQAnswerSection
          currentAnswer={getCurrentAnswer()}
          options={getCurrentOptions()}
          onOptionSelect={handleOptionSelect}
          currentSection={currentSection}
        />
      )}
    </div>
  );
};

const DescriptiveAnswerSection = ({ 
  currentAnswer = "", 
  onAnswerChange = () => {}, 
  isInteractionBlocked = false,
  isRecording = false,
  audioAvailable = false 
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <label className="block text-lg font-semibold text-gray-900 mb-4">
      Your Answer {audioAvailable && "(Voice Input Available)"}
    </label>
    
    {/* Recording Indicator */}
    {isRecording && (
      <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-700">
          <strong>Recording in progress:</strong> Speak clearly into your microphone
        </p>
      </div>
    )}

    <textarea
      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none mb-4 transition-all duration-200 ${
        isInteractionBlocked 
          ? 'bg-gray-100 border-gray-300 cursor-not-allowed' 
          : 'border-gray-300 hover:border-blue-300'
      }`}
      rows={8}
      value={currentAnswer}
      onChange={(e) => onAnswerChange(e.target.value)}
      placeholder={
        isInteractionBlocked 
          ? "Please enable camera to start answering questions..." 
          : audioAvailable
          ? "Type your answer or use the microphone button to record your answer..."
          : "Type your detailed answer here... The more specific and structured your answer, the better your score will be."
      }
      disabled={isInteractionBlocked}
    />

    {/* Character Count */}
    <div className="flex justify-between items-center text-sm text-gray-500">
      <span>{currentAnswer.length} characters</span>
      <span>{currentAnswer.length > 0 ? '✅ Answer saved' : '❌ No answer yet'}</span>
    </div>
  </div>
);

const MCQAnswerSection = ({ 
  currentAnswer, 
  options = [], 
  onOptionSelect = () => {},
  currentSection = "mcq"
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <label className="block text-lg font-semibold text-gray-900 mb-4">
      Select Your Answer ({currentSection.toUpperCase()})
    </label>
    <div className="space-y-3">
      {options.length > 0 ? (
        options.map((option, index) => (
          <div
            key={index}
            onClick={() => onOptionSelect(index)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              currentAnswer === index
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                currentAnswer === index
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300'
              }`}>
                {currentAnswer === index && (
                  <span className="text-xs">✓</span>
                )}
              </div>
              <span className="text-gray-800">{option}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No options available for this question
        </div>
      )}
    </div>

    {/* Selection Status */}
    {currentAnswer !== undefined && (
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-700 text-sm">
          ✅ Option {currentAnswer + 1} selected
        </p>
      </div>
    )}
  </div>
);

export default QuestionSection;