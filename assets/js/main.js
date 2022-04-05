function Timer() {

    const timeText = document.querySelector('.timeText');
    const pause = document.querySelector('.-pause');
    const reset = document.querySelector('.-reset');
    let secs = 0;
    let timer;

    pause.classList.add('disabled');
    reset.classList.add('disabled');

    function getTimeInSeconds(secs) {
        const data = new Date(secs * 1000);
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'UTC'
        });
    }

    function initClock() {
        timer = setInterval(() => {
            secs++;
            timeText.innerHTML = getTimeInSeconds(secs);
        }, 1000);
    }

    function pauseClock() {
        clearInterval(timer);
    }

    function restart() {
        secs = 0;
        timeText.innerHTML = '00:00:00';
    }

    function loadingDots() {
        timerDots = setInterval(function () {
            const dots = document.querySelector(".dots");
            if (dots.innerHTML.length >= 3)
                dots.innerHTML = "";
            else
                dots.innerHTML += ".";
        }, 800);
    }

    function clearDots() {
        clearInterval(timerDots);
    }


    document.addEventListener('click', (e) => {
        const el = e.target;
        const start = document.querySelector('.-start');
        const status = document.querySelector('.statusText')

        if (el.classList.contains('-start')) {
            timeText.classList.remove('pause');
            start.classList.add('disabled');
            pause.classList.remove('disabled');
            reset.classList.remove('disabled');
            status.innerHTML = 'TIMER IS RUNNING<p class="dots"></p>'
            pauseClock();
            initClock();
            loadingDots();
        }

        if (el.classList.contains('-pause')) {
            pauseClock();
            start.innerHTML = 'Resume';
            status.innerHTML = 'TIMER IS PAUSED!'
            start.disabled = false;
            start.classList.remove('disabled');
            timeText.classList.add('pause');
            pause.classList.add('disabled');
            reset.classList.remove('disabled');
            clearDots();

        }

        if (el.classList.contains('-reset')) {
            pauseClock();
            restart();
            start.disabled = false;
            start.classList.remove('disabled');
            status.innerHTML = 'Your timer has not started yet';
            start.innerHTML = 'Start';
            timeText.classList.remove('pause');
            reset.classList.add('disabled');
            pause.classList.add('disabled');
            clearDots();
        }
    });
}

Timer();
