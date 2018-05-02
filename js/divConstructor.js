let getMediaIcon = (fileType) => {
  let link = '';
  if (fileType.indexOf('video') !== -1) {
    kind = 'video';
  } else if (fileType.indexOf('audio') !== -1) {
    kind = 'audio';
  }
  switch (kind) {
    case 'video':
    link = './img/video.png';
    break;
    case 'audio':
    link = './img/music.png';
    break;
    default:
  }
  return `<img src=${link} class="mediaIcon">`;

};

let createCard = (item) => {
  let name = item['Name'] || 'Untitled',
      artist = item['Artist'] || 'Unknown Artist',
      kind = item['Kind'] || 'Unknown Kind',
      id = item['Track ID'] || 'Unknown ID'
      playCount = item['Play Count'] || 0;

  let iconString = getMediaIcon(kind);
  let $appendable = $(`<div class="entry" id=${id}>
                        <div class="entryTitle">
                          ${getMediaIcon(kind)}
                          <span class="bold">${artist}</span> - ${name}
                        </div><br />
                        <div class="entryInfo">
                          Additional Information regarding track
                        </div>
                      </div>`);

  return $appendable;
};

module.exports = {
  createCard
};
