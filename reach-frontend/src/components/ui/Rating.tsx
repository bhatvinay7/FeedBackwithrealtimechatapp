// components/StarRating.tsx
import React from 'react';
import { Star } from 'lucide-react';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const StarRating: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6  cursor-pointer ${
            value >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400 hover:text-gray-400/80'
          }`}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
