import React from "react";

interface EducationItem {
  logoUrl: string;
  school: string;
  degree: string;
  start: string;
  end: string;
}

interface EducationCardProps {
  educationData: ReadonlyArray<EducationItem>;
}

const EducationCard: React.FC<EducationCardProps> = ({ educationData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto">
      {educationData.map((education, id) => (
        <div
          key={id}
          className="relative w-full flex flex-col justify-between items-start gap-2 sm:gap-4 p-2 sm:p-4 rounded-lg shadow-md border border-gray-700"
        >
          {/* Top Row: Logo + School/Degree */}
          <div className="flex items-center justify-between w-full">
            {/* Logo and Text */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 dark:bg-white flex items-center justify-center shrink-0">
                <img
                  src={education.logoUrl}
                  alt={education.school}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-left">
                <h3 className="text-sm sm:text-xl font-semibold">
                  {education.school}
                </h3>
                <p className="text-xs sm:text-sm">{education.degree}</p>
              </div>
            </div>

            {/* Date (inline absolute) */}
            <p className="text-xs sm:absolute top-2 right-2 sm:text-sm text-muted-foreground tabular-nums">
              {`${education.start} - ${education.end}`}
            </p>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationCard;
