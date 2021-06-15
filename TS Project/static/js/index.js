
const prevToolbar = document.getElementById('prevToolbar')
const nextToolbar = document.getElementById('nextToolbar')








//products-carousel

let ItemclassName = 'carousel-item';
let items = document.getElementsByClassName(ItemclassName)
let totalItems = items.length - 1
let slide=0
let moving=true;

function setInitialClasses()
{
    items[totalItems].classList.add('prev')
    items[0].classList.add('active')
    items[1].classList.add('next')
}

function setEventListeners()
{
    nextToolbar.addEventListener('click', moveNext)
    prevToolbar.addEventListener('click', movePrev)
}

function moveNext()
{
    if(!moving)
    {
        if(slide == totalItems)
        {
            slide = 0
        }
        else
        {
            slide++
        }
        moveCarouselTo(slide, 'next')
    }
}

function movePrev()
{
    if(!moving)
    {
        if(slide == 0)
        {
            slide = totalItems
        }
        else
        {
            slide--
        }
        moveCarouselTo(slide,'previous')
    }
}

function disableInteraction()
{
    moving = true
    setTimeout(()=> moving = false, 500)
}

function moveCarouselTo(slide, direction)
{
    if(!moving)
    {
        disableInteraction()

        let newPrev
        let newNext
        let oldPrev
        let oldNext

        //prev new
        if(slide - 1 < 0)
        {
            newPrev = totalItems
        }
        else
        {
            newPrev = slide - 1
        }

        //next new
        if(slide + 1 > totalItems)
        {
            newNext = 0
        }
        else
        {
            newNext = slide + 1
        }

        //old classes

        if(direction == 'next')
        {
            if(newPrev == 0)
            {
                oldPrev = totalItems
            }
            else
            {
                oldPrev = newPrev - 1
            }

            items[oldPrev].className = ItemclassName
        }
        else if (direction = 'previous')
        {
            if(newNext == totalItems)
            {
                oldNext = 0
            }
            else
            {
                oldNext = newNext + 1
            }

            items[oldNext].className = ItemclassName
        }

        
            items[newPrev].className = ItemclassName + ' prev'
            items[slide].className = ItemclassName + ' active'
            items[newNext].className = ItemclassName + ' next'
        
    }
}

function initCarousel()
{
    setInitialClasses()
    setEventListeners()

    moving = false
}

initCarousel()



