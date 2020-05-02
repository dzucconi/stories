export type StickyCapsOptions = {
  probability: number;
  lowercaseColor: string;
  uppercaseColor: string;
};

export type StickyCaps = (
  string: string,
  { probability, lowercaseColor, uppercaseColor }: StickyCapsOptions
) => string;

export const stickyCaps: StickyCaps = (
  string,
  { probability = 0.5, lowercaseColor, uppercaseColor }
) => {
  return string
    .split(" ")
    .map((word) => {
      return `
        <div class="Word">
          ${word
            .split("")
            .map((letter) => {
              const { char, color } =
                Math.random() > probability
                  ? {
                      char: letter.toUpperCase(),
                      color: uppercaseColor,
                    }
                  : {
                      char: letter.toLowerCase(),
                      color: lowercaseColor,
                    };

              return `<span style="color: ${color}">${char}</span>`;
            })
            .join("")}
        </div>
    `;
    })
    .join("");
};
