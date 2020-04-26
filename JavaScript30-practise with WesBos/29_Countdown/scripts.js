let countdown ; //sort or higher level variable, global variable

const timer = second => {
    // setInterval(() => {
    //     second--;
    // }, 1000);
    const now = Date.now(); //returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. Since now() is a static method of Date, it will always be used as Date.now().
    const then = now + second * 1000; 
    // console.log({now, then});

    countdown = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it 
        if(secondLeft < 0){ // if seconds is less than 0 it will stop it
            clearInterval(countdown);
            return; //stop function
        }
        // dislay it
        displayTimeLeft(secondLeft); // call other function
    },1000);
};

const displayTimeLeft = seconds => {
    const minutes = Math.floor(seconds / 60); 
    const remainderSec = seconds % 60;
    console.log({minutes, remainderSec});
};
timer(10);