export function getScareLevelText(level) {
    const numericLevel = parseInt(level);

    const levels = {
        1: "MYSIGT",
        2: "LITE LÄSKIGT",
        3: "OBEHAGLIGT",
        4: "SKRÄCKINHAGANDE",
        5: "REN TERROR"
    };

    return levels[numericLevel] || "OKÄNT"

}