
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Gift, TrendingUp, Users, Award, ChevronRight } from 'lucide-react';
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
      participants: 1247
    },
    {
      id: '2',
      title: '대학생 진로 인식 설문조사',
      author: '김민수 교수',
      duration: '약 12분',
      reward: '치킨 기프티콘',
      daysLeft: 1,
      participants: 856
    }
  ];

  // 최근 받은 보상 (기프티콘만)
  const recentRewards = [
    { id: '1', name: '스타벅스 아메리카노', date: '2024-06-28', status: '사용 가능' },
    { id: '2', name: '치킨 기프티콘', date: '2024-06-25', status: '사용 완료' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">SH</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">서베이 허브</h1>
          </div>
          <div className="text-sm text-gray-600">
            안녕하세요, 김철수님!
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">오늘도 함께해주세요!</h2>
          <p className="text-primary-100 mb-4">새로운 설문에 참여하고 다양한 기프티콘을 받아보세요</p>
          <Button 
            onClick={() => navigate('/surveys')}
            className="bg-white text-primary hover:bg-gray-100"
          >
            설문 둘러보기
          </Button>
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
            <h3 className="text-lg font-semibold text-gray-900">추천 설문</h3>
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
              <Card key={survey.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900 line-clamp-2 flex-1 pr-2">
                      {survey.title}
                    </h4>
                    <Badge variant="secondary" className="shrink-0">
                      {survey.daysLeft}일 남음
                    </Badge>
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

        {/* Recent Rewards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">최근 받은 보상</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile/rewards')}
              className="text-primary hover:text-primary-600"
            >
              전체보기 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentRewards.map((reward) => (
              <Card key={reward.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                        <Gift className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{reward.name}</h4>
                        <p className="text-sm text-gray-600">{reward.date}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={reward.status === '사용 가능' ? 'default' : 'secondary'}
                      className={reward.status === '사용 가능' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                    >
                      {reward.status}
                    </Badge>
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
