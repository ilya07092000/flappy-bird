let bird = document.querySelector('.bird'),
    barriers = document.querySelectorAll('.barriers'),
    mainImg = document.querySelector('.main__img'),
    counterBlock = document.querySelector('.count'),
    reloadBtn = document.querySelector('.reload__btn'),
    instruction = document.querySelector('.instruction'),
    birdStylePosTop,
    jump = -10,
    birdDown = 9,
    barriersSpeed = 30,
    intervalBird,
    birdCurrentPos,
    counter = 0;
    counterBlock.innerHTML = `Score: ${counter}`;

// СИЛА ПРИТЯЖЕНИЯ
function birdFlyDown() {
    birdStylePosTop = parseInt(getComputedStyle(bird).top);
    bird.style.top = String(birdStylePosTop + birdDown) + 'px';

    barrierMove();
    barrierCreate();
    score();
    checkCollision();
}

// ПРЫЖОК 
document.addEventListener('keydown', birdJump);
document.addEventListener('click', birdJump);
function birdJump() {
    clearInterval(intervalBird)
    bird.style.top = String(birdStylePosTop + jump) + 'px';
    intervalBird = setInterval(birdFlyDown, 100);
    instruction.style.display = 'none';
}

// ДВИЖЕНИЕ ПРЕПЯТСТВИЙ
function barrierMove() {
    barriers = document.querySelectorAll('.barriers');
    for(let i = 0; i < barriers.length; i++) {
        let barriersPos = getComputedStyle(barriers[i]);
        barriersPos = new WebKitCSSMatrix(barriersPos.webkitTransform).m41 - barriersSpeed;;
        barriers[i].style.transform = "translateX(" + `${barriersPos}` + 'px' +")";
    }
}

// СОЗДАНИЕ НОВОГО ПРЕПЯТСТВИЯ
function barrierCreate() {
    let currentBarrier = barriers.length - 1;
    let lastBarrier = getComputedStyle(barriers[currentBarrier]);
    let lastBarrierPos = getComputedStyle(barriers[currentBarrier]);
    lastBarrierPos = new WebKitCSSMatrix(lastBarrierPos.webkitTransform).m41;

    if(lastBarrierPos < -180) {
        let newBarrier = document.createElement('div');
        newBarrier.classList.add('barriers')
        newBarrier.innerHTML = `
        <div class="barriers__inner">
            <img class="top__barrier" src="img/flappy_bird_pipeUp.png" alt="">
            <img class="bottom__barrier" src="img/flappy_bird_pipeBottom.png" alt="">
        </div>
        `
        mainImg.append(newBarrier)
        let newLastBarrier = mainImg.lastElementChild;
        let barriersInner = newLastBarrier.lastElementChild;
        topBarrier = barriersInner.firstElementChild;
        let bottomBarrier = barriersInner.lastElementChild;

        topBarrier.style.top = -Math.random() * 125 + 'px';
        bottomBarrier.style.top = 242 + parseInt(topBarrier.style.top) + 60 + 'px';
    }
}

// СЧЕТ
function score() {
    let barrierCurrentPos = barriers[counter].getBoundingClientRect();
    birdCurrentPos = bird.getBoundingClientRect();

    if(birdCurrentPos.left > barrierCurrentPos.left + barriers[counter].offsetWidth) {
        counter++;
        counterBlock.innerHTML = `Score: ${counter}`;
    }

}

// ПРОВЕРКА НЕ ВРЕЗАЛАСЬ ЛИ ПТИЦА В ПРЕПЯТСТВИЕ
function checkCollision() {
    let barierInner = barriers[counter].firstElementChild;
    let topB = barierInner.firstElementChild;
    let bottomB = barierInner.lastElementChild;
    let topBPos = topB.getBoundingClientRect();
    let bottomBPos = bottomB.getBoundingClientRect();

    if(birdCurrentPos.top <= topBPos.top + 242 
        && birdCurrentPos.left >= topBPos.left 
        && birdCurrentPos.left <= topBPos.left + topB.offsetWidth) {
        collision()
    }
    if(birdCurrentPos.top <= topBPos.top + 242 
        && birdCurrentPos.left + bird.offsetWidth >= topBPos.left 
        && birdCurrentPos.left + bird.offsetWidth <= topBPos.left + topB.offsetWidth) {
        collision()
    }

    if(birdCurrentPos.top + bird.offsetHeight >= bottomBPos.top 
        && birdCurrentPos.left >= topBPos.left 
        && birdCurrentPos.left <= topBPos.left + topB.offsetWidth) {
        collision()
    }
    if(birdCurrentPos.top + bird.offsetHeight >= bottomBPos.top 
        && birdCurrentPos.left + bird.offsetWidth >= topBPos.left 
        && birdCurrentPos.left + bird.offsetWidth <= topBPos.left + topB.offsetWidth) {
        collision()
    }
}

// ПРОИГРЫШ
function collision() {
    clearInterval(intervalBird)
    document.removeEventListener('keydown', birdJump)
    document.removeEventListener('click', birdJump)
    bird.style.zIndex = '999999999'
    bird.style.transform = 'rotate(90deg)'
    bird.style.transition = 'all 2s';
    bird.style.top = '100%';
    reloadBtn.style.display = 'inline-block';
}

// НАЧАТЬ ЗАНОВО
reloadBtn.addEventListener('click', reload);
function reload() {
    location.reload();
}
