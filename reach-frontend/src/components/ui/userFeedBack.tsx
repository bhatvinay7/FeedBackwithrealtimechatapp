import { useState } from 'react';
import { Star } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (data: { message: string; rating: number }) => void;
 
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSubmit,

}) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ message, rating });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-[560px] mx-auto min-h-80 p-4 bg-white rounded-sm border border-black/12 "
    >

       <div className="mt-4">
        <label className="block mb-2 text-lg font-serif ">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              aria-label='click to give rating'
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-yellow-500"
            >
              <Star
                fill={rating >= star ? 'currentColor' : 'none'}
                className="w-6 h-6"
              />
            </button>
          ))}
        </div>
      </div>

      <label className="block mb-2 text-lg text-center font-serif text-indigo-950/75 font-medium">Your Feedback</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your feedback..."
        className="w-full min-h-40 max-h-52 p-3 border rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50"
        required
      />

      

      <button
        type="submit"
        className="mt-6 px-6 py-2 bg-blue-600/60 text-white rounded-sm hover:bg-blue-700/60 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
