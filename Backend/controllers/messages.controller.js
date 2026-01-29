const Message = require('../models/message.model');
const User = require('../models/user.model');

const sendMessage = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { body } = req.body;

    const recipient = await User.findById(userId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    await Message.create({ body, toUser: recipient._id });
    return res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    return next(err);
  }
};

const inbox = async (req, res, next) => {
  try {
    const messages = await Message.find({ toUser: req.user.id })
      .sort({ createdAt: -1 })
      .select('body createdAt');

    return res.json({ messages });
  } catch (err) {
    return next(err);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const msg = await Message.findOneAndDelete({ _id: req.params.id, toUser: req.user.id });
    if (!msg) {
      return res.status(404).json({ message: 'Message not found' });
    }
    return res.json({ message: 'Message deleted' });
  } catch (err) {
    return next(err);
  }
};

module.exports = { sendMessage, inbox, deleteMessage };
