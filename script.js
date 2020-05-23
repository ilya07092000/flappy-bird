let bird = document.querySelector('.bird'),
    birdPos,
    currentBirdPos,
    mainImg = document.querySelector('.main__img'),
    reloadBtn = document.querySelector('.reload__btn'),
    intervalBird,
    topBarrier,
    bottomBarrier,
    barriers = document.querySelectorAll('.barriers'),
    counterBlock = document.querySelector('.count'),

    counter = 0;
    counterBlock.innerHTML = `Score: ${counter}`;

function birdDown() {
    birdPos = getComputedStyle(bird);
    currentBirdPos = bird.getBoundingClientRect();
    let birdPosTop = parseInt(birdPos.top);
    let newPos = String(birdPosTop + 10) + 'px';
    bird.style.top = newPos;

    let barierInner = barriers[counter].firstElementChild;
    let topB = barierInner.firstElementChild;
    let bottomB = barierInner.lastElementChild;
    let topBPos = topB.getBoundingClientRect();
    let bottomBPos = bottomB.getBoundingClientRect();
    let gg = bird.getBoundingClientRect();

    if(gg.top <= topBPos.top + 242 && gg.left >= topBPos.left && gg.left <= topBPos.left + topB.offsetWidth) {
        collision()
    }
    if(gg.top <= topBPos.top + 242 && gg.left + bird.offsetWidth >= topBPos.left && gg.left + bird.offsetWidth <= topBPos.left + topB.offsetWidth) {
        collision()
    }

    if(gg.top + bird.offsetHeight >= bottomBPos.top && gg.left >= topBPos.left && gg.left <= topBPos.left + topB.offsetWidth) {
        collision()
    }
    if(gg.top + bird.offsetHeight >= bottomBPos.top && gg.left + bird.offsetWidth >= topBPos.left && gg.left + bird.offsetWidth <= topBPos.left + topB.offsetWidth) {
        collision()
    }


    for(let i = 0; i < barriers.length; i++) {
        barriers = document.querySelectorAll('.barriers');
        let currentEl = barriers.length - 1;
        let lastBarrier = getComputedStyle(barriers[currentEl]);
        lastBarrier = new WebKitCSSMatrix(lastBarrier.webkitTransform);
        lastBarrier = lastBarrier.m41;

        let barriersPos = getComputedStyle(barriers[i]);
        barriersPos = new WebKitCSSMatrix(barriersPos.webkitTransform);
        barriersPos = barriersPos.m41
        barriersPos -= 35;
        barriers[i].style.transform = "translateX(" + `${barriersPos}` + 'px' +")";

        let barrierCurrentPos = barriers[counter].getBoundingClientRect();
        let birdCurrentPos = bird.getBoundingClientRect();
        if(birdCurrentPos.left > barrierCurrentPos.left + barriers[counter].offsetWidth) {
            counter++;
            counterBlock.innerHTML = `Score: ${counter}`;
        }

        if(lastBarrier < -150) {
            let newBarrier = document.createElement('div');
            newBarrier.classList.add('barriers')
            newBarrier.innerHTML = `
            <div class="barriers__inner">
                <img class="top__barrier" src="img/flappy_bird_pipeUp.png" alt="">
                <img class="bottom__barrier" src="img/flappy_bird_pipeBottom.png" alt="">
            </div>
            `
            mainImg.append(newBarrier)

            let newLastBarrier = mainImg.lastChild;
            let barriersInner = newLastBarrier.lastElementChild;
                topBarrier = barriersInner.firstElementChild;
                bottomBarrier = barriersInner.lastElementChild;
            
            let topBarrierStyleTop = -Math.random() * 150;
            let bottomBarrierStyleBottom = 242 + topBarrierStyleTop + 60
            topBarrier.style.top = topBarrierStyleTop + 'px';
            bottomBarrier.style.top = bottomBarrierStyleBottom + 'px';
        }
    }
}


document.addEventListener('keydown', jump)
document.addEventListener('click', jump)
function jump() {
    clearInterval(intervalBird)
    let newBirdPos = getComputedStyle(bird);
    let newBirdPosTop = parseInt(newBirdPos.top);
    let afterJump = String(newBirdPosTop - 15) + 'px'
    bird.style.top = afterJump
    intervalBird = setInterval(birdDown, 100)
}

reloadBtn.addEventListener('click', reload);
function reload() {
    location.reload();
}


function collision() {
    clearInterval(intervalBird)
    document.removeEventListener('keydown', jump)
    document.removeEventListener('click', jump)
    bird.style.zIndex = '999999999'
    bird.style.transform = 'rotate(90deg)'
    bird.style.transition = 'all 2s';
    bird.style.top = '100%';
    reloadBtn.style.display = 'inline-block';
}













