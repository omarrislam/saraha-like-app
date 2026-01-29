const profileLink = (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  const url = `${base}/api/messages/send/${req.user.id}`;
  return res.json({ profileLink: url });
};

module.exports = { profileLink };
