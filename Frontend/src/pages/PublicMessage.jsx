import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../api.js';

export default function PublicMessage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await apiRequest(`/api/messages/send/${userId}`, {
        method: 'POST',
        body: { body }
      });
      setStatus('sent');
      setBody('');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  };

  return (
    <div className="page public">
      <div className="card">
        <p className="eyebrow">Anonymous message</p>
        <h2>Send a message</h2>
        <p className="muted">Be kind. Share feedback that helps.</p>
        <form onSubmit={submit} className="form">
          <label>
            Your message
            <textarea
              rows="6"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your anonymous message here..."
              required
            />
          </label>
          {error && <div className="error">{error}</div>}
          {status === 'sent' && <div className="success">Message sent. Thank you!</div>}
          <button className="primary" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send anonymously'}
          </button>
        </form>
        <button className="ghost" onClick={() => navigate('/')}>Back to home</button>
      </div>
    </div>
  );
}
