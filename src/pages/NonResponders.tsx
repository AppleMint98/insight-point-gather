
import { useState } from 'react';
import { ArrowLeft, Users, Mail, Phone, MessageSquare } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const NonResponders = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // 샘플 미응답자 데이터
  const nonResponders = [
    {
      id: '1',
      name: '김철수',
      email: 'kim.chulsu@company.com',
      department: '개발팀',
      daysOverdue: 1,
      lastReminder: '2024-06-27'
    },
    {
      id: '2',
      name: '이영희',
      email: 'lee.younghee@company.com',
      department: '마케팅팀',
      daysOverdue: 2,
      lastReminder: '2024-06-26'
    },
    {
      id: '3',
      name: '박민수',
      email: 'park.minsu@company.com',
      department: '인사팀',
      daysOverdue: 0,
      lastReminder: '2024-06-28'
    },
    {
      id: '4',
      name: '정소영',
      email: 'jung.soyoung@company.com',
      department: '기획팀',
      daysOverdue: 3,
      lastReminder: '2024-06-25'
    }
  ];

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === nonResponders.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(nonResponders.map(user => user.id));
    }
  };

  const handleSendReminder = () => {
    console.log('Sending reminder to:', selectedUsers);
    toast({
      title: "리마인더 발송 완료",
      description: `${selectedUsers.length}명에게 리마인더를 발송했습니다.`,
    });
    setSelectedUsers([]);
  };

  const handleSendMessage = () => {
    console.log('Sending message to:', selectedUsers);
    toast({
      title: "메시지 발송 완료",
      description: `${selectedUsers.length}명에게 개별 메시지를 발송했습니다.`,
    });
  };

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
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">미응답자 현황</h1>
            <p className="text-sm text-gray-600">3분기 직무 만족도 조사</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Summary Card */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-600">{nonResponders.length}</p>
                <p className="text-sm text-gray-600">미응답자</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {nonResponders.filter(u => u.daysOverdue > 0).length}
                </p>
                <p className="text-sm text-gray-600">연체자</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {selectedUsers.length}
                </p>
                <p className="text-sm text-gray-600">선택됨</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleSelectAll}
            className="flex-1"
          >
            {selectedUsers.length === nonResponders.length ? '전체 해제' : '전체 선택'}
          </Button>
          <Button
            onClick={handleSendReminder}
            disabled={selectedUsers.length === 0}
            className="flex-1"
          >
            <Mail className="w-4 h-4 mr-2" />
            리마인더 발송
          </Button>
        </div>

        {/* Non-responders List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              미응답자 목록
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nonResponders.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => handleSelectUser(user.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {user.department}
                    </Badge>
                    {user.daysOverdue > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {user.daysOverdue}일 연체
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">
                    마지막 리마인더: {user.lastReminder}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      console.log('Calling', user.name);
                      toast({
                        title: "전화 연결",
                        description: `${user.name}에게 전화를 겁니다.`,
                      });
                    }}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      console.log('Messaging', user.name);
                      toast({
                        title: "메시지 발송",
                        description: `${user.name}에게 개별 메시지를 발송했습니다.`,
                      });
                    }}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
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

export default NonResponders;
