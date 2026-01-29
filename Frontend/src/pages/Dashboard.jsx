import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest, API_BASE } from '../api.js';
import { clearToken, decodeToken, getToken } from '../auth.js';

export default function Dashboard() {
  const navigate = useNavigate();
  const token = getToken();
  const user = useMemo(() => decodeToken(token), [token]);
  const [profileLink, setProfileLink] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleAuthError = (message) => {
    if (!message) return false;
    const lowered = message.toLowerCase();
    if (lowered.includes('invalid') || lowered.includes('expired') || lowered.includes('missing')) {
      clearToken();
      navigate('/');
      return true;
    }
    return false;
  };

  const loadData = async () => {
    setError('');
    setLoading(true);
    try {
      const profile = await apiRequest('/api/profile/link', { token });
      const inbox = await apiRequest('/api/messages/inbox', { token });
      setProfileLink(profile.profileLink);
      setMessages(inbox.messages || []);
    } catch (err) {
      if (!handleAuthError(err.message)) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    loadData();
  }, [token]);

  const logout = () => {
    clearToken();
    navigate('/');
  };

  const deleteMessage = async (id) => {
    try {
      await apiRequest(`/api/messages/${id}`, { method: 'DELETE', token });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      if (!handleAuthError(err.message)) {
        setError(err.message);
      }
    }
  };

  const shareUrl = profileLink
    ? profileLink
        .replace(API_BASE, window.location.origin)
        .replace('/api/messages/send/', '/send/')
    : '';

  return (
    <div className="page dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">Your inbox</p>
          <h2>Hello {user?.name || 'there'}.</h2>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={loadData}>
            Refresh
          </button>
          <button className="ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <section className="grid">
        <div className="panel">
          <h3>Your anonymous link</h3>
          <p className="muted">
            Share this link so people can send you messages anonymously.
          </p>
          <div className="link-box">
            <input readOnly value={shareUrl || 'Loading...'} />
            <button
              className="primary"
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              disabled={!shareUrl}
            >
              Copy
            </button>
          </div>
          <div className="tiny">
            Or use API link: <span>{profileLink || '...'}</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Recent messages</h3>
            <span className="badge">{messages.length}</span>
          </div>
          {loading && <div className="muted">Loading messages...</div>}
          {!loading && error && <div className="error">{error}</div>}
          {!loading && !error && messages.length === 0 && (
            <div className="muted">No messages yet. Share your link.</div>
          )}
          {!loading && !error && messages.length > 0 && (
            <ul className="message-list">
              {messages.map((msg) => (
                <li key={msg._id}>
                  <div>
                    <p className="message-body">{msg.body}</p>
                    <span className="tiny">{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <button className="ghost" onClick={() => deleteMessage(msg._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="panel highlight">
        <h3>Share with confidence</h3>
        <p>
          Messages are anonymous. You only see the content, not who sent it. Keep the conversation
          respectful and constructive.
        </p>
      </section>
    </div>
  );
}
