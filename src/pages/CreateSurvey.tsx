import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Copy } from 'lucide-react';
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
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: '',
    targetGroup: '',
    isRequired: false,
    isAnonymous: true,
    reward: '',
    estimatedTime: '',
    deadline: '',
    autoReminder: false,
    enableTimeValidation: true,
    minResponseTime: 10,
    questions: [{ id: 1, question: '', type: 'text' }]
  });

  // 템플릿 데이터
  const templates = [
    {
      id: 'job_satisfaction',
      name: '직무 만족도 조사',
      description: '직원들의 업무 만족도를 측정하는 표준 템플릿',
      estimatedTime: '약 8분',
      questions: 12
    },
    {
      id: 'welfare_survey',
      name: '복지제도 선호도 조사',
      description: '직원 복지 개선을 위한 의견 수렴 템플릿',
      estimatedTime: '약 6분',
      questions: 8
    },
    {
      id: 'custom',
      name: '새로 만들기',
      description: '처음부터 직접 설문을 제작합니다',
      estimatedTime: '사용자 설정',
      questions: 0
    }
  ];

  const loadTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId === 'job_satisfaction') {
      setSurveyData({
        ...surveyData,
        title: '3분기 직무 만족도 조사',
        description: '직원들의 현재 업무 만족도와 개선 사항을 파악하기 위한 설문조사입니다.',
        estimatedTime: '약 8분',
        questions: [
          { id: 1, question: '현재 업무에 대한 전반적인 만족도는 어떠신가요?', type: 'scale' },
          { id: 2, question: '업무량은 적절하다고 생각하시나요?', type: 'radio' },
          // ... 더 많은 질문들
        ]
      });
    } else if (templateId === 'welfare_survey') {
      setSurveyData({
        ...surveyData,
        title: '신규 복지제도 선호도 조사',
        description: '새로운 복지제도 도입을 위한 직원 의견 수렴 설문조사입니다.',
        estimatedTime: '약 6분',
        questions: [
          { id: 1, question: '가장 필요하다고 생각하는 복지제도는 무엇인가요?', type: 'checkbox' },
          { id: 2, question: '현재 복지제도에 대한 만족도를 평가해주세요.', type: 'scale' },
          // ... 더 많은 질문들
        ]
      });
    }
  };

  const handleNext = () => {
    console.log('Next button clicked, current step:', currentStep);
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      console.log('Moving to step:', currentStep + 1);
    }
  };

  const handlePrev = () => {
    console.log('Prev button clicked, current step:', currentStep);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      console.log('Moving to step:', currentStep - 1);
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
    // 원클릭 배포 시뮬레이션
    navigate('/dashboard');
  };

  // 템플릿 선택 단계
  const renderStep1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>템플릿 선택</CardTitle>
          <p className="text-sm text-gray-600">기존 템플릿을 사용하면 빠르게 설문을 만들 수 있습니다.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? 'border-primary bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => loadTemplate(template.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{template.estimatedTime}</span>
                    {template.questions > 0 && <span>{template.questions}개 문항</span>}
                  </div>
                </div>
                {selectedTemplate === template.id && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  // 기본 정보 단계
  const renderStep2 = () => (
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              마감일 *
            </label>
            <Input
              type="date"
              value={surveyData.deadline}
              onChange={(e) => setSurveyData({...surveyData, deadline: e.target.value})}
              required
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // 그룹 및 설정 단계
  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>그룹 및 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              대상 그룹 (선택사항)
            </label>
            <Select value={surveyData.targetGroup || undefined} onValueChange={(value) => setSurveyData({...surveyData, targetGroup: value || ''})}>
              <SelectTrigger>
                <SelectValue placeholder="그룹을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 공개</SelectItem>
                <SelectItem value="AA회사">AA회사</SelectItem>
                <SelectItem value="BB대학교">BB대학교</SelectItem>
                <SelectItem value="CC연구소">CC연구소</SelectItem>
              </SelectContent>
            </Select>
            {surveyData.targetGroup && surveyData.targetGroup !== 'all' && (
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

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">응답 시간 검증</label>
              <p className="text-xs text-gray-500">신중한 답변을 위한 최소 응답 시간 설정</p>
            </div>
            <Switch
              checked={surveyData.enableTimeValidation}
              onCheckedChange={(checked) => setSurveyData({...surveyData, enableTimeValidation: checked})}
            />
          </div>

          {surveyData.enableTimeValidation && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                최소 응답 시간 (초)
              </label>
              <Input
                type="number"
                min="5"
                max="60"
                value={surveyData.minResponseTime}
                onChange={(e) => setSurveyData({...surveyData, minResponseTime: parseInt(e.target.value) || 10})}
                placeholder="10"
              />
              <p className="text-xs text-gray-500 mt-1">
                각 질문당 최소 {surveyData.minResponseTime}초 이상 읽어야 다음으로 진행 가능
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">자동 리마인더</label>
              <p className="text-xs text-gray-500">마감일 전에 자동으로 알림을 보냅니다</p>
            </div>
            <Switch
              checked={surveyData.autoReminder}
              onCheckedChange={(checked) => setSurveyData({...surveyData, autoReminder: checked})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              보상
            </label>
            <Input
              value={surveyData.reward}
              onChange={(e) => setSurveyData({...surveyData, reward: e.target.value})}
              placeholder="예: 커피 기프티콘, 1000P (선택사항)"
            />
            <p className="text-xs text-gray-500 mt-1">
              보상이 없어도 괜찮습니다. 그룹 내 신뢰도가 더 중요해요!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // 질문 작성 단계
  const renderStep4 = () => (
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
                  <SelectItem value="scale">척도형 (1-5점)</SelectItem>
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
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            단계 {currentStep}: {
              currentStep === 1 ? '템플릿 선택' :
              currentStep === 2 ? '기본 정보' : 
              currentStep === 3 ? '그룹 및 설정' : '질문 작성'
            }
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
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
          {currentStep < 4 ? (
            <Button 
              onClick={handleNext}
              className="flex-1 bg-primary hover:bg-primary-600"
              disabled={currentStep === 1 && !selectedTemplate}
            >
              다음
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-accent hover:bg-accent-600"
            >
              원클릭 게시하기
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
