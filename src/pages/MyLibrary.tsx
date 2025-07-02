
import { useState } from 'react';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNavigation from '@/components/BottomNavigation';

interface SurveyItem {
  id: string;
  title: string;
  type: 'required' | 'optional';
  daysLeft: number;
  completedAt?: string;
  reward?: string;
  isNew?: boolean; // 새로 도착한 설문 표시
}

const MyLibrary = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');

  // 샘플 데이터 - 새로 도착한 설문 포함
  const ongoingSurveys: SurveyItem[] = [
    {
      id: '1',
      title: '3분기 직무 만족도 조사',
      type: 'required',
      daysLeft: 1,
      isNew: true // 새로 도착한 필수 설문
    },
    {
      id: '2', 
      title: '신규 복지제도 선호도 조사',
      type: 'optional',
      daysLeft: 3,
      isNew: true // 새로 도착한 선택 설문
    },
    {
      id: '3',
      title: '20대 미디어 소비 습관 조사',
      type: 'optional', 
      daysLeft: 2
    }
  ];

  const completedSurveys: SurveyItem[] = [
    {
      id: '4',
      title: '직장인 워크라이프 밸런스 조사',
      type: 'optional',
      daysLeft: 0,
      completedAt: '2024-06-28',
      reward: '1000P'
    },
    {
      id: '5',
      title: '온라인 쇼핑 패턴 분석 연구',
      type: 'optional',
      daysLeft: 0,
      completedAt: '2024-06-25', 
      reward: '치킨 기프티콘'
    }
  ];

  const handleSurveyClick = (surveyId: string) => {
    console.log(`Opening survey ${surveyId}`);
    // 실제로는 설문 응답 페이지로 이동
  };

  const SurveyItemCard = ({ survey, isCompleted = false }: { survey: SurveyItem; isCompleted?: boolean }) => (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        survey.isNew ? 'ring-2 ring-accent-200 bg-accent-50' : ''
      }`}
      onClick={() => handleSurveyClick(survey.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {survey.isNew && (
                <Badge className="bg-accent text-white text-xs px-2 py-1">
                  NEW
                </Badge>
              )}
              <Badge 
                variant={survey.type === 'required' ? 'destructive' : 'secondary'}
                className={`text-xs ${
                  survey.type === 'required' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {survey.type === 'required' ? '필수' : '선택'}
              </Badge>
              {survey.type === 'required' && survey.daysLeft <= 1 && (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              )}
            </div>
            
            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
              {survey.title}
            </h3>
            
            {isCompleted ? (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>완료: {survey.completedAt}</span>
                </div>
                {survey.reward && (
                  <span className="text-accent font-medium">{survey.reward}</span>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className={survey.daysLeft <= 1 ? 'text-red-600 font-medium' : ''}>
                    {survey.daysLeft}일 남음
                  </span>
                </div>
                {survey.isNew && (
                  <span className="text-xs text-accent font-medium">
                    새로 도착한 설문
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // 새로 도착한 설문 개수
  const newSurveyCount = ongoingSurveys.filter(s => s.isNew).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">내 보관함</h1>
          {/* 알림 표시 */}
          {newSurveyCount > 0 && (
            <div className="flex items-center space-x-1 text-accent">
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">{newSurveyCount}개 새 설문</span>
            </div>
          )}
        </div>
      </header>

      <div className="px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="ongoing" className="relative">
              진행 중
              {ongoingSurveys.filter(s => s.type === 'required').length > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
              {newSurveyCount > 0 && (
                <Badge className="ml-2 bg-accent text-white text-xs px-1 py-0.5 h-5">
                  {newSurveyCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">완료</TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-4">
            {ongoingSurveys.length > 0 ? (
              <>
                {/* 새로 도착한 설문을 먼저 표시 */}
                {ongoingSurveys
                  .filter(survey => survey.isNew)
                  .map(survey => (
                    <SurveyItemCard key={survey.id} survey={survey} />
                  ))}
                
                {/* 필수 설문 (새 설문 제외) */}
                {ongoingSurveys
                  .filter(survey => survey.type === 'required' && !survey.isNew)
                  .map(survey => (
                    <SurveyItemCard key={survey.id} survey={survey} />
                  ))}
                
                {/* 선택 설문 (새 설문 제외) */}
                {ongoingSurveys
                  .filter(survey => survey.type === 'optional' && !survey.isNew)
                  .map(survey => (
                    <SurveyItemCard key={survey.id} survey={survey} />
                  ))}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  진행 중인 설문이 없습니다.<br />
                  <span className="text-sm text-gray-400">새로운 설문이 도착하면 자동으로 여기에 정리됩니다.</span>
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedSurveys.length > 0 ? (
              completedSurveys.map(survey => (
                <SurveyItemCard key={survey.id} survey={survey} isCompleted={true} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">완료한 설문이 없습니다.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
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

export default MyLibrary;
