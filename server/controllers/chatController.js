const chatModel = require("../models/chatModel");

// create a new chat

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) {
      return res.status(200).json(chat);
    }
    const newChat = await chatModel.create({ members: [firstId, secondId] });

    res.status(200).json(newChat);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  try {
    const chats = await chatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;
    const chat = await chatModel.find({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { createChat, findChat, findUserChats };
