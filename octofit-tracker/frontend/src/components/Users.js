import React, { useEffect, useState } from 'react';

export default function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching Users from', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        console.log('Users fetched:', json);
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching Users:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="alert alert-info">Loading Users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title mb-0">Users</h3>
      </div>
      <div className="card-body">
        {data.length === 0 ? (
          <p className="text-muted">No users found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.id || 'N/A'}</td>
                    <td>{user.username || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.first_name || 'N/A'}</td>
                    <td>{user.last_name || 'N/A'}</td>
                    <td>{user.date_joined || 'N/A'}</td>
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
