import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page center">
      <div className="card">
        <h2>Page not found</h2>
        <p className="muted">The link you followed does not exist.</p>
        <Link className="primary" to="/">Go home</Link>
      </div>
    </div>
  );
}
