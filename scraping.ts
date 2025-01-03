import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Flight } from "./app/FlightList";
import { setTimeout } from "timers/promises";

const delay = (ms: number) => setTimeout(ms);

// Enable stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

export const buildSkyscannerUrl = (
  origin: string,
  destination: string,
  outboundDate: string,
  returnDate: string,
  adults: number,
  children: number = 0
): string => {
  return `https://www.skyscanner.co.il/transport/flights/${origin}/${destination}/${outboundDate}/${returnDate}/?adultsv2=${adults}&childrenv2=${children}&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=1`;
};

export const scrapeSkyscanner = async (url: string): Promise<Array<Flight>> => {
  console.log("Scraping URL:", url);
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode for automation
    args: ["--disable-blink-features=AutomationControlled"], // Prevent detection
  });

  const page = await browser.newPage();

  // Set user agent and headers to mimic a real browser
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
  await page.setViewport({ width: 1280, height: 800 });
  await page.setExtraHTTPHeaders({
    "accept-language": "en-US,en;q=0.9",
    "upgrade-insecure-requests": "1",
  });

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    // Add a slight delay to ensure dynamic elements load
    await delay(3000);

    // Simulate human interaction to avoid detection
    await page.mouse.move(100, 100);
    await page.mouse.move(300, 300);
    await delay(2000);

    // Wait for flight results to load with dynamic class handling
    await page.waitForSelector('[class*="FlightsResults_dayViewItems"]', {
      timeout: 60000,
    });

    const flights = await page.evaluate(() => {
      const results: Flight[] = [];
      const flightContainers = document.querySelectorAll(
        'div[class^="FlightsTicketWrapper_itineraryContainer__"]'
      );

      flightContainers.forEach((container) => {
        const linkElement = container.querySelector(
          'a[class*="FlightsTicket_link"]'
        );
        const providerElement = container.querySelector(
          ".LogoImage_label__NDE5Y span"
        );
        const priceElement = container.querySelector(
          ".Price_mainPriceContainer__YTcwM span"
        );

        // Extract departure and arrival times
        const timeElements = container.querySelectorAll(
          ".LegInfo_routePartialDepart__MDFkN .TimeWithOffsetTooltip_colorPrimary__ZmM1Z, .LegInfo_routePartialArrive__ZmRjO .TimeWithOffsetTooltip_colorPrimary__ZmM1Z"
        );

        const outboundDeparture = timeElements[0]?.textContent || "Unknown";
        const outboundArrival = timeElements[1]?.textContent || "Unknown";
        const returnDeparture = timeElements[2]?.textContent || "Unknown";
        const returnArrival = timeElements[3]?.textContent || "Unknown";

        if (linkElement) {
          const link = linkElement.getAttribute("href") || "#";
          const provider = providerElement?.textContent?.trim() || "Unknown";
          const price = priceElement?.textContent || "Unknown";

          results.push({
            provider,
            price,
            link,
            outboundDeparture,
            outboundArrival,
            returnDeparture,
            returnArrival,
          });
        }
      });

      return results;
    });

    await browser.close();
    return flights;
  } catch (error) {
    console.error("Error during scraping:", error);
    await browser.close();
    return [];
  }
};
