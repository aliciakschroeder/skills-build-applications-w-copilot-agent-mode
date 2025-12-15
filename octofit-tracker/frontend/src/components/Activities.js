import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Activities fetched:', json);
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching Activities:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading Activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title mb-0">Activities</h3>
      </div>
      <div className="card-body">
        {data.length === 0 ? (
          <p className="text-muted">No activities found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {data.map((activity, idx) => (
                  <tr key={idx}>
                    <td>{activity.id || 'N/A'}</td>
                    <td>{activity.name || 'N/A'}</td>
                    <td>{activity.type || 'N/A'}</td>
                    <td>{activity.date || 'N/A'}</td>
                    <td>{activity.duration || 'N/A'}</td>
                    <td>{activity.calories || 'N/A'}</td>
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
