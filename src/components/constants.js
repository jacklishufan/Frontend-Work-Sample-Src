import IMG_LOVE from "../assets/images/emoji/love.png"
import IMG_FRUSTRATED from "../assets/images/emoji/frustrated.png"
import IMG_LMAO from "../assets/images/emoji/LMAO.png"
import IMG_STRESSED from "../assets/images/emoji/stressed.png"
import IMG_TOUCHED from "../assets/images/emoji/touched.png"
import IMG_VULNERABLE from "../assets/images/emoji/vulnerable.png"
import IMG_ROLLING_MY_EYES from "../assets/images/emoji/rolling my eyes.png"
import IMG_EXCITED from "../assets/images/emoji/excited.png"
import IMG_WORRIED from "../assets/images/emoji/worried.png"
import IMG_ANGRY from "../assets/images/emoji/angry.png"
import IMG_HAPPY from "../assets/images/emoji/happy.png"
import IMG_SAD from "../assets/images/emoji/sad.png"
import IMG_INFATUATED from "../assets/images/emoji/infatuated.png"
import IMG_PRAYING from "../assets/images/emoji/praying.png"
import IMG_LOST from "../assets/images/emoji/lost.png"
import IMG_ZENOUT from "../assets/images/emoji/zen out.png"

const EMOJI_LST = [
    ["love",'',IMG_LOVE],
    ["frustrated", '', IMG_FRUSTRATED],
    ["LMAO", '', IMG_LMAO],
    ["stressed", '', IMG_STRESSED],
    ["touched", '', IMG_TOUCHED],
    ["vulnerable", '', IMG_VULNERABLE],
    ["rolling my eyes", '', IMG_ROLLING_MY_EYES],
    ["excited", '', IMG_EXCITED],
    ["worried", '', IMG_WORRIED],
    ["angry", '', IMG_ANGRY],
    ["happy", '', IMG_HAPPY],
    ["sad", '', IMG_SAD],
    ["infatuated", '', IMG_INFATUATED],
    ["praying", '', IMG_PRAYING],
    ["lost", '', IMG_LOST],
    ["zen out", '', IMG_ZENOUT],
];

const getEmojiByKey = (key)=>{
    let lst = EMOJI_LST.filter(e=>e[0]==key)
    return lst.length>0 ? lst[0][2]:null
}

const RESP_EMOJI = {
    'sad': '😞',
    'tears': '😆',
    'like': '🧡',
    'love': '🤗',
    'hate': '🥺'
}
const VOTES_ICON = {
    'upvote': '👍',
    'downvote': '👎',
}

const RANDOM_ANIMALS = ['Alligator',
'Alpaca',
'Antelope',
'Beaver',
'Bee',
'Beetle',
'Bird',
'Camel',
'Caterpillar',
'Chinchilla',
'Chipmunk',
'Coyote',
'Crab',
'Deer',
'Dog',
'Dolphin',
'Eagle',
'Eel',
'Elephant',
'Falcon',
'Ferret',
'Flamingo',
'Goat',
'Goose',
'Gorilla',
'Hamster']
const getRandName = ()=> RANDOM_ANIMALS[parseInt(Math.random() * (RANDOM_ANIMALS.length-1))]

export {EMOJI_LST,
    RESP_EMOJI,
    getEmojiByKey,
    VOTES_ICON,
    getRandName}