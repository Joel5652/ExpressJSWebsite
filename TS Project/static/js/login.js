var invalidLogin1 = document.getElementById('invalidLogin')
const input1 = document.getElementById('input1')

var invalidAcc1 = document.getElementById('invalidAcc')
const input2 = document.getElementById('input2')


if($(invalidLogin1) .is(':empty')){
    invalidLogin1.style.display = 'none'
} else {
    input1.style.marginBottom = '0px'
    invalidLogin1.style.display = 'block'
}

if($(invalidAcc1) .is(':empty')){
    invalidAcc1.style.display = 'none'
} else {

    if($(invalidAcc1).text() == 'Account created successfully!'){
        invalidAcc1.style.color = '#5285fa'
    }

    input2.style.marginBottom = '0px'
    invalidAcc1.style.display = 'block'
}

