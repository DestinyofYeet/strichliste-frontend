import { Howl } from 'howler';
import { CreateTransactionParams } from '../store/reducers';

function getRand(list: Array<string>) : string {
  return list[Math.floor(Math.random() * list.length)]
}

function playSound(sound: string) {
  getDispense("sounds/" + sound).play();
}

const einzahlungsFiles = [
  "spongebob_moneten.wav"
];

const failedFiles = [
  "windows_error.wav"
];

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
  [28, ["minion_banana.wav"]],
  [6, ["moneyboy_orangensaft.wav"]],
  [14, ["emotional_damage.wav"]],
  [7, ["bier.wav"]],
  [27, ["radler.wav"]],
  [24, ["coffee.wav"]],
  [23, ["spezifische_spezi_fischer.wav"]]
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

  if (_params.articleId != null) {
    // Artikel gekauft
    const articleId = _params.articleId;
    const soundFileArray = soundFiles.get(articleId);
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
