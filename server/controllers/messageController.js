const messegeModel = require("../models/messegeModel");

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const newMessage = new messegeModel({ chatId, senderId, text });

  try {
    const response = await newMessage.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messeges = await messegeModel.find({
      chatId: chatId,
    });
    res.status(200).json(messeges);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages };
