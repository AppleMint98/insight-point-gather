
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SurveyCard from '@/components/SurveyCard';
import BottomNavigation from '@/components/BottomNavigation';

const SurveyList = () => {
  const navigate = useNavigate();
  
  // 샘플 설문 데이터
  const surveys = [
    {
      id: '1',
      title: '20대 미디어 소비 습관 조사',
      author: '이지혜 연구원',
      authorRating: 4.5,
      duration: '약 8분',
      reward: '커피 기프티콘',
      daysLeft: 3
    },
    {
      id: '2', 
      title: '대학생 진로 인식 설문조사',
      author: '김민수 교수',
      authorRating: 4.8,
      duration: '약 12분',
      reward: '500P',
      daysLeft: 1
    },
    {
      id: '3',
      title: '온라인 쇼핑 패턴 분석 연구',
      author: '박소영 연구원',
      authorRating: 4.2,
      duration: '약 6분',
      reward: '치킨 기프티콘', 
      daysLeft: 5
    },
    {
      id: '4',
      title: '직장인 워크라이프 밸런스 조사',
      author: '정현우 매니저',
      authorRating: 4.7,
      duration: '약 10분',
      reward: '1000P',
      daysLeft: 2
    }
  ];

  const handleSurveyClick = (surveyId: string) => {
    navigate(`/survey/${surveyId}`);
  };

  const handleCreateSurvey = () => {
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">SH</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">서베이 허브</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-6 h-6 text-gray-700" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </button>
        </div>
      </header>

      {/* Event Banner */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-accent-500 to-accent-400 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">참여하면 포인트를 드려요!</h2>
            <p className="text-sm opacity-90 mt-1">지금 설문에 참여하고 다양한 보상을 받아보세요</p>
          </div>
          <div className="text-3xl">🎁</div>
        </div>
      </div>

      {/* Survey List */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">참여 가능한 설문</h2>
          <span className="text-sm text-gray-600">{surveys.length}개</span>
        </div>
        
        <div className="space-y-4">
          {surveys.map((survey) => (
            <SurveyCard
              key={survey.id}
              {...survey}
              onClick={() => handleSurveyClick(survey.id)}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleCreateSurvey}
        className="fixed bottom-24 right-6 w-14 h-14 bg-accent hover:bg-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      <BottomNavigation />

      {/* Back Button - Fixed Position */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-24 left-4 w-12 h-12 bg-white shadow-lg border border-gray-200 rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 z-40"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default SurveyList;
