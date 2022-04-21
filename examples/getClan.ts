import wf from '../src'

const $object = new wf({
    servers: ["eu"]
});

$object.clan.get("Beensddus").then((response) => {
    console.log(response)
}).catch((err) => {
    console.error(err)
})
