module.exports = {
    locales: ["id", "en"],
    defaultLocale: "en",
    localeDetection: false,
    pages: {
        "*": ["common"],
        "/": ["home"],
        "/pokemon": ["home"],
    },
};
