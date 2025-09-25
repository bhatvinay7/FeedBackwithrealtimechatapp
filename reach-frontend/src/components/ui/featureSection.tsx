import { CheckCircle } from "lucide-react"; // Optional icons (requires lucide-react)
import {Saira} from 'next/font/google';

const saria = Saira({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-saira',
});
const features = [
  {
    title: "Feedback Management",
    description:
      "Collect, review, and organize team feedback with ease.",
  },
  {
    title: "Task Management",
    description:
      "Assign tasks, set deadlines, and track team progress in one place.",
  },
  {
    title: "Real-Time Notifications",
    description:
      "Send instant updates to your team about tasks or announcements.",
  },
  {
    title: "Centralized Dashboard",
    description:
      "Access all your feedback, tasks, and alerts from a unified dashboard.",
  },
  {
    title: "Role-Based Access",
    description:
      "Control visibility and permissions for admins, managers, and staff.",
  },
  {
    title: "Smart Reminders",
    description:
      "Automated follow-ups to ensure nothing slips through the cracks.",
  },
];

export default function FeatureBoxes() {
  return (
    <section className="py-16 px-6 w-full  bg-slate-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className={` ${saria.className} text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-slate-600 `}>Powerful Features Which Makes Work Flow Easier </h2>
        <p className={`${saria.className} text-gray-600 text-xl md:text-2xl  mb-10`}>
          Everything you need to manage feedback, tasks, and notifications — all in one app.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-base sm:text-xl shadow border-[0.5px] border-gray-500/16 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="text-blue-500" size={22} />
                <h3 className=" text-base sm:text-lg font-semibold text-gray-700 ">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
