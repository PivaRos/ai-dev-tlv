const { buildSkyscannerUrl, scrapeSkyscanner } = require("./scraping");

const run = async () => {
  const url = buildSkyscannerUrl("tlv", "tyoa", "250114", "250128", 2, 0);
  const result = await scrapeSkyscanner(url);
  console.log("result", JSON.stringify(result, null, 2));
};
run();
