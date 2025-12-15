import React, { useEffect, useState } from 'react';

export default function Workouts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Workouts fetched:', json);
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching Workouts:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading Workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title mb-0">Workouts</h3>
      </div>
      <div className="card-body">
        {data.length === 0 ? (
          <p className="text-muted">No workouts found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Intensity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((workout, idx) => (
                  <tr key={idx}>
                    <td>{workout.id || 'N/A'}</td>
                    <td>{workout.name || 'N/A'}</td>
                    <td>{workout.type || 'N/A'}</td>
                    <td>{workout.duration || 'N/A'}</td>
                    <td>{workout.intensity || 'N/A'}</td>
                    <td>{workout.date || 'N/A'}</td>
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
