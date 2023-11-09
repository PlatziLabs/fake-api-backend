export type typeImg =
  | 'movie'
  | 'game'
  | 'album'
  | 'album'
  | 'face'
  | 'fashion'
  | 'shoes'
  | 'watch'
  | 'furniture'
  | 'pizza'
  | 'burger'
  | 'drink'
  | 'car'
  | 'house'
  | 'random';

const images2 = {
  clothes: [
    [
      'https://i.imgur.com/QkIa5tT.jpeg',
      'https://i.imgur.com/jb5Yu0h.jpeg',
      'https://i.imgur.com/UlxxXyG.jpeg'
    ],
    [
      'https://i.imgur.com/1twoaDy.jpeg',
      'https://i.imgur.com/FDwQgLy.jpeg',
      'https://i.imgur.com/kg1ZhhH.jpeg',
    ]
    , [
      'https://i.imgur.com/cHddUCu.jpeg',
      'https://i.imgur.com/CFOjAgK.jpeg',
      'https://i.imgur.com/wbIMMme.jpeg',
    ], [
      'https://i.imgur.com/R2PN9Wq.jpeg',
      'https://i.imgur.com/IvxMPFr.jpeg',
      'https://i.imgur.com/7eW9nXP.jpeg',
    ], [
      'https://i.imgur.com/cSytoSD.jpeg',
      'https://i.imgur.com/WwKucXb.jpeg',
      'https://i.imgur.com/cE2Dxh9.jpeg',
    ], [
      'https://i.imgur.com/ZKGofuB.jpeg',
      'https://i.imgur.com/GJi73H0.jpeg',
      'https://i.imgur.com/633Fqrz.jpeg',
    ], [
      'https://i.imgur.com/mp3rUty.jpeg',
      'https://i.imgur.com/JQRGIc2.jpeg',
    ], [
      'https://i.imgur.com/9LFjwpI.jpeg',
      'https://i.imgur.com/vzrTgUR.jpeg',
      'https://i.imgur.com/p5NdI6n.jpeg',
    ], [
      'https://i.imgur.com/R3iobJA.jpeg',
      'https://i.imgur.com/Wv2KTsf.jpeg',
      'https://i.imgur.com/76HAxcA.jpeg',
    ], [
      'https://i.imgur.com/wXuQ7bm.jpeg',
      'https://i.imgur.com/BZrIEmb.jpeg',
      'https://i.imgur.com/KcT6BE0.jpeg',
    ], [
      'https://i.imgur.com/cBuLvBi.jpeg',
      'https://i.imgur.com/N1GkCIR.jpeg',
      'https://i.imgur.com/kKc9A5p.jpeg',
    ], [
      'https://i.imgur.com/KeqG6r4.jpeg',
      'https://i.imgur.com/xGQOw3p.jpeg',
      'https://i.imgur.com/oO5OUjb.jpeg',
    ], [
      'https://i.imgur.com/UsFIvYs.jpeg',
      'https://i.imgur.com/YIq57b6.jpeg',
    ], [
      'https://i.imgur.com/eGOUveI.jpeg',
      'https://i.imgur.com/UcsGO7E.jpeg',
      'https://i.imgur.com/NLn4e7S.jpeg',
    ], [
      'https://i.imgur.com/axsyGpD.jpeg',
      'https://i.imgur.com/T8oq9X2.jpeg',
      'https://i.imgur.com/J6MinJn.jpeg',
    ], [
      'https://i.imgur.com/Y54Bt8J.jpeg',
      'https://i.imgur.com/SZPDSgy.jpeg',
      'https://i.imgur.com/sJv4Xx0.jpeg',
    ], [
      'https://i.imgur.com/9DqEOV5.jpeg',
      'https://i.imgur.com/ae0AEYn.jpeg',
      'https://i.imgur.com/mZ4rUjj.jpeg',
    ]]
}

const images = [
  'https://i.imgur.com/5iNAL9T.jpeg',
  'https://i.imgur.com/x0K3SKA.jpeg',
  'https://i.imgur.com/Dm2pPfd.jpeg',
  'https://i.imgur.com/zQwsC2m.jpeg',
  'https://i.imgur.com/0KlqHu9.jpeg',
  'https://i.imgur.com/lVH533g.jpeg',
  'https://i.imgur.com/QEGACen.jpeg',
  'https://i.imgur.com/rDC2jWQ.jpeg',
  'https://i.imgur.com/OARGZQW.jpeg',
  'https://i.imgur.com/OLKMwgP.jpeg',
  'https://i.imgur.com/00qWleT.jpeg',
  'https://i.imgur.com/RQL19O6.jpeg',
  'https://i.imgur.com/kTPCFG2.jpeg',
  'https://i.imgur.com/gxaUWSF.jpeg',
  'https://i.imgur.com/rUWNzYa.jpeg',
  'https://i.imgur.com/Y5gHJMd.jpeg',
  'https://i.imgur.com/fpT4052.jpeg',
  'https://i.imgur.com/G45P8tI.jpeg',
  'https://i.imgur.com/DumuKkD.jpeg',
  'https://i.imgur.com/nZnWUc0.jpeg',
  'https://i.imgur.com/O1LUkwy.jpeg',
  'https://i.imgur.com/uDpzwEk.jpeg',
  'https://i.imgur.com/s8WRA2O.jpeg',
  'https://i.imgur.com/5mPmJYO.jpeg',
  'https://i.imgur.com/nCqOV7L.jpeg',
  'https://i.imgur.com/aCDF0yh.jpeg',
  'https://i.imgur.com/M3QKiC5.jpeg',
  'https://i.imgur.com/GwylUgV.jpeg',
  'https://i.imgur.com/imQx3Az.jpeg',
  'https://i.imgur.com/RLnJJyQ.jpeg',
];

export function generateImage(category: typeImg) {
  const position = getRandomInt(0, images.length);
  console.log(category);
  return images[position];
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
