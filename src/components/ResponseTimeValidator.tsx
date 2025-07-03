
import { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ResponseTimeValidatorProps {
  questionText: string;
  minReadTime: number; // 최소 읽기 시간 (초)
  onTimeValid: (isValid: boolean) => void;
  children: React.ReactNode;
}

const ResponseTimeValidator = ({ 
  questionText, 
  minReadTime, 
  onTimeValid, 
  children 
}: ResponseTimeValidatorProps) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1;
        if (newTime >= minReadTime && !isValid) {
          setIsValid(true);
          onTimeValid(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [minReadTime, isValid, onTimeValid]);

  const handleAttemptNext = () => {
    if (!isValid) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }
  };

  // 예상 읽기 시간 계산 (한국어 평균 읽기 속도: 분당 300자)
  const estimatedReadTime = Math.max(Math.ceil(questionText.length / 5), minReadTime);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>응답 시간: {timeSpent}초</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>권장 시간: {estimatedReadTime}초</span>
          {isValid ? (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          ) : (
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      {children}

      {showWarning && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-orange-700">
              <AlertTriangle className="w-5 h-5" />
              <div>
                <p className="font-medium">잠깐! 질문을 충분히 읽어보세요</p>
                <p className="text-sm">신중한 답변을 위해 최소 {minReadTime}초 이상 읽어주세요.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResponseTimeValidator;
