const express = require("express");
const superagent = require("superagent");
const fs = require("fs");

const app = express();

exports.getAllVideos = async (req, res) => {
  try {
    let resp = "";
    if (process.env.MODE === "OFFLINE") {
      const filename = process.env.DATAFILENAME;
      console.log("offline mode...");
      const offlineData = fs.readFileSync(
        `${__dirname}/../data/${filename}`,
        "utf-8"
      );
      resp = JSON.parse(offlineData);
    } else {
      const response = await superagent.get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${process.env.CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
      );
      resp = JSON.parse(response.text);
    }
    //   console.log(response);
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
