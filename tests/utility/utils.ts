const moment = require("moment");

export const wait = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

export function testIdSelector<T extends string>(name: T): string {
  return `[data-testid="${name}"]`;
}

export function idSelector<T extends string>(name: T): string {
  return `[id="${name}"]`;
}

export function textSelector<T extends string>(name: T): string {
  return `text="${name}"`;
}

export function classSelector<T extends string>(name: T): string {
  return `.${name}`;
}

export function anchorSelector<T extends string>(name: T): string {
  return `[href="${name}"]`;
}

export function buttonTextSelector<T extends string>(name: T): string {
  return `button:text("${name}")`;
}

export function getSecondDifference(date) {
  let end = moment(new Date()); // another date
  let duration = moment.duration(end.diff(date.now));
  date.now = moment(new Date());
  return duration.asSeconds();
}
