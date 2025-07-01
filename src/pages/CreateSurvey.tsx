
import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const CreateSurvey = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: '',
    targetGroup: '',
    isRequired: false,
    isAnonymous: true,
    reward: '',
    estimatedTime: '',
    questions: [{ id: 1, question: '', type: 'text' }]
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: surveyData.questions.length + 1,
      question: '',
      type: 'text'
    };
    setSurveyData({
      ...surveyData,
      questions: [...surveyData.questions, newQuestion]
    });
  };

  const removeQuestion = (id: number) => {
    setSurveyData({
      ...surveyData,
      questions: surveyData.questions.filter(q => q.id !== id)
    });
  };

  const updateQuestion = (id: number, field: string, value: string) => {
    setSurveyData({
      ...surveyData,
      questions: surveyData.questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    });
  };

  const handleSubmit = () => {
    console.log('Creating survey:', surveyData);
    navigate('/dashboard');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설문 제목 *
            </label>
            <Input
              value={surveyData.title}
              onChange={(e) => setSurveyData({...surveyData, title: e.target.value})}
              placeholder="설문 제목을 입력하세요"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설문 설명
            </label>
            <Textarea
              value={surveyData.description}
              onChange={(e) => setSurveyData({...surveyData, description: e.target.value})}
              placeholder="설문에 대한 간단한 설명을 입력하세요"
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              예상 소요 시간
            </label>
            <Input
              value={surveyData.estimatedTime}
              onChange={(e) => setSurveyData({...surveyData, estimatedTime: e.target.value})}
              placeholder="예: 약 5분"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>대상 및 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              대상 그룹 (선택사항)
            </label>
            <Select value={surveyData.targetGroup} onValueChange={(value) => setSurveyData({...surveyData, targetGroup: value})}>
              <SelectTrigger>
                <SelectValue placeholder="그룹을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">전체 공개</SelectItem>
                <SelectItem value="AA회사">AA회사</SelectItem>
                <SelectItem value="BB대학교">BB대학교</SelectItem>
                <SelectItem value="CC연구소">CC연구소</SelectItem>
              </SelectContent>
            </Select>
            {surveyData.targetGroup && (
              <Badge variant="secondary" className="mt-2">
                대상: {surveyData.targetGroup}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">필수 설문</label>
              <p className="text-xs text-gray-500">그룹 멤버에게 필수로 배정됩니다</p>
            </div>
            <Switch
              checked={surveyData.isRequired}
              onCheckedChange={(checked) => setSurveyData({...surveyData, isRequired: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">익명 설문</label>
              <p className="text-xs text-gray-500">참여자 정보를 알 수 없습니다</p>
            </div>
            <Switch
              checked={surveyData.isAnonymous}
              onCheckedChange={(checked) => setSurveyData({...surveyData, isAnonymous: checked})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              보상
            </label>
            <Input
              value={surveyData.reward}
              onChange={(e) => setSurveyData({...surveyData, reward: e.target.value})}
              placeholder="예: 커피 기프티콘, 1000P"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>질문 작성</CardTitle>
            <Button onClick={addQuestion} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              질문 추가
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {surveyData.questions.map((q, index) => (
            <div key={q.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  질문 {index + 1}
                </label>
                {surveyData.questions.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeQuestion(q.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <Input
                value={q.question}
                onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                placeholder="질문을 입력하세요"
              />
              
              <Select value={q.type} onValueChange={(value) => updateQuestion(q.id, 'type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">단답형</SelectItem>
                  <SelectItem value="textarea">장문형</SelectItem>
                  <SelectItem value="radio">객관식 (단일선택)</SelectItem>
                  <SelectItem value="checkbox">객관식 (복수선택)</SelectItem>
                  <SelectItem value="scale">척도형</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

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
          <h1 className="text-lg font-semibold text-gray-900">설문 만들기</h1>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            단계 {currentStep}: {
              currentStep === 1 ? '기본 정보' :
              currentStep === 2 ? '대상 및 설정' : '질문 작성'
            }
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={handlePrev}
              className="flex-1"
            >
              이전
            </Button>
          )}
          {currentStep < 3 ? (
            <Button 
              onClick={handleNext}
              className="flex-1 bg-primary hover:bg-primary-600"
            >
              다음
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-accent hover:bg-accent-600"
            >
              설문 게시하기
            </Button>
          )}
        </div>
      </div>

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

export default CreateSurvey;
