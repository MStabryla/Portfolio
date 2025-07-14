export class ScrollService {
    scrollTo(destiny: number): void {
        window.addEventListener("scroll",e => e.preventDefault ? e.preventDefault() : (e.returnValue = false));
        let speed = 12,distanse = Math.abs(destiny - window.scrollY),distanseCounter = 0;
        console.log("distanse",distanse);
        let scrollInterval = setInterval(() => {
            window.scrollBy(0,speed);
            distanseCounter += speed;
            if(distanseCounter >=  distanse * 0.4 && distanseCounter <= distanse * 0.6)
            {
                speed = 18;
            }
            else if(distanseCounter <  distanse * 0.3 || distanseCounter > distanse * 0.7)
            {
                speed = 12;
            }
            if(distanseCounter <  distanse * 0.2 || distanseCounter > distanse * 0.8)
            {
                speed = 10;
            }
            if(distanseCounter <  distanse * 0.1 || distanseCounter > distanse * 0.9)
            {
                speed = 4;
            }
            if(window.scrollY >= destiny)
            {
                clearInterval(scrollInterval);
                window.onscroll = null;
            }
        },1);
    }
}