// components/FeedbackForm.tsx
'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import StarRating from './Rating';
import { useForm } from "react-hook-form";
import { z } from "zod";
type FeedbackFormProps = {
  receiverId: number|null|undefined;
  onSubmit: (data: FeedbackData) => void;
};

 
type FeedbackData = {
  receiverId: number| null | undefined;
  project_delivery: number;
  work_accuracy: number;
  team_collaboration: number;
  areas_for_improvement: string;
  description: string;
};

export const formSchema = z.object({
 areas:z.string().min(10,"Minimum 10 characters required"),
 description:z.string().min(10,"Minimum 10 characters required")
});

export type FormSchemaType = z.infer<typeof formSchema>;



export default function FeedbackForm({ receiverId, onSubmit }: FeedbackFormProps) {
  
    const [projectDelivery, setProjectDelivery] = useState(0);
    const [workAccuracy, setWorkAccuracy] = useState(0);
    const [teamCollab, setTeamCollab] = useState(0);
   
    
       const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const Submit = (data:any) => {

    onSubmit({
      receiverId,
      project_delivery: projectDelivery,
      work_accuracy: workAccuracy,
      team_collaboration: teamCollab,
      areas_for_improvement:data.areas,
      description:data.description,
    });
  };
//   #E8E8E8
// #E0E3DE
  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6 w-full font-serif h-auto mx-auto p-4 border rounded-sm mt-3 bg-[#E8E8E8]">
      <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
    

      <div>
        <label className="block mb-1 text-indigo-950/75 font-medium">Project Delivery</label>
        <StarRating value={projectDelivery} onChange={setProjectDelivery} />
      </div>

      <div>
        <label className="block mb-1 text-indigo-950/75 font-medium">Work Accuracy</label>
        <StarRating value={workAccuracy} onChange={setWorkAccuracy} />
      </div>

      <div>
        <label className="block mb-1 text-indigo-950/75 font-medium">Team Collaboration</label>
        <StarRating value={teamCollab} onChange={setTeamCollab} />
      </div>

      <div>
        <label className="block mb-1 text-indigo-950/75 font-medium">Areas for Improvement</label>
        <textarea
          placeholder='provide your feedback'
           {...register("areas") }
         
          className="w-full p-2 border border-black/60 rounded-md min-h-62 "
    
        />
        {errors.areas && <span className="text-red-400">{errors?.areas?.message}</span>}
      </div>

      <div>
        <label className="block mb-1 text-indigo-950/75 font-medium">Description</label>
        <textarea
           placeholder='provide your feedback'
          {...register("description")}
          className="w-full p-2 border border-black/60 rounded-md min-h-62"
        
        />
          {errors.description && <span className="text-red-400">{errors?.description?.message}</span>}
      </div>

      <button
        type="submit"
        className="bg-blue-400 text-white px-4 py-2  rounded-sm hover:bg-blue-700"
      >
        Submit Feedback
      </button>
    </form>
  );
}
