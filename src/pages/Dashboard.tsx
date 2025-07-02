import { ArrowLeft, Plus, BarChart3, Users, Download, Bell, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const navigate = useNavigate();

  // 샘플 설문 데이터
  const activeSurveys = [
    {
      id: '1',
      title: '3분기 직무 만족도 조사',
      type: 'required',
      targetGroup: 'AA회사',
      responseRate: 68,
      totalResponses: 127,
      targetResponses: 187,
      daysLeft: 2,
      nonResponders: 60
    },
    {
      id: '2',
      title: '신규 복지제도 선호도 조사',
      type: 'optional',
      targetGroup: 'AA회사',
      responseRate: 45,
      totalResponses: 89,
      targetResponses: 200,
      daysLeft: 5,
      nonResponders: 111
    }
  ];

  const handleDownloadReport = (surveyId: string) => {
    console.log(`Downloading report for survey ${surveyId}`);
    // 실제로는 API 호출로 리포트 다운로드
  };

  const handleViewNonResponders = (surveyId: string) => {
    navigate(`/dashboard/non-responders/${surveyId}`);
  };

  const handleAutoReminder = (surveyId: string) => {
    console.log(`Setting auto reminder for survey ${surveyId}`);
    // 자동 리마인더 설정
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">대시보드</h1>
          </div>
          <Button 
            onClick={() => navigate('/create')}
            className="bg-accent hover:bg-accent-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            설문 만들기
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">총 설문</p>
                  <p className="text-xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent-100 rounded-lg">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">총 응답</p>
                  <p className="text-xl font-bold text-gray-900">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Surveys with Real-time Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>실시간 설문 모니터링</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeSurveys.map((survey) => (
              <div key={survey.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        variant={survey.type === 'required' ? 'destructive' : 'secondary'}
                        className={survey.type === 'required' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}
                      >
                        {survey.type === 'required' ? '필수' : '선택'}
                      </Badge>
                      <Badge variant="outline">{survey.targetGroup}</Badge>
                      {survey.daysLeft <= 2 && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{survey.title}</h3>
                    
                    {/* 실시간 응답률 그래프 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">응답률</span>
                        <span className="font-medium text-primary">{survey.responseRate}%</span>
                      </div>
                      <Progress value={survey.responseRate} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{survey.totalResponses}명 응답</span>
                        <span>목표: {survey.targetResponses}명</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-sm">
                      <span className="text-gray-600">{survey.daysLeft}일 남음</span>
                      <button
                        onClick={() => handleViewNonResponders(survey.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        미응답자 {survey.nonResponders}명 ›
                      </button>
                    </div>
                  </div>
                </div>

                {/* 액션 버튼들 */}
                <div className="flex space-x-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAutoReminder(survey.id)}
                  >
                    <Bell className="w-4 h-4 mr-1" />
                    리마인더 설정
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadReport(survey.id)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    리포트 다운로드
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 과거 설문 히스토리 */}
        <Card>
          <CardHeader>
            <CardTitle>설문 히스토리</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500">체계적인 히스토리가 여기에 표시됩니다.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Back Button - Fixed Position */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-6 left-4 w-12 h-12 bg-white shadow-lg border border-gray-200 rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 z-40"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default Dashboard;
