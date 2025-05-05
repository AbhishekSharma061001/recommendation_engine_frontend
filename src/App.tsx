import React, { useState, FormEvent } from "react";
import RecommendationList from "./RecommendationList";
import "./App.css";

const roles = [
  "Software Engineer",
  "Team Lead",
  "Customer Support",
  "Frontend Developer",
  "Data Analyst"
];
  const skillsList = [
  "Java",
  "OOPs",
  "DSA",
  "Leadership",
  "Decision Making",
  "Communication",
  "Listening",
  "JavaScript",
  "React",
  "CSS",
  "Python",
  "SQL",
  "Statistics"
];

interface Recommendation {
  id: number;
  name: string;
  role: string;
  skills: string[];
  duration: number;
  matchScore: number;
}

const App: React.FC = () => {
  const [role, setRole] = useState<string>(roles[0]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const params = new URLSearchParams({
      role,
      skills: selectedSkills.join(","),
      jobDescription,
    });

    try {
      const response = await fetch(`https://recommendation-engine-backend-1.onrender.com/recommend?${params}`);
      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      alert("Something went wrong while fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🧠 Assessment Recommender</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <label>Select Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label>Select Skills</label>
        <div className="skills-list">
          {skillsList.map((skill) => (
            <div
              key={skill}
              className={`skill-tag ${selectedSkills.includes(skill) ? "selected" : ""}`}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </div>
          ))}
        </div>

        <label>Job Description (optional)</label>
        <textarea
          rows={4}
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Recommending..." : "Get Recommendations"}
        </button>
      </form>

      <RecommendationList recommendations={recommendations} />
    </div>
  );
};

export default App;
