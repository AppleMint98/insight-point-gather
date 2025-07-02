
import { useState } from 'react';
import { ArrowLeft, Gift, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const MyRewards = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');

  // 샘플 보상 데이터
  const availableRewards = [
    {
      id: '1',
      name: '스타벅스 아메리카노',
      type: 'voucher',
      value: '4,500원',
      earnedDate: '2024-06-28',
      expiryDate: '2024-09-28',
      source: '3분기 직무 만족도 조사'
    },
    {
      id: '2',
      name: '1,500P',
      type: 'points',
      value: '1,500원',
      earnedDate: '2024-06-25',
      expiryDate: null,
      source: '온라인 쇼핑 패턴 분석 연구'
    },
    {
      id: '3',
      name: '치킨 기프티콘',
      type: 'voucher',
      value: '18,000원',
      earnedDate: '2024-06-20',
      expiryDate: '2024-08-20',
      source: '대학생 진로 인식 설문조사'
    }
  ];

  const usedRewards = [
    {
      id: '4',
      name: '편의점 상품권',
      type: 'voucher',
      value: '10,000원',
      earnedDate: '2024-06-15',
      usedDate: '2024-06-18',
      source: '직장인 워크라이프 밸런스 조사'
    },
    {
      id: '5',
      name: '2,000P',
      type: 'points',
      value: '2,000원',
      earnedDate: '2024-06-10',
      usedDate: '2024-06-12',
      source: '20대 미디어 소비 습관 조사'
    }
  ];

  const handleUseReward = (rewardId: string) => {
    console.log('Using reward:', rewardId);
    toast({
      title: "보상 사용 완료",
      description: "보상이 성공적으로 사용되었습니다.",
    });
  };

  const RewardCard = ({ reward, isUsed = false }: { reward: any; isUsed?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Gift className="w-5 h-5 text-accent" />
              <h3 className="font-medium text-gray-900">{reward.name}</h3>
              <Badge 
                variant={reward.type === 'points' ? 'secondary' : 'default'}
                className={reward.type === 'points' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}
              >
                {reward.type === 'points' ? '포인트' : '기프티콘'}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{reward.source}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-accent">{reward.value}</span>
              <div className="text-xs text-gray-500">
                {isUsed ? (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>사용: {reward.usedDate}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>획득: {reward.earnedDate}</span>
                  </div>
                )}
              </div>
            </div>
            
            {!isUsed && reward.expiryDate && (
              <p className="text-xs text-red-600 mt-1">
                만료일: {reward.expiryDate}
              </p>
            )}
          </div>
        </div>
        
        {!isUsed && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <Button
              onClick={() => handleUseReward(reward.id)}
              className="w-full bg-accent hover:bg-accent-600"
              size="sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              사용하기
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const totalValue = availableRewards.reduce((sum, reward) => {
    const value = parseInt(reward.value.replace(/[^0-9]/g, ''));
    return sum + value;
  }, 0);

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
          <h1 className="text-xl font-bold text-gray-900">내 보상</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Summary Card */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-accent">{totalValue.toLocaleString()}원</p>
                <p className="text-sm text-gray-600">사용 가능한 보상</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{availableRewards.length + usedRewards.length}</p>
                <p className="text-sm text-gray-600">총 받은 보상</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="available" className="relative">
              사용 가능
              {availableRewards.length > 0 && (
                <Badge className="ml-2 bg-accent text-white text-xs px-1 py-0.5 h-5">
                  {availableRewards.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="used">사용 완료</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            {availableRewards.length > 0 ? (
              availableRewards.map(reward => (
                <RewardCard key={reward.id} reward={reward} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  사용 가능한 보상이 없습니다.<br />
                  <span className="text-sm text-gray-400">설문에 참여하고 보상을 받아보세요!</span>
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="used" className="space-y-4">
            {usedRewards.length > 0 ? (
              usedRewards.map(reward => (
                <RewardCard key={reward.id} reward={reward} isUsed={true} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">사용한 보상이 없습니다.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
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

export default MyRewards;
