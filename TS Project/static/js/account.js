//add address

const address = document.getElementById('address')
const button = document.getElementById('button')
const closeButton = document.getElementById('close')
const form = document.getElementById('addressForm')

if($(address) .is(':empty')){
    button.style.display = 'flex'
} else {
    button.style.display = 'none'
}

function lockScroll() {
    document.body.style.position = 'fixed';
}
function unlockScroll() {
    setTimeout(()=>document.body.style.position = 'static',250)
}

button.addEventListener('click',()=>
{
    lockScroll()
    form.style.transform = 'translateX(0%)'
})
closeButton.addEventListener('click',()=>
{
    unlockScroll()
    form.style.transform = 'translateX(100%)'
})

//edit details

const button2 = document.getElementById('button2')
const closeButton2 = document.getElementById('close2')
const form2 = document.getElementById('detailsPatch')

button2.addEventListener('click',()=>
{
    lockScroll()
    form2.style.transform = 'translateX(0%)'
})
closeButton2.addEventListener('click',()=>
{
    unlockScroll()
    form2.style.transform = 'translateX(100%)'
})

//PATCH to API

