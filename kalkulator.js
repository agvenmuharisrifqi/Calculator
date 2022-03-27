/**
 * @Subpacakge Calculator Standard
 * @Function Input Session
 */
const re = /[^x\/\-\+\.\,\d]/gmi;
const inputNum = document.getElementById("number");
inputNum.addEventListener('keyup', ()=>{
    let angka = inputNum.value;
    var hasilAngka = formatRibuan(angka);
    inputNum.value = hasilAngka;
})

/**
 * @Function Number Button
 */
const btnNormal = document.getElementsByClassName("button__normal");
for(let btnN = 0; btnN < btnNormal.length; btnN++){
    btnNormal[btnN].addEventListener("click", ()=>{
        let angka = inputNum.value + btnNormal[btnN].textContent;
        if (inputNum.value.length < 13){
            var hasilAngka = formatRibuan(angka);
            inputNum.value = hasilAngka;
        }
    })
}

/**
 * @Function Delete All Button
 */
const delAll = document.getElementById("delete-all");
delAll.addEventListener("click", ()=>{
    inputNum.value = "";
})

function formatRibuan(angka){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split           = number_string.split(','),
    sisa            = split[0].length % 3,
    angka_hasil     = split[0].substr(0, sisa),
    ribuan          = split[0].substr(sisa).match(/\d{3}/gi);



    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        separator = sisa ? '.' : '';
        angka_hasil += separator + ribuan.join('.');
    }

    angka_hasil = split[1] != undefined ? angka_hasil + ',' + split[1] : angka_hasil;
    return angka_hasil;
}