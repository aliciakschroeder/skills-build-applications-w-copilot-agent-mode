import React, { useEffect, useState } from 'react';

export default function Teams() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Teams fetched:', json);
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching Teams:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading Teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title mb-0">Teams</h3>
      </div>
      <div className="card-body">
        {data.length === 0 ? (
          <p className="text-muted">No teams found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Members</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {data.map((team, idx) => (
                  <tr key={idx}>
                    <td>{team.id || 'N/A'}</td>
                    <td>{team.name || 'N/A'}</td>
                    <td>{team.description || 'N/A'}</td>
                    <td>{team.members_count || 0}</td>
                    <td>{team.created_at || 'N/A'}</td>
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
