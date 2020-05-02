import { FrameInterval } from "frame-interval";
import { stickyCaps } from "./lib/stickyCaps";
import parameters from "queryparams";

const DOM = {
  root: document.getElementById("root"),
};

type Config = {
  fps: number;
  message: string;
  font: "monospace" | "proportional";
  probability: number;
  lowercaseColor: string;
  uppercaseColor: string;
  backgroundColor: string;
  backgroundImage?: string;
  backgroundBlur?: boolean;
};

const initialize = ({
  fps,
  message,
  font,
  probability,
  lowercaseColor,
  uppercaseColor,
  backgroundColor,
  backgroundImage,
  backgroundBlur,
}: Config) => {
  const run = new FrameInterval(fps, () => {
    DOM.root.innerHTML = `
      <div class="Story Story--${font}" style="background-color: ${backgroundColor};">
        ${
          backgroundImage
            ? `
              <div
                class="Story__background"
                style="background-image: url(${backgroundImage});"
              ></div>
            `
            : ""
        }

        <div
          class="Story__content ${backgroundBlur ? "Story__content--blur" : ""}"
        >
          <div class="Story__message">
            ${stickyCaps(message, {
              probability,
              lowercaseColor,
              uppercaseColor,
            })}
          </div>
        </div>
      </div>
  `;
  });

  run.start();
};

const params = parameters();

if (Object.keys(params).length === 0) {
  DOM.root.innerHTML = `
    <form>
      <label>
        fps
        <input name="fps" type="number" value="24" required />
      </label>

      <label>
        message
        <input name="message" type="text" placeholder="message" required />
      </label>

      <label>
        font
        <select name="font" required>
          <option value="proportional">proportional</option>
          <option value="monospace">monospace</option>
        </select>
      </label>

      <label>
        probability
        <input name="probability" type="range" value="0.5" min="0" max="1" step="0.01" required />
      </label>

      <label>
        color when uppercase
        <input name="uppercaseColor" type="color" value="#ffffff" required />
      </label>

      <label>
        color when lowercase
        <input name="lowercaseColor" type="color" value="#ffffff" required />
      </label>

      <label>
        background color
        <input name="backgroundColor" type="color" value="#000000" required />
      </label>

      <label>
        url for background image (optional)
        <input name="backgroundImage" type="url" placeholder="http://" />
      </label>

      <label>
        blur background image
        <input name="backgroundBlur" type="checkbox" checked />
      </label>

      <button type="submit">generate</button>
    </form>
  `;
}

const {
  fps,
  message,
  font,
  probability,
  lowercaseColor,
  uppercaseColor,
  backgroundColor,
  backgroundImage,
  backgroundBlur,
} = params;

initialize({
  fps,
  message,
  font,
  probability,
  lowercaseColor,
  uppercaseColor,
  backgroundColor,
  backgroundImage,
  backgroundBlur: backgroundBlur === "on",
});
