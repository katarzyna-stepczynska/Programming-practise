const video = document.querySelector('.player');
const canvas = document.querySelector('.photo'); // screnn on web
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap'); // sound

const getVideo = () => {
    //on web will be pop up / prompts the user for permission to use up to one video input device (such as a camera or shared screen) and up to one audio input device (such as a microphone)
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {      
        video.srcObject = localMediaStream;
        video.play();
      }).catch(err => console.error(err));
        // source of video - the media stream ,it will convert object to create an object URL 
};

const paintToCanvas = () => {
    const width = video.videoWidth, // read-only property indicates the intrinsic width of the video
    height = video.videoHeight; // analogic with height
    // console.log(width, height);
    canvas.width = width; 
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height); //pass video element to draw the image in canvas
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // console.log(pixels);
        // mess with them
        // pixels = redEffect(pixels); 
        pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;
        // pixels = greenScreen(pixels);
        // put them back 
        ctx.putImageData(pixels, 0, 0);
        // debugger; 
    }, 16)
};
const takePhoto = () => {
    // played the sound
    snap.currentTime = 0; //The currentTime property sets or returns the current position (in seconds) of the audio/video playback.
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    // console.log(data);
    const link = document.createElement('a');
    link.href = data; 
    link.setAttribute('download', 'photo');
    // link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="Photo" />`
    strip.insertBefore(link, strip.firstChlid); 
};

const redEffect = pixels => {
    for(i = 0; i < pixels.data.lenght; i += 4) { // not use a map method because this is a special kind of array in JS 
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
    }
    return pixels;
}; 

const rgbSplit = pixels => {
    for(i = 0; i < pixels.data.lenght; i += 4) {  
        pixels.data[i - 150] = pixels.data[i + 0]; // red
        pixels.data[i + 500] = pixels.data[i + 1]; // green
        pixels.data[i - 550] = pixels.data[i + 2]; // blue
    }
    return pixels;    
};

function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }

getVideo(); 
video.addEventListener('canplay', paintToCanvas); //run the function 
