// this class is the a timer clock

export default class Timer {

  // duration: the duration for the timer  to run
  // onTick: the callback function for every time the clock ticks (every second)
  // onElapsed: the callback function when the time has elapsed
  constructor(duration, onTick, onElapsed) {
    this.duration =  duration
    this.onTick =  onTick,
    this.onElapsed =  onElapsed,
    // if the clock is running, endTime will be the time when the clock finishes,
    // otherwise it will be null
    this.endTime =  duration + Date.now()

    // Ticking the clock after constructing it
    this.tick()
  }
  
  get isRunning() {
    return this.endTime != null
  }

  get timeRemaining() {
    return this.endTime - Date.now()
  }


  tick = () => {
    // if the time has elapsed, call the onTick for 0 seconds and onElapsed
    if (this.endTime < Date.now()) {
      this.onTick(0);
      this.onElapsed();
    } else {
      // displaying the current time remaining
      this.onTick(this.timeRemaining);
      
      //timeout for any ms left
      const timeLeft = this.timeRemaining % 1000
      // ignore any ms left
      this.timeout = setTimeout(this.tick, timeLeft)
    }
    
  }

  stop = () => {
    clearTimeout(this.timeout)
    this.duration = this.timeRemaining
    this.timeout = null;
    this.endTime = null;
  }

  start = () => {
    this.endTime = Date.now() + this.duration;
    this.tick()
  }


}