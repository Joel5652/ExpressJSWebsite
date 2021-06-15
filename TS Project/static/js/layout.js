const hiddenInformationFooterItem = document.getElementsByClassName('mobile-footer-information-item')
const hiddenSupportFooterItem = document.getElementsByClassName('mobile-footer-support-item')
const footerArrowInfo = document.getElementById('footerArrowInfo')
const footerArrowSupport = document.getElementById('footerArrowSupport')


window.onload = () => {
    hideFooterSupportItems()
    hideFooterInformationItems()
};

const burgerNav = document.getElementById('burgerNav')
const burgerMenu = document.getElementById('burgerMenu')
const closeMenu = document.getElementById('closeMenu')

//Mobile-menu

function lockScroll() {
   document.body.style.position = 'fixed';
}
function unlockScroll() {
    setTimeout(()=>document.body.style.position = 'static',250)
}


burgerNav.addEventListener('click',()=>
{
    lockScroll()
    burgerMenu.style.transform = ('translateX(0%)')
})
closeMenu.addEventListener('click',()=>
{
    unlockScroll()
    burgerMenu.style.transform = ('translateX(100%)')
})


//Footer-information-onclick

function disableInteractionInformationFooter()
{
    infoOpening = true
    setTimeout(()=> infoOpening = false, 500)
}

const informationFooter = document.getElementsByClassName('mobile-footer-information')
console.log('j');

let informationOpen = false
let infoOpening = false
informationFooter[0].addEventListener('click', ()=>
{
    if(infoOpening == false)
    {
        disableInteractionInformationFooter()
        if(informationOpen == false)
        {
            showFooterInformationItems()
            openArrow(footerArrowInfo)
            informationOpen = true
        }
        else
        {
            hideFooterInformationItems()
            closeArrow(footerArrowInfo)
            informationOpen = false
        }
    }
})

//Footer-support-onclick

function disableInteractionSupportFooter()
{
    supportOpening = true
    setTimeout(()=> supportOpening = false, 500)
}

const supportFooter = document.getElementsByClassName('mobile-footer-support')
let supportOpen = false
let supportOpening = false
supportFooter[0].addEventListener('click', ()=>
{   
    if(supportOpening == false)
    {
        disableInteractionSupportFooter()
        if(supportOpen == false)
        {
            showFooterSupportItems()
            openArrow(footerArrowSupport)
            supportOpen = true
        }
        else
        {
            hideFooterSupportItems()
            closeArrow(footerArrowSupport)
            supportOpen = false
        }
    }
   
})

//functions

function hideFooterSupportItems()
{
    for(let i = 0;i < hiddenSupportFooterItem.length;i++)
    {
        hiddenSupportFooterItem[i].style.opacity = '0';
        setTimeout(()=> hiddenSupportFooterItem[i].style.display = 'none', 250)
    }
}

function showFooterSupportItems()
{
    for(let i = 0;i < hiddenSupportFooterItem.length;i++)
    {
        hiddenSupportFooterItem[i].style.display = 'flex';
        setTimeout(()=> hiddenSupportFooterItem[i].style.opacity = '1', 50)
    }
}

function showFooterInformationItems()
{
    for(let i = 0;i < hiddenInformationFooterItem.length;i++)
    {
        hiddenInformationFooterItem[i].style.display = 'flex';
        setTimeout(()=> hiddenInformationFooterItem[i].style.opacity = '1', 50)
    }
}

function hideFooterInformationItems()
{
    for(let i = 0;i < hiddenInformationFooterItem.length;i++)
    {
        hiddenInformationFooterItem[i].style.opacity = '0';
        setTimeout(()=> hiddenInformationFooterItem[i].style.display = 'none', 250)

    }
}

function openArrow(id)
{
    id.style.transform = 'rotate(45deg)'
}

function closeArrow(id)
{
    id.style.transform = 'rotate(-45deg)'  
}