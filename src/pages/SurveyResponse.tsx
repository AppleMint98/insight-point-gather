
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const SurveyResponse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  // 샘플 설문 데이터
  const surveyData = {
    title: '3분기 직무 만족도 조사',
    description: '직원들의 현재 업무 만족도와 개선 사항을 파악하기 위한 설문조사입니다.',
    isAnonymous: true,
    estimatedTime: '약 8분',
    questions: [
      {
        id: 1,
        question: '현재 업무에 대한 전반적인 만족도는 어떠신가요?',
        type: 'scale',
        required: true,
        options: ['매우 불만족', '불만족', '보통', '만족', '매우 만족']
      },
      {
        id: 2,
        question: '업무량은 적절하다고 생각하시나요?',
        type: 'radio',
        required: true,
        options: ['매우 적다', '적다', '적절하다', '많다', '매우 많다']
      },
      {
        id: 3,
        question: '개선이 필요한 부분을 모두 선택해주세요.',
        type: 'checkbox',
        required: false,
        options: ['업무 환경', '의사소통', '복지제도', '교육 프로그램', '승진 기회']
      },
      {
        id: 4,
        question: '추가 의견이나 제안사항이 있으시면 자유롭게 작성해주세요.',
        type: 'textarea',
        required: false
      }
    ]
  };

  const handleResponse = (questionId: number, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < surveyData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Survey responses:', responses);
    toast({
      title: "설문 완료!",
      description: "소중한 의견 감사합니다. 보상이 지급되었습니다.",
    });
    navigate('/library');
  };

  const currentQ = surveyData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / surveyData.questions.length) * 100;

  const renderQuestion = () => {
    switch (currentQ.type) {
      case 'scale':
        return (
          <RadioGroup
            value={responses[currentQ.id] || ''}
            onValueChange={(value) => handleResponse(currentQ.id, value)}
          >
            {currentQ.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'radio':
        return (
          <RadioGroup
            value={responses[currentQ.id] || ''}
            onValueChange={(value) => handleResponse(currentQ.id, value)}
          >
            {currentQ.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-3">
            {currentQ.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`checkbox-${index}`}
                  checked={responses[currentQ.id]?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const current = responses[currentQ.id] || [];
                    if (checked) {
                      handleResponse(currentQ.id, [...current, option]);
                    } else {
                      handleResponse(currentQ.id, current.filter((item: string) => item !== option));
                    }
                  }}
                />
                <Label htmlFor={`checkbox-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      
      case 'textarea':
        return (
          <Textarea
            value={responses[currentQ.id] || ''}
            onChange={(e) => handleResponse(currentQ.id, e.target.value)}
            placeholder="자유롭게 작성해주세요..."
            rows={4}
          />
        );
      
      default:
        return (
          <Input
            value={responses[currentQ.id] || ''}
            onChange={(e) => handleResponse(currentQ.id, e.target.value)}
            placeholder="답변을 입력해주세요"
          />
        );
    }
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
            <h1 className="text-lg font-semibold text-gray-900">{surveyData.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
              <Clock className="w-4 h-4" />
              <span>{surveyData.estimatedTime}</span>
              {surveyData.isAnonymous && (
                <Badge variant="secondary" className="text-xs">익명</Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="px-4 py-3">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>질문 {currentQuestion + 1} / {surveyData.questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              질문 {currentQuestion + 1}
              {currentQ.required && (
                <Badge variant="destructive" className="ml-2 text-xs">필수</Badge>
              )}
            </CardTitle>
            <p className="text-gray-700 leading-relaxed">{currentQ.question}</p>
          </CardHeader>
          <CardContent>
            {renderQuestion()}
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          {currentQuestion > 0 && (
            <Button 
              variant="outline" 
              onClick={handlePrev}
              className="flex-1"
            >
              이전
            </Button>
          )}
          {currentQuestion < surveyData.questions.length - 1 ? (
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
              <CheckCircle className="w-4 h-4 mr-2" />
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyResponse;
