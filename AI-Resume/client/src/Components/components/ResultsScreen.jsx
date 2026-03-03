import React from 'react';
import { Download, Share2, RotateCcw, Star, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const ResultsScreen = ({ results, onRestart, onDownloadReport }) => {
  const defaultResults = {
    totalQuestions: 5,
    answeredQuestions: 5,
    faceDetectionScore: 85,
    averageAnswerLength: 45,
    completionTime: new Date().toLocaleString(),
    overallScore: 78
  };

  const finalResults = results || defaultResults;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Practice';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Interview Results
          </h1>
          <p className="text-lg text-gray-600">
            Here's how you performed in your mock interview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-8 border-blue-100 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${getScoreColor(finalResults.overallScore)}`}>
                    {finalResults.overallScore}%
                  </span>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Overall Score
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              finalResults.overallScore >= 80 ? 'bg-green-100 text-green-800' :
              finalResults.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getScoreBadge(finalResults.overallScore)}
            </span>
          </div>

          {/* Completion Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="mr-2 text-green-500" size={20} />
              Completion
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Questions Answered</span>
                <span className="font-semibold">
                  {finalResults.answeredQuestions}/{finalResults.totalQuestions}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completion Time</span>
                <span className="font-semibold text-sm">{finalResults.completionTime}</span>
              </div>
            </div>
          </div>

          {/* Face Detection Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-blue-500" size={20} />
              Engagement
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Face Detection</span>
                <span className={`font-semibold ${getScoreColor(finalResults.faceDetectionScore)}`}>
                  {finalResults.faceDetectionScore}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Answer Length</span>
                <span className="font-semibold">{finalResults.averageAnswerLength} sec avg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={onDownloadReport}
              className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={18} />
              <span>Download Report</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 size={18} />
              <span>Share Results</span>
            </button>
            
            <button
              onClick={onRestart}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <RotateCcw size={18} />
              <span>Practice Again</span>
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Feedback & Suggestions</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">✅ Strengths</h4>
              <ul className="text-sm text-green-700 list-disc list-inside space-y-1">
                <li>Good communication skills and clear articulation</li>
                <li>Strong technical knowledge demonstrated</li>
                <li>Professional demeanor throughout the interview</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Areas for Improvement</h4>
              <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                <li>Provide more specific examples with measurable results</li>
                <li>Work on conciseness in your responses</li>
                <li>Practice maintaining consistent eye contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;