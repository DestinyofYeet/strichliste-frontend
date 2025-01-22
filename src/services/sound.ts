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
  "mario-coin.wav",
  "futterlucke.wav"
];

const mateFiles = [
  "mate_01.wav"
];

function getDispense(file?: string) {
  if (file == null) {
    file = getRand(baseFiles);
  }
  return new Howl({ src: [file]});
}

const soundFiles = new Map<number, Array<string>>([
  // mio mio
  [1, mateFiles],
  // Wasser
  [3, ["wasser_1.wav"]],
  // Club mate
  [4, ["club_mate_1.wav"].concat(mateFiles)],
  // saftschorle
  [6, ["moneyboy_orangensaft.wav"]],
  // Bier
  // [7, ["bier.wav"]],
  // Bueno
  [9, ["bueno_1.wav"]],
  // Erdnüsse klein
  [12, ["eier.wav"]],
  // belasto
  [14, ["emotional-damage.wav"]],
  // Snickers
  [16, ["snickers_1.wav"]],
  // Maoam
  [19, ["maoam_1.wav"]],
  // Mentos
  [20, ["eier.wav"]],
  // spezi
  [23, ["spezifische_spezi_fischer.wav"]],
  // kaffee
  [24, ["coffee.wav", "coffee_2.wav", "coffee_3.wav"]],
  // Pizza
  [25, ["pizza_1.wav"]],
  // radler
  [27, ["radler.wav"]],
  // mio mio bananae
  [28, ["minion_banana.wav", "mio_mio_banana_2.wav"]],
  // Duplo
  [30, ["duplo_1.wav", "duplo_2.wav"]],
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
