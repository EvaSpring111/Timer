function Timer(rootElem) {
    this.rootElem = rootElem;
    this.showElem = rootElem.querySelector('span');
    //this.buttomElem = rootElem.querySelectorAll('button');
    this.startBtn = rootElem.querySelector('[data-action ="start"]');
    this.pauseBtn = rootElem.querySelector('[data-action="pause"]');
    this.resetBtn = rootElem.querySelector('[data-action="reset"]');
    this.stopBtn = rootElem.querySelector('[data-action="stop"]');
    this.newTimerElem = document.querySelector('.timer.next');

    this.starTime = null;  
    this.shiftTime = 0;                                                                                                                                                                                      
    this.timerId = null;
    this.status = Timer.STOP;

    if(this.startBtn){
        this.startBtn.addEventListener('click', this.run.bind(this));
    }

    if(this.pauseBtn) {
        this.pauseBtn.addEventListener('click', this.pause.bind(this));
    }

    if(this.stopBtn) {
        this.stopBtn.addEventListener('click', this.stopBtn.bind(this));
    }
    
    this.render();
}

Timer.RUN = 'RUN';
Timer.STOP = 'STOP';
Timer.PAUSE = 'PAUSE';

Timer.prototype.run = function() { 
    if(this.status === Timer.STOP) {
        this.shiftTime = 0;
    }

    if(this.status === Timer.RUN) {
        return ;
    }

    this.starTime = Date.now();
    this.timerId = setInterval(this.render.bind(this), 1000);
    this.status = Timer.RUN;

    this.render();
};

Timer.prototype.reset = function() {
    this.starTime = null;
    this.shiftTime = 0;
    this.timerId = null;
    this.status = Timer.STOP;

    this.render();
};

Timer.prototype.pause = function() {
   clearInterval(this.timerId);
   this.timerId = null;

   if(this.starTime) {
    this.shiftTime = this.getTime();
    this.starTime = null;
   }

   this.render();
   this.status = Timer.PAUSE;
};

Timer.prototype.stop = function() {
    this.pause();
    this.status = Timer.STOP;
};

Timer.prototype.getTime = function () {
    if(!this.starTime) {
        return this.shiftTime;
    }
    return this.shiftTime + Date.now() - this.starTime;
};
 
Timer.prototype.getTimeStr = function() {
    const time = Math.floor(this.getTime() / 1000);
    const ss = time % 60;
    const mm = Math.floor((time %  3600) / 60);
    const hh = Math.floor(time / 3600);

    return [hh, mm, ss]
    .map(num => num.toString().padStart(2, '0'))
    .join(':');
};

Timer.prototype.render = function() {
    const timeStr = this.getTimeStr();

    this.showElem.innerText = timeStr;
};



const timerElem = document.querySelector('.timer');
console.log( timerElem);

console.log( new Timer( timerElem) );