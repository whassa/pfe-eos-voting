import GUN from 'gun/gun'
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';

//DB
export const db = GUN();

// Gun User
export const user = db.user().recall({sessionStorage: true});

// Current User's username
export const username = writable(''); //changer pour?

user.get('alias').on(v => username.set(v))

db.on('auth', async(event) => {
    const alias = await user.get('alias'); // username string
    username.set(alias);

    console.log(`signed in as ${alias}`);
});