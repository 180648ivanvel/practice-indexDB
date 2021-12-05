const indexedDb = window.indexedDB;
const form = document.getElementById('form');

if(indexedDB && form){
    let db
    const request = indexedDB.open('consulta', 2)
    
    request.onsuccess = () => {
        db = request.result
        console.log('Open', db);
    }

    request.onupgradeneeded = () => {
        db = request.result;
        console.log('Create', db);
        const objectStore = db.createObjectStore('consulta', {
            keyPath: 'nombre'
        });
    }

    request.onerror = (error) => {
        console.log('Error', error);
    }

    const addData = (data) => {
        const transaction = db.transaction(['consulta'],
         'readwrite');
        const objectStore = transaction.objectStore('consulta')
        const request = objectStore.add(data)
    }   

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            nombre: e.target.nombre.value,
            apellidos: e.target.apellidos.value,
            razon: e.target.razon.value,
            phone: e.target.tel.value,
            fecha: e.target.fecha.value,
            hora: e.target.hora.value,
        }
        console.log(data);
        addData(data);
    })
}

window.addEventListener('online', () =>{
    console.log('En linea')
})
window.addEventListener('offline', () =>{
    console.log('Sin conexion')
})