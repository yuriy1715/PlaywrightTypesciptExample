/**
 * Get current timestamp
 */
export const getCurrentTimestamp = () => Date.now();

/**
 * Get random string
 */
export const getRandomString = () => {
    const ts = getCurrentTimestamp();
    const prefix = Math.random().toString(36).substring(7);

    // console.log(">>>>>", ts, prefix);
    return `${prefix}${ts}`;
};

/**
 * Get random int
 * @param max: maximum value
 */
export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

/**
 * Get random int within range
 * @param min: minimum value
 * @param max: maximum value
 */
export const getRandomIntWithin = (min: number, max: number) => {
    const rInt = getRandomInt(max);
    return rInt < min ? rInt + min : rInt;
};

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Get date mm/dd/year
 * @param date: date for formatting
 */
export const formatDateMonthDateYear = (date: Date) => {
    return [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate()), date.getFullYear()]
        .join('/')
        .replace(/\b0/g, '');
};

/**
 * Get date yy-mm-year
 * @param date: date for formatting
 */
export const formatDateYearMonthDate = (date: Date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() - 1),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/').replace(/\b/g, '');
};

/**
 * Scroll page
 * @param args:
 * {direction: "up", speed: "fast"},
 * {direction: "down", speed: "slow"}
 */
export const scroll = async (args) => {
    const { direction, speed } = args;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const scrollHeight = () => document.body.scrollHeight;
    const start = direction === 'down' ? 0 : scrollHeight();
    const shouldStop = (position) =>
        direction === 'down' ? position > scrollHeight() : position < 0;
    const increment = direction === 'down' ? 100 : -100;
    const delayTime = speed === 'slow' ? 50 : 10;
    console.error(start, shouldStop(start), increment);
    for (let i = start; !shouldStop(i); i += increment) {
        window.scrollTo(0, i);
        await delay(delayTime);
    }
};

/**
 * Return uniq random email
 */
export const getRandomEmail = () => {
    return `autotest${Date.now()}@ii.yi`;
};
