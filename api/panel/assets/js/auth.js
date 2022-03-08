let DISCORD_DATA;
setTimeout(async function () {
    try {
        let discordAuth = JSON.parse(localStorage.getItem("discord_oauth"))
        const data = await (await fetch('/api/auth/me', {
            headers: {
                'Authorization': discordAuth.token_type + " " + discordAuth.access_token,
            }
        })).json();
        if (data.code || !data.id) {
            window.location.href = "/panel/login"
        } else {
            DISCORD_DATA = data;
            try {
                document.getElementById("discPfp").src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}?size=512`
            } catch(err) {}
        }
    } catch(err) {
        window.location.href = "/panel/login"
    }
})