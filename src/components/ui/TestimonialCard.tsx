interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export default function TestimonialCard({ 
  name, 
  role, 
  company, 
  content,
  avatar 
}: TestimonialCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-colors duration-300">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border-2 border-cyan-500/30">
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-3">
            <h4 className="text-white font-semibold">{name}</h4>
            <p className="text-gray-400 text-sm">
              {role} en {company}
            </p>
          </div>
          
          {/* Quote Icon */}
          <svg
            className="w-6 h-6 text-cyan-500/50 mb-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          
          <p className="text-gray-300 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}
