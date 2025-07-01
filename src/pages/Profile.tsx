
import { useState } from 'react';
import { ArrowLeft, User, Mail, Building2, Edit, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/BottomNavigation';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '김민수',
    email: 'minsu.kim@example.com',
    group: 'AA회사',
    joinDate: '2024-01-15'
  });
  const [editForm, setEditForm] = useState(userInfo);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(userInfo);
  };

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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
            <h1 className="text-xl font-bold text-gray-900">마이페이지</h1>
          </div>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleEdit}
            >
              <Edit className="w-4 h-4 mr-2" />
              편집
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
              >
                <X className="w-4 h-4" />
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-xl">{userInfo.name}</CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {userInfo.group}
            </Badge>
          </CardHeader>
        </Card>

        {/* User Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">개인 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">이름</label>
              {isEditing ? (
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{userInfo.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">이메일</label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{userInfo.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">소속 그룹</label>
              {isEditing ? (
                <Input
                  value={editForm.group}
                  onChange={(e) => setEditForm({...editForm, group: e.target.value})}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{userInfo.group}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">활동 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-gray-600">참여한 설문</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-accent">3</div>
                <div className="text-sm text-gray-600">생성한 설문</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              알림 설정
            </Button>
            <Button variant="outline" className="w-full justify-start">
              비밀번호 변경
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
              로그아웃
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Back Button - Fixed Position */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-24 left-4 w-12 h-12 bg-white shadow-lg border border-gray-200 rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 z-40"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
