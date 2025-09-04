const btn_QR = document.getElementById('btn_QR');
let codigo = document.getElementById('codigo')
let video = document.getElementById('preview')

// let sonido = new Audio("../../img/barcode.wav");
btn_QR.addEventListener('click', (e) => {
    e.preventDefault();

    let scanner = new Instascan.Scanner({
        video: video,
        scanPeriod: 5,
        mirror: true
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            alert('No se encontraron camaras');
        }
    }).catch(function (e) {
        alert('Error: ' + e);
    });

    scanner.addListener('scan', function (resp) {
        // sonido.play();
        //console.log(resp);
        codigo.innerHTML = resp;
        scanner.stop();
    })
})

const preview_content = () => {
    let video = document.createElement('video').setAttribute('id', 'preview');
    video.style.width = '-webkit-fill-available';

}