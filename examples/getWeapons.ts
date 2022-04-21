import wf from '../src'

const $object = new wf({
    servers: ["eu"]
});

$object.weapons.list().then((response) => {
    console.log(response)
}).catch((err) => {
    console.error(err)
})
