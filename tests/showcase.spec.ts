import { test, expect } from "@playwright/test";
test("repository-subpath assets load and the layout fits", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /From a plan.*To a journey/,
  );
  for (const id of [
    "overview",
    "features",
    "gallery",
    "demo",
    "architecture",
    "stack",
    "engineering",
    "developer",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  const images = await page
    .locator("img")
    .evaluateAll((imgs) => imgs.map((i) => ({ src: i.src, alt: i.alt })));
  for (const img of images) {
    expect(img.alt.length).toBeGreaterThan(5);
    const r = await request.get(img.src);
    expect(r.status(), img.src).toBe(200);
    expect(r.headers()["content-type"]).toMatch(/image/);
  }
  const video = page.locator("video");
  await expect(video).toHaveAttribute("controls", "");
  const source = await video.locator("source").getAttribute("src");
  expect(source).toContain("/smart-guidance-chain-showcase/assets/");
  const r = await request.get(source!);
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toMatch(/video\/mp4/);
  expect(errors).toEqual([]);
});
test("gallery filters, opens, advances, and closes accessibly", async ({
  page,
}) => {
  await page.goto("./");
  const gallery = page.locator("#gallery");
  await gallery.scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /^Mobile/ }).click();
  await expect(gallery.locator(".gallery-card")).toHaveCount(1);
  await page.getByRole("button", { name: /^All screens/ }).click();
  const opener = gallery
    .getByRole("button", { name: /Enlarge screenshot/ })
    .first();
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const title = await dialog.getByRole("heading").innerText();
  await dialog.getByRole("button", { name: "Next screenshot" }).click();
  await expect(dialog.getByRole("heading")).not.toHaveText(title);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});
test("architecture inspector and demo navigation work", async ({ page }) => {
  await page.goto("./");
  await page
    .getByRole("button", { name: "Watch the demo", exact: true })
    .click();
  await expect(page.locator("#demo")).toBeInViewport({ ratio: 0.1 });
  await page.locator("#architecture").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Qdrant Semantic/ }).click();
  await expect(page.locator(".node-inspector").getByRole("heading")).toHaveText(
    "Qdrant",
  );
  await expect(page.locator(".node-inspector")).toContainText(
    "Multilingual embeddings",
  );
  const github = page.getByRole("link", { name: "Find me on GitHub" });
  await expect(github).toHaveAttribute("href", "https://github.com/Hussamraba");
});
test("responsive navigation reaches the right section", async ({
  page,
  isMobile,
}) => {
  await page.goto("./");
  if (isMobile)
    await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Features", exact: true })
    .click();
  await expect(page).toHaveURL(/#features$/);
  await expect(page.locator("#features")).toBeInViewport({ ratio: 0.1 });
  if (isMobile)
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
});
