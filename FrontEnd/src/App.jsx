import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import EditorImport from "react-simple-code-editor";
const Editor = EditorImport.default || EditorImport;
import "prismjs/components/prism-jsx";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
    return 1 + 1;
}`);

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, review]);

  async function reviewCode() {
    setLoading(true);
    setError("");
    setReview(null);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
      fetchHistory();
    } catch {
      setError("Failed to get review. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchHistory() {
    try {
      const response = await axios.get("http://localhost:3000/ai/history");
      setHistory(response.data);
    } catch {
      console.error("Failed to fetch history");
    }
  }

  function loadFromHistory(item) {
    setCode(item.code);
    setReview(item.review);
    setShowHistory(false);
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <div className="button-row">
          <div onClick={reviewCode} className="review-btn">
            {loading ? "Reviewing..." : "Review"}
          </div>
          <div
            onClick={() => {
              fetchHistory();
              setShowHistory(!showHistory);
            }}
            className="history-btn"
          >
            {showHistory ? "Hide History" : "History"}
          </div>
        </div>
      </div>

      <div className="right">
        {/* History Panel */}
        {showHistory && (
          <div className="history-panel">
            <h3>📋 Past Reviews</h3>
            {history.length === 0 && <p className="empty">No reviews yet.</p>}
            {history.map((item, i) => (
              <div key={i} className="history-item" onClick={() => loadFromHistory(item)}>
                <p className="history-code">{item.code.slice(0, 60)}...</p>
                <p className="history-meta">
                  {item.language} • {item.review?.overallQuality || "reviewed"} •{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && <p className="error">{error}</p>}

        {/* Loading */}
        {loading && (
          <div className="loading-card">
            <p>🔍 Analyzing your code...</p>
          </div>
        )}

        {/* Review Result */}
        {review && !showHistory && (
          <div className="review-result">

            {/* Summary */}
            <div className="summary-card">
              <span className="quality-icon">
                {review.overallQuality === "excellent" ? "✅" :
                 review.overallQuality === "good" ? "🟡" : "❌"}
              </span>
              <p className="summary-text">{review.summary}</p>
              <div className="meta-row">
                <span className="badge">{review.language}</span>
                <span className={`badge ${review.overallQuality}`}>{review.overallQuality}</span>
              </div>
            </div>

            {/* Current Code */}
            <div className="section-card">
              <h3>
                {review.overallQuality === "excellent" ? "✅" : "❌"} Current Code:
              </h3>
              <pre className="code-block">
                <code className="language-javascript">{code}</code>
              </pre>
            </div>

            {/* Issues */}
            {review.issues && review.issues.length > 0 && (
              <div className="section-card">
                <h3>🔍 Issues:</h3>
                <ul className="issues-list">
                  {review.issues.map((issue, i) => (
                    <li key={i} className={`issue-item ${issue.severity}`}>
                      <span className="issue-icon">
                        {issue.severity === "critical" ? "❌" :
                         issue.severity === "warning" ? "⚠️" : "💡"}
                      </span>
                      <div>
                        <strong>{issue.category}</strong> — {issue.lineReference}
                        <p>{issue.description}</p>
                        {issue.fix && (
                          <pre className="fix-block">
                            <code className="language-javascript">{issue.fix}</code>
                          </pre>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Strengths */}
            {review.strengths && review.strengths.length > 0 && (
              <div className="section-card">
                <h3>💪 Strengths:</h3>
                <ul className="strengths-list">
                  {review.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improved Code */}
            {review.improvedCode && (
              <div className="section-card">
                <h3>✅ Improved Code:</h3>
                <pre className="code-block">
                  <code className="language-javascript">{review.improvedCode}</code>
                </pre>
              </div>
            )}

          </div>
        )}
      </div>
    </main>
  );
}

export default App;