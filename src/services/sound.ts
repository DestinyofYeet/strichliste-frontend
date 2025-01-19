import { Howl } from 'howler';
import { CreateTransactionParams } from '../store/reducers';

function getRand(list: Array<string>) {
  return list[Math.floor(Math.random() * list.length)]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function playCashSound(_params?: CreateTransactionParams): void {
  dispense.play();
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
  if (_params != null && _params.articleId != null) {
    const articleId = _params.articleId;
    const soundFileArray = soundFiles.get(articleId);
    if (soundFileArray != null) {
      getDispense(getRand(soundFileArray)).play();
    } else {
      getDispense(getRand(baseFiles)).play();
    }
  } else {
    getDispense(getRand(baseFiles)).play();
  }
}
