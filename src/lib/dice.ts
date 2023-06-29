export const dice = function (strings: TemplateStringsArray): number {
    if (!strings.raw[0]) {
        throw new Error('Empty dice');
    }

    const raw = strings.raw[0];

    const matches = raw.match(/(\d+)+d(\d*)(\+(\d*))?/);

    if (!matches) {
        throw new Error(`Invalid match for ${raw}`);
    }

    const multiple = Number(matches[1]);
    const faces = 1 + ~~(Math.random() * Number(matches[2]));
    const bonus = matches[4] ? Number(matches[4]) : 0;

    return multiple * faces + bonus;
};
