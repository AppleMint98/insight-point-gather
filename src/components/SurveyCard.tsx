
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Gift, Calendar } from 'lucide-react';

interface SurveyCardProps {
  id: string;
  title: string;
  author: string;
  authorRating: number;
  duration: string;
  reward: string;
  daysLeft: number;
  onClick?: () => void;
}

const SurveyCard = ({ 
  id, 
  title, 
  author, 
  authorRating, 
  duration, 
  reward, 
  daysLeft,
  onClick 
}: SurveyCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white border border-gray-200"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{author}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">{authorRating}</span>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={`${daysLeft <= 1 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
            >
              <Calendar className="w-3 h-3 mr-1" />
              {daysLeft}일 남음
            </Badge>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-accent font-medium">
              <Gift className="w-4 h-4" />
              <span className="text-sm">{reward}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyCard;
