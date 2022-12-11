import { OpenAIApi, Configuration } from "openai";
const QRCode = require("qrcode");

const config = new Configuration({
  apiKey: "API_KEY",
});

const openai = new OpenAIApi(config);

async function main(assignment) {
  const responseElement = document.createElement("pre");
  responseElement.textContent = "Generating...";
  const element = document.getElementsByClassName(
    "a2-toggle-details-container"
  )[0];
  element.appendChild(responseElement);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give an example solution for the assignment below:

    ${assignment}

    Response:
    `,
    temperature: 0.7,
    max_tokens: 256,
  });

  console.log(response.data.choices[0].text);
  responseElement.textContent = response.data.choices[0].text;
}

const button = document.createElement("button");
button.textContent = "Generate an example solution with GPT-3";
button.classList.add("gpt-button");
button.addEventListener("click", () => {
  main(
    document.getElementsByClassName("a2-toggle-details-container")[0].innerText
  );
});

const canvas = document.createElement("canvas");
canvas.id = "qrcode";
QRCode.toCanvas(canvas, window.location, function (error) {
  if (error) console.error(error);
  console.log("success!");
});

setTimeout(function () {
  // alert("It's loaded!");
  const element = document.getElementsByClassName(
    "a2-toggle-details-container"
  )[0];

  element.appendChild(canvas);

  element.appendChild(button);
}, 2000);
