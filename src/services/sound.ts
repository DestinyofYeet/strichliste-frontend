import { Howl } from 'howler';
import { CreateTransactionParams } from '../store/reducers';

function getRand(list: Array<string>) {
  return list[Math.floor(Math.random() * list.length)]
}

const einzahlungsFiles = [
  "spongebob_moneten.wav"
]

const auszahlungsFiles = [
  "wobble.wav"
];

const baseFiles = [
  "ka-ching.wav",
  "mario-coin.wav"
];

function getDispense(file?: string) {
  if (file == null) {
    file = getRand(baseFiles);
  }
  return new Howl({ src: [file]});
}

const soundFiles = new Map<number, Array<string>>([
  // [1, ["mario-coin.wav"]]
]);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function playCashSound(_params?: CreateTransactionParams): void {
  if (_params == null){
    getDispense(getRand(baseFiles)).play();
    return;
  }

  console.log(_params);

  if (_params.articleId != null) {
    // Artikel gekauft
    const articleId = _params.articleId;
    const soundFileArray = soundFiles.get(articleId);
    if (soundFileArray != null) {
      getDispense(getRand(soundFileArray)).play();
    } else {
      getDispense(getRand(baseFiles)).play();
    }
  } else if (_params.amount != null && _params.articleId == null && _params.recipientId == null){
    // Geld eingezahlt
    const amount = _params.amount;
    if (amount > 0){
      
      getDispense(getRand(einzahlungsFiles)).play();
    } else {
      getDispense(getRand(auszahlungsFiles)).play();
    }
  }
}
