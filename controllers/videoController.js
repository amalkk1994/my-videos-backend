const express = require("express");
const superagent = require("superagent");

const app = express();

exports.getAllVideos = async (req, res) => {
  try {
    const response = await superagent.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${process.env.CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
    );
    //   console.log(response);
    const resp = JSON.parse(response.text);
    //   console.log("resp", resp);
    res.status(200).json(resp);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
