import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Leaderboard fetched:', json);
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching Leaderboard:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading Leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title mb-0">Leaderboard</h3>
      </div>
      <div className="card-body">
        {data.length === 0 ? (
          <p className="text-muted">No leaderboard data found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Activities</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, idx) => (
                  <tr key={idx}>
                    <td><strong>{idx + 1}</strong></td>
                    <td>{entry.user || entry.username || 'N/A'}</td>
                    <td>{entry.team || 'N/A'}</td>
                    <td>{entry.points || 0}</td>
                    <td>{entry.activities_count || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
