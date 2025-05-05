import React from "react";
import "./RecommendationList.css";

interface Recommendation {
  id: number;
  name: string;
  role: string;
  skills: string[];
  duration: number;
  matchScore: number;
}

interface Props {
  recommendations: Recommendation[];
}

const RecommendationList: React.FC<Props> = ({ recommendations }) => {
  if (!recommendations.length) return null;

  return (
    <div className="list-container">
      <h2>🔍 Recommendations</h2>
      {recommendations.map((rec) => (
        <div className="recommendation-card" key={rec.id}>
          <h3>{rec.name}</h3>
          <p><strong>Role:</strong> {rec.role}</p>
          <p><strong>Skills:</strong> {rec.skills.join(", ")}</p>
          <p><strong>Duration:</strong> {rec.duration} minutes</p>
          <p><strong>Match Score:</strong> {rec.matchScore}%</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;
