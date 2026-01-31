const profileLink = (req, res) => {
  const base = process.env.FRONTEND_BASE_URL || `${req.protocol}://${req.get('host')}`;
  const url = process.env.FRONTEND_BASE_URL
    ? `${base}/send/${req.user.id}`
    : `${base}/api/messages/send/${req.user.id}`;
  return res.json({ profileLink: url });
};

module.exports = { profileLink };
