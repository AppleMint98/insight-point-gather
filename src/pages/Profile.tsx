
import { ArrowLeft, User, Mail, Building, Gift, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import BottomNavigation from '@/components/BottomNavigation';

const Profile = () => {
  const navigate = useNavigate();

  // 사용자 정보 (실제로는 로그인된 사용자 데이터)
  const userInfo = {
    name: '김철수',
    email: 'kim.chulsu@company.com',
    group: 'AA회사',
    joinDate: '2024년 1월',
    totalSurveys: 12,
    totalRewards: 3,
    completionRate: 85
  };

  const myRewards = [
    { id: '1', name: '스타벅스 아메리카노', status: '사용 가능', date: '2024-06-28' },
    { id: '2', name: '치킨 기프티콘', status: '사용 완료', date: '2024-06-20' }
  ];

  const handleViewAllRewards = () => {
    navigate('/profile/rewards');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">마이페이지</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* 사용자 프로필 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-white text-lg font-bold">
                  {userInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{userInfo.name}</h2>
                <div className="flex items-center space-x-1 text-gray-600 mt-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{userInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <Badge variant="secondary" className="bg-primary-100 text-primary">
                    {userInfo.group}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 내 활동 통계 */}
        <Card>
          <CardHeader>
            <CardTitle>내 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{userInfo.totalSurveys}</p>
                <p className="text-sm text-gray-600">참여 설문</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{userInfo.completionRate}%</p>
                <p className="text-sm text-gray-600">완료율</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{userInfo.totalRewards}</p>
                <p className="text-sm text-gray-600">받은 보상</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 내 보상 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>내 보상</CardTitle>
              <Button variant="outline" size="sm" onClick={handleViewAllRewards}>
                <Gift className="w-4 h-4 mr-2" />
                전체 보기
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {myRewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{reward.name}</p>
                  <p className="text-sm text-gray-600">{reward.date}</p>
                </div>
                <Badge 
                  variant={
                    reward.status === '사용 가능' ? 'default' : 'outline'
                  }
                  className={
                    reward.status === '사용 가능' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-600'
                  }
                >
                  {reward.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 그룹 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>내 그룹</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg">
              <Building className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{userInfo.group}</h3>
                <p className="text-sm text-gray-600">가입일: {userInfo.joinDate}</p>
                <p className="text-sm text-primary">그룹 전용 설문을 받을 수 있습니다</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 설정 메뉴 */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="flex-1 text-left text-gray-900">설정</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors text-red-600">
                <LogOut className="w-5 h-5" />
                <span className="flex-1 text-left">로그아웃</span>
              </button>
            </div>
          </CardContent>
        </Card>
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

export default Profile;
