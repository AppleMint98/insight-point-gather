
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus, ArrowLeft, Users, Target, Clock, Home, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      daysLeft: 3,
      isCompleted: false
    },
    {
      id: '2', 
      title: '대학생 진로 인식 설문조사',
      author: '김민수 교수',
      authorRating: 4.8,
      duration: '약 12분',
      reward: '500P',
      daysLeft: 1,
      isCompleted: false
    },
    {
      id: '3',
      title: '온라인 쇼핑 패턴 분석 연구',
      author: '박소영 연구원',
      authorRating: 4.2,
      duration: '약 6분',
      reward: '치킨 기프티콘', 
      daysLeft: 5,
      isCompleted: true
    },
    {
      id: '4',
      title: '직장인 워크라이프 밸런스 조사',
      author: '정현우 매니저',
      authorRating: 4.7,
      duration: '약 10분',
      reward: '1000P',
      daysLeft: 2,
      isCompleted: false
    }
  ];

  const handleSurveyClick = (surveyId: string) => {
    const survey = surveys.find(s => s.id === surveyId);
    if (survey?.isCompleted) return; // 완료된 설문은 클릭 불가
    // 바로 응답 페이지로 이동
    navigate(`/survey/${surveyId}/response`);
  };

  const handleSurveyDetail = (surveyId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    navigate(`/survey/${surveyId}`);
  };

  const handleCreateSurvey = () => {
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 -ml-2 transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">SH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">서베이 허브</h1>
              <p className="text-xs text-gray-600">그룹 내 설문 플랫폼</p>
            </div>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-6 h-6 text-gray-700" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </button>
        </div>
      </header>

      {/* Service Features Banner */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-bold text-lg">그룹 기반 설문 서비스</h2>
            <p className="text-sm opacity-90 mt-1">회사/학교/동호회 등 소속 그룹에서만 진행되는 신뢰도 높은 설문</p>
          </div>
          <Users className="w-8 h-8 opacity-80" />
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>타겟 그룹 설문</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>응답 시간 검증</span>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* 설문 참여 카드 */}
          <Card className="border-2 border-accent-200 bg-accent-50">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">설문 참여</h3>
              <p className="text-xs text-gray-600 mb-3">다양한 경품을 얻을 수 있어요</p>
              <Badge className="bg-accent text-white text-xs">
                {surveys.filter(s => !s.isCompleted).length}개 참여 가능
              </Badge>
            </CardContent>
          </Card>

          {/* 설문 의뢰 카드 */}
          <Card 
            className="border-2 border-primary-200 bg-primary-50 cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleCreateSurvey}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">설문 의뢰</h3>
              <p className="text-xs text-gray-600 mb-3">그룹 내 설문을 만들어보세요</p>
              <Badge className="bg-primary text-white text-xs">
                무료 제작
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Survey List */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">참여 가능한 설문</h2>
          <span className="text-sm text-gray-600">{surveys.length}개</span>
        </div>
        
        <div className="space-y-4">
          {surveys.map((survey) => (
            <div key={survey.id} className="relative">
              <div 
                className={`${survey.isCompleted ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => handleSurveyClick(survey.id)}
              >
                <SurveyCard {...survey} />
              </div>
              
              {/* 상세 정보 버튼 */}
              {!survey.isCompleted && (
                <button
                  onClick={(e) => handleSurveyDetail(survey.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                  title="상세 정보 보기"
                >
                  <Info className="w-4 h-4 text-gray-600" />
                </button>
              )}
              
              {survey.isCompleted && (
                <div className="mt-2 text-center">
                  <Badge className="bg-green-100 text-green-700">완료된 설문</Badge>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 설문 클릭 안내 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">💡</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">빠른 참여 방법</h4>
              <p className="text-sm text-blue-700">
                설문 카드를 클릭하면 바로 응답을 시작할 수 있습니다. 
                상세 정보가 필요하면 <Info className="w-4 h-4 inline mx-1" /> 버튼을 클릭하세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleCreateSurvey}
        className="fixed bottom-24 right-6 w-16 h-16 bg-primary hover:bg-primary-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center z-40 border-4 border-white"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* 설문 의뢰 안내 텍스트 */}
      <div className="fixed bottom-44 right-6 bg-primary text-white text-xs px-3 py-2 rounded-lg shadow-lg z-30">
        설문 의뢰하기
      </div>

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
