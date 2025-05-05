import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const roles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "DevOps Engineer",
    "Product Manager",
    "Team Lead",
    "Customer Support",
    "UX Designer",
    "QA Engineer",
    "Sales",
    "HR"
  ];
  
  const availableSkills = [
    "Java",
    "OOPs",
    "DSA",
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Docker",
    "CI/CD",
    "AWS",
    "Leadership",
    "Decision Making",
    "Communication",
    "Listening",
    "Wireframing",
    "Figma",
    "Testing",
    "Negotiation",
    "Market Research",
    "Stakeholder Management",
    "Compliance"
  ];
  

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleSkillToggle = (skill: string) => {
    setSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("https://recommendation-engine-backend-1.onrender.com/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, skills }),
    });

    const data = await response.json();
    setRecommendations(data.recommendations);
  };

  return (
    <div className="container">
      <h1 className="header">Assessment Recommendation Engine</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            required
            className="select"
          >
            <option value="">Select a Role</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Skills</label>
          <div className="skills">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                className={`skill-btn ${skills.includes(skill) ? "selected" : ""}`}
                onClick={() => handleSkillToggle(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Get Recommendations
        </button>
      </form>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>Recommended Assessments:</h2>
          <div className="cards">
            {recommendations.map((rec) => (
              <div key={rec.id} className="card">
                <h3>{rec.name}</h3>
                <p><strong>Role:</strong> {rec.role}</p>
                <p><strong>Duration:</strong> {rec.duration} minutes</p>
                <p><strong>Match Score:</strong> {rec.matchScore}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
