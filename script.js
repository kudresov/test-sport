// 2. This code loads the IFrame Player API code asynchronously.
jQuery.getJSON('data2.json', function(x){
  data = x;
});
var videoStart = moment('2016-02-26T10:09:55.000Z');
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


setInterval(function(){
  var currentPlayLocation = player.getCurrentTime();
  var time = videoStart.clone().add(currentPlayLocation, 'seconds');

  var findTime = function(x){
    // if less one second away from data point
    return Math.abs(moment.duration(moment(x.time).diff(time)).asSeconds()) < 3;
  };
  var point = data.find(findTime);
  if (point) {
    $("#hr").text(point.hr);
    $("#speed").text(Math.round(point.speed * 3.6) + ' km/h');
  }
}, 1000);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'uyv2vcEUrjw',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {

  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   setTimeout(stopVideo, 6000);
  //   done = true;
  // }
}
function stopVideo() {
  player.stopVideo();
}