import { Howl } from 'howler';
import { CreateTransactionParams } from '../store/reducers';

function getRand(list: Array<string>) : string {
  return list[Math.floor(Math.random() * list.length)]
}

function playSound(sound: string) {
  getDispense("sounds/" + sound).play();
}

const einzahlungsFiles = [
  "spongebob_moneten.wav",
];

const failedFiles = [
  "windows_error.wav"
];

const auszahlungsFiles = [
  "wobble.wav"
];

const baseFiles = [
  "ka-ching.wav",
  "mario-coin.wav",
  "futterlucke.wav"
];

function getDispense(file?: string) {
  if (file == null) {
    file = getRand(baseFiles);
  }
  return new Howl({ src: [file]});
}

const soundFiles = new Map<string, Array<string>>([
  ["spezi", ["spezifische_spezi_fischer.wav"]],
]);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function playCashSound(_params?: CreateTransactionParams, failed = false): void {
  if (failed){
      playSound(getRand(failedFiles));
      return;
  }

  if (_params == null){
    getDispense(getRand(baseFiles)).play();
    return;
  }

  console.log(_params);

  if (_params.articleName != null) {
    // Artikel gekauft
    const articleName = _params.articleName;
    const soundFileArray = soundFiles.get(articleName);
    if (soundFileArray != null) {
      playSound(getRand(soundFileArray));
    } else {
      playSound(getRand(baseFiles));
    }
  } else if (_params.amount != null && _params.articleId == null && _params.recipientId == null){
    // Geld eingezahlt
    const amount = _params.amount;
    if (amount > 0){
      playSound(getRand(einzahlungsFiles));
    } else {
      playSound(getRand(auszahlungsFiles));
    }
  }
}
