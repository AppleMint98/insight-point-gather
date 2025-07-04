
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Gift, TrendingUp, Users, Award, ChevronRight, Home, Plus, BookOpen } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const navigate = useNavigate();

  // 추천 설문 데이터
  const recommendedSurveys = [
    {
      id: '1',
      title: '20대 미디어 소비 습관 조사',
      author: '이지혜 연구원',
      duration: '약 8분',
      reward: '커피 기프티콘',
      daysLeft: 3,
      participants: 1247,
      isCompleted: false
    },
    {
      id: '2',
      title: '대학생 진로 인식 설문조사',
      author: '김민수 교수',
      duration: '약 12분',
      reward: '치킨 기프티콘',
      daysLeft: 1,
      participants: 856,
      isCompleted: false
    }
  ];

  // 최근 받은 보상 (기프티콘만)
  const recentRewards = [
    { id: '1', name: '스타벅스 아메리카노', date: '2024-06-28', status: '사용 가능' },
    { id: '2', name: '치킨 기프티콘', date: '2024-06-25', status: '사용 완료' }
  ];

  const handleSurveyClick = (surveyId: string, isCompleted: boolean) => {
    if (isCompleted) return; // 완료된 설문은 클릭 불가
    navigate(`/survey/${surveyId}/response`); // 바로 설문 응답 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
      {/* Header - 홈 아이콘 추가 */}
      <header className="bg-white shadow-sm">
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
              <div className="flex items-center space-x-1">
                <Home className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">그룹 설문 플랫폼</span>
              </div>
            </div>
          </button>
          <div className="text-sm text-gray-600">
            안녕하세요, 김철수님!
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Welcome Section - 그룹 중심 메시징 */}
        <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">그룹 내 설문에 참여하세요!</h2>
          <p className="text-primary-100 mb-4">우리 그룹만의 신뢰할 수 있는 설문 조사</p>
          <div className="flex space-x-3">
            <Button 
              onClick={() => navigate('/surveys')}
              className="bg-white text-primary hover:bg-gray-100 flex-1"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              설문 둘러보기
            </Button>
            <Button 
              onClick={() => navigate('/create')}
              className="bg-accent hover:bg-accent-600 text-white flex-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              설문 만들기
            </Button>
          </div>
        </div>

        {/* Quick Action Cards - 그룹 중심으로 재구성 */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="border-2 border-accent-200 bg-accent-50 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/surveys')}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">그룹 설문 참여</h3>
              <p className="text-xs text-gray-600 mb-3">우리 그룹의 설문에 참여</p>
              <Badge className="bg-accent text-white text-xs">
                {recommendedSurveys.filter(s => !s.isCompleted).length}개 참여 가능
              </Badge>
            </CardContent>
          </Card>

          <Card 
            className="border-2 border-primary-200 bg-primary-50 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/create')}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">설문 만들기</h3>
              <p className="text-xs text-gray-600 mb-3">그룹에 설문 요청하기</p>
              <Badge className="bg-primary text-white text-xs">
                쉽고 빠르게
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-600">참여한 설문</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-600">받은 보상</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">85%</p>
              <p className="text-xs text-gray-600">완료율</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Surveys */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">그룹 추천 설문</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/surveys')}
              className="text-primary hover:text-primary-600"
            >
              전체보기 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recommendedSurveys.map((survey) => (
              <Card 
                key={survey.id} 
                className={`${survey.isCompleted ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'} transition-shadow`}
                onClick={() => handleSurveyClick(survey.id, survey.isCompleted)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900 line-clamp-2 flex-1 pr-2">
                      {survey.title}
                    </h4>
                    <div className="flex flex-col space-y-1">
                      <Badge variant="secondary" className="shrink-0">
                        {survey.daysLeft}일 남음
                      </Badge>
                      {survey.isCompleted && (
                        <Badge variant="default" className="shrink-0 bg-green-100 text-green-700">
                          완료
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{survey.author}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{survey.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{survey.participants}명 참여</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-accent font-medium">
                      <Gift className="w-4 h-4" />
                      <span className="text-sm">{survey.reward}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
