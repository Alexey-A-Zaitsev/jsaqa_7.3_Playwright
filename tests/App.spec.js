const { test, expect } = require("@playwright/test");

const user = require("../user");

let validLogin = user.validlogin;
let validPass = user.validpass;
let invalidLogin = user.invalidLogin;
let invalidPass = user.invalidPass;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms)); // Введем задержку выполнения кода для того, чтобы страница успела загрузиться
}

test("successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await sleep(10000);
  await page.screenshot({
    path: "./screenshots/Test_1_page.png",
    fullPage: true,
    type: "png",
  });
  await page.getByPlaceholder("Email").fill(validLogin);
  await page.getByPlaceholder("Пароль").fill(validPass);
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile");
  await sleep(15000);
  await expect(page).toHaveTitle("Мои программы обучения");
  await page.screenshot({
    path: "./screenshots/Test_1_my_profile.jpeg",
    fullPage: true,
    type: "jpeg",
  });
});

test("failed authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await sleep(10000);
  await page.screenshot({
    path: "./screenshots/Test_2_page.jpeg",
    fullPage: true,
    type: "jpeg",
  });
  await page.getByPlaceholder("Email").fill(invalidLogin);
  await page.getByPlaceholder("Пароль").fill(invalidPass);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.screenshot({
    path: "./screenshots/Test_2_Error.jpeg",
    fullPage: false,
    type: "jpeg",
  });
});
