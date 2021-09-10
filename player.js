function getMatch(el, regexp) {
    return el.match(regexp)[0].trim()
}

module.exports.getPlayer = (data, server) => {
    let player = data;
    const full_player = parseFullResponse(player['full_response']);
    delete player['full_response'];

    return {
        server,
        player,
        full_player
    };
}

function parseFullResponse(string) {
    return string.split(/<Sum>/).reduce((acc, el) => {
        if (!el) return acc

        const key = getMatch(el, /.*(?=\=)/)
        acc[key] = +getMatch(el, /(?<=\=).*/)

        return acc
    }, {})
}