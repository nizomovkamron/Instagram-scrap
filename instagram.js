const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

const instagram = async (url) => {
  let request = await fetch("https://instaoffline.net/process/", {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: `https://instaoffline.net/carousel-downloader/?q=${url}`,
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `q=${url}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  request = await request.text();
  request = JSON.parse(request);
  var { document } = new JSDOM(request.html).window;
  var i = document.querySelectorAll("a");
  var imgs = [];
  var videos = [];
  for (let x = 0; x < i.length; x++) {
    if (i.item(x).text.search("Download Video") != -1) {
      videos.push(i.item(x).getAttribute("href"));
    } else if (i.item(x).text.search("Download Image") != -1) {
      imgs.push(i.item(x).getAttribute("href"));
    }
  }
  return [imgs, videos];
};

module.exports = instagram;
