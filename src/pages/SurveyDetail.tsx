
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Star, Gift, Calendar, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const SurveyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // 샘플 설문 데이터 (실제로는 API에서 가져옴)
  const surveyData = {
    '1': {
      title: '20대 미디어 소비 습관 조사',
      author: '이지혜 연구원',
      authorRating: 4.5,
      duration: '약 8분',
      reward: '커피 기프티콘',
      daysLeft: 3,
      description: '20대의 미디어 소비 패턴과 선호도를 분석하기 위한 연구조사입니다. 여러분의 소중한 의견이 미디어 산업 발전에 큰 도움이 됩니다.',
      participants: 1247,
      maxParticipants: 2000,
      requirements: ['만 20-29세', '국내 거주자', '스마트폰 사용자'],
      questions: 15,
      category: '미디어/엔터테인먼트'
    }
  };

  const survey = surveyData[id as keyof typeof surveyData];

  if (!survey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>설문을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleParticipate = () => {
    // 설문을 내 보관함에 추가하는 로직
    console.log(`Adding survey ${id} to library`);
    
    // 확인 메시지 표시
    setShowConfirmation(true);
    toast({
      title: "내 보관함에 저장되었습니다",
      description: "내 보관함에서 설문을 진행해주세요.",
    });
    
    // 1초 후 확인 메시지 숨김
    setTimeout(() => {
      setShowConfirmation(false);
    }, 1000);
  };

  const progressPercentage = (survey.participants / survey.maxParticipants) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">설문 상세정보</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Main Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {survey.category}
                </Badge>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  {survey.title}
                </h1>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-medium">{survey.author}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{survey.authorRating}</span>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${survey.daysLeft <= 1 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  {survey.daysLeft}일 남음
                </Badge>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {survey.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Survey Details */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-900 mb-4">설문 정보</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">소요 시간</p>
                  <p className="font-medium">{survey.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-gray-500">보상</p>
                  <p className="font-medium text-accent">{survey.reward}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">문항 수</p>
                  <p className="font-medium">{survey.questions}개</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">참여자</p>
                  <p className="font-medium">{survey.participants.toLocaleString()}명</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participation Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">참여 현황</h3>
              <span className="text-sm text-gray-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {survey.participants.toLocaleString()} / {survey.maxParticipants.toLocaleString()}명 참여
            </p>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">참여 조건</h3>
            <ul className="space-y-2">
              {survey.requirements.map((req, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button 
          onClick={handleParticipate}
          className="w-full h-12 bg-primary hover:bg-primary-600 text-white font-medium"
        >
          참여하기
        </Button>
      </div>

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg text-center">
            <CheckCircle className="w-5 h-5 inline-block mr-2" />
            내 보관함에 저장되었습니다
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyDetail;
