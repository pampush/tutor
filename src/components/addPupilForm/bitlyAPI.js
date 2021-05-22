async function genHomeworkLink(uid, pupilId) {
  console.log(process.env.REACT_APP_BITLY_ACCESS_TOKEN);
  const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_BITLY_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    credentials: "same-origin",
    cache: "no-cache",
    body: JSON.stringify({
      domain: "bit.ly",
      long_url: `https://tutor-49686.web.app/homework/${uid}/${pupilId}`,
    }),
  });
  const data = await response.json();
  return Promise.resolve(data.link);
}

export default genHomeworkLink;
