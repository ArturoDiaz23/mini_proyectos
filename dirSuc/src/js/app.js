
import { login, logout } from "./auth.js";
import {
    insert,
    getSucursales,
    deleteSucursal,
    updateSucursal,
    getNext,
    getBefore
} from "./firestore.js";
import { progress, add_error, remove_error, toast } from "./utils.js";



// Elementos del DOM
const btn_login = document.getElementById("btn_login");
const btn_logout = document.getElementById("btn_logout");
const content_list = document.getElementById("content_sucursales");
const btn_add = document.getElementById("btn_add");
const data_user = document.getElementById("data_user");
const id_user = document.getElementById("id_user");

const btn_antes = document.getElementById('antes');
const btn_despues = document.getElementById('despues');


//Form add sucursal
const form_add = document.getElementById("form_add");
const btn_close_add = document.getElementById("btn_close_add");
const dialog_sucursal = document.getElementById("dialog_sucursal");

//Delet sucursal
const alert_dialog = document.getElementById('alert_dialog');
const form_alert_eliminar = document.getElementById('form_alert_eliminar');
const id_delete = document.getElementById('id_delete');

//Form update sucursal
const form_update = document.getElementById("form_update");
const btn_close_update = document.getElementById("btn_close_update");
const dialog_update = document.getElementById("dialog_update");

// Elementos del template
const container_suc = document.getElementById('list');
const template_suc = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

let currenUser;


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currenUser = user;
        init();
    } else {
        console.log("No user is signed in.");
    }
});

btn_login.addEventListener("click", async (e) => {
    try {
        currenUser = await login();
    } catch (error) {
        console.error("Login failed:", error);
    }
});

btn_logout.addEventListener("click", async (e) => {
    toogle_btn();
    logout();
});


/** Abrir el modal */
btn_add.addEventListener('click', () => {
    dialog_sucursal.show();
});

/** Abrir el modal update */


/**----------------------------------------------------------- */
//Funciones y event para isertar una nueva sucursal
// Enviar el formulario
form_add.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const cr = form_add['cr'];
    const sucursal = form_add['sucursal'];
    const direccion = form_add['direccion'];
    const municipio = form_add['municipio'];
    const estado = form_add['estado'];
    if (!cr.value || !sucursal.value || !direccion.value || !municipio.value || !estado.value) {
        for (const input of form_add) {
            if (!input.value) {
                add_error(input, 'Se requiere este dato');
            }
        }
    }
    else {
        newSucursal(cr.value, sucursal.value, direccion.value, municipio.value, estado.value);
        limpiar_form(form_add, dialog_sucursal);
    }
});

/** Función para agregar una nueva sucursal */
async function newSucursal(cr, sucursal, direccion, municipio, estado) {
    try {
        const item = {
            cr: cr,
            sucursal: sucursal,
            direccion: direccion,
            municipio: municipio,
            estado: estado,
            id_user: currenUser.uid,
        };
        const response = await insert(item);
        loadSucusales();
        //toats message, function in utils.js 
        //types: success, danger
        // toast(message, type)
        toast("Se agrego una nueva sucursal", "success");
    }
    catch (error) {
        toast("Error adding new Sucursal", "danger");
        //console.error("Error adding new Sucursal:", error);
    }
}

/**----------------------------------------------------------- */
/** Funcion y event para eliminar una sucursal */
//agregar evento a btn_delete
container_suc.addEventListener('click', e => {
    //e.preventDefault();
    if (e.target.classList.contains('btn_delete')) {
        id_delete.textContent = data_to_confirm(e.target.parentElement);
        alert_dialog.show();
        form_alert_eliminar.addEventListener('click', () => {
            delete_suc(e.target.dataset.id)
        });
    }
});

//retunr info the suc to alert delete
const data_to_confirm = data_info => {
    const data_items =
        data_info.querySelector('.template_cr').textContent + " " +
        data_info.querySelector('.template_sucursal').textContent;
    return data_items;
}

//funcion para eliminar sucursal
async function delete_suc(id) {
    try {
        const response = await deleteSucursal(id);
        loadSucusales();
        toast("Se elimino una sucursal", "success");
        //console.log("Sucursal deleted successfully");
    } catch (error) {
        toats("Error al eliminar Sucursal:", "danger");
        //console.error("Error deleting Sucursal:", error);
        throw new Error("Error delete sucursales: " + error.message)
    }
}

/**----------------------------------------------------------- */
//Funcion y evento para actualizar datos en una sucursal
//agregar evento a btn_update
container_suc.addEventListener('click', e => {
    //e.preventDefault();
    if (e.target.classList.contains('btn_update')) {
        dialog_update.show();
        llenar_dialog(set_data_update(e.target.parentElement), e.target.dataset.id);
    }
});
//obtener valor del item seleccionado
const set_data_update = data_info => {
    const data_items = {
        cr: data_info.querySelector('.template_cr').textContent,
        sucursal: data_info.querySelector('.template_sucursal').textContent,
        direccion: data_info.querySelector('.template_direccion').getAttribute('href'),
        municipio: data_info.querySelector('.template_municipio').textContent,
        estado: data_info.querySelector('.template_estado').textContent
    }
    return data_items;
}
//llena los campos del modal update
const llenar_dialog = (values, id) => {
    const update_cr = form_update['update_cr'].value = values.cr;
    const update_sucursal = form_update['update_sucursal'].value = values.sucursal;
    const update_direccion = form_update['update_direccion'].value = values.direccion;
    const update_municipio = form_update['update_municipio'].value = values.municipio;
    const update_estado = form_update['update_estado'].value = values.estado;
    const update_doc_id = form_update['update_doc_id'].value = id;
}
//enviar datos
form_update.addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    const update_cr = form_update['update_cr']; const update_sucursal = form_update['update_sucursal'];
    const update_direccion = form_update['update_direccion']; const update_municipio = form_update['update_municipio'];
    const update_estado = form_update['update_estado']; const update_doc_id = form_update['update_doc_id'];

    if (!update_cr.value || !update_sucursal.value || !update_direccion.value || !update_municipio.value || !update_estado.value) {
        for (const input of form_update) {
            if (!input.value) {
                add_error(input, 'Se requiere este dato');
            }
        }
    } else {
        const item = {
            cr: update_cr.value, sucursal: update_sucursal.value,
            direccion: update_direccion.value, municipio: update_municipio.value,
            estado: update_estado.value, id_user: currenUser.uid,
        };
        update_suc(update_doc_id.value, item);
        dialog_update.close();
    }
});
//Fuction para actualiza firebase
async function update_suc(id, data) {
    try {
        const response = await updateSucursal(id, data);
        loadSucusales();
        toast("Se actualizo una sucursal", "success");
    } catch (error) {
        toast("Error al actualizar Sucursal", "danger");
        throw new Error("Error update sucursales: " + error.message)
    }
}
// 2857
// Pichucalco Chiapas
// https://maps.app.goo.gl/8NzcMuYGz3JVEfnC7
/**----------------------------------------------------------- */
/* Carga de datos */
// función asincrona para llamas datos a la DB
async function loadSucusales() {
    try {
        const response = await getSucursales();
        const data = await response;
        renderSuc(data)
    } catch (error) {
        throw new Error("Error loading sucursales: " + error.message);
    }
}

//funcion para cargar los datos al DOM
const renderSuc = (array) => {
    if (array.length > 0) {
        list.replaceChildren();
        progress(list);
        setTimeout(() => {
            array.forEach((item) => {
                list.replaceChildren(); // Limpiar el contenido previo de la lista

                template_suc.querySelector('.template_cr').textContent = item.cr;
                template_suc.querySelector('.template_sucursal').textContent = item.sucursal;
                template_suc.querySelector('.template_direccion').setAttribute("target", "_blank");
                template_suc.querySelector('.template_direccion').setAttribute("href", item.direccion);
                template_suc.querySelector('.template_municipio').textContent = item.municipio;
                template_suc.querySelector('.template_estado').textContent = item.estado;
                template_suc.querySelector('.btn_delete').dataset.id = item.id;
                template_suc.querySelector('.btn_update').dataset.id = item.id;

                const clone = template_suc.cloneNode(true);
                fragment.appendChild(clone);
            });
            container_suc.appendChild(fragment);
        }, 350); // Simular un //retraso para mostrar el progreso
    } else {
        list.innerHTML = `<div class="d-flex flex-column align-self-center m-5">
        <h4 class="fw-bold" >Sin Datos</h4>
        <span class="data_info material-symbols-outlined align-self-center">data_info_alert</span>
        <div>`;
    }

}


btn_despues.addEventListener('click', () => {
    loadNext();
});

async function loadNext() {
    try {
        const response = await getNext();
        const data = await response;
        // console.log(data);
        renderSuc(data);
    } catch (e) {
        throw new Error("Error fetching sucursales: " + e.message);
    }
}

btn_antes.addEventListener('click', () => {
    loadBefore();
});

async function loadBefore() {
    try {
        const response = await getBefore();
        const data = await response;
        // console.log(data);
        renderSuc(data);
    } catch (e) {
        throw new Error("Error fetching sucursales: " + e.message);
    }
}

btn_close_add.addEventListener('click', () => {
    limpiar_form(form_add, dialog_sucursal);
});
dialog_sucursal.addEventListener('cancel', () => {
    limpiar_form(form_add, dialog_sucursal);
});

btn_close_update.addEventListener('click', () => {
    limpiar_form(form_update, dialog_update);
});

dialog_sucursal.addEventListener('cancel', () => {
    limpiar_form(form_update, dialog_update);
});

function limpiar_form(form, dialog) {
    form.reset();
    dialog.close();

    for (const input of form) {
        if (!input.value) {
            remove_error(input);
        }
    }
}

const toogle_btn = () => {
    btn_login.classList.toggle("hidden");
    btn_logout.classList.toggle("hidden");
    btn_add.classList.toggle("hidden");
    content_list.classList.toggle("hidden");
    data_user.classList.toggle("hidden");
}

//cargar de info login
function init() {

    toogle_btn();

    id_user.innerHTML = `
    <span> ${currenUser.displayName} </span>
    `;
    // <img src="${currenUser.photoURL}" alt="User Avatar">

    loadSucusales();
}


//copiar datso para pase de lista
const f = document.getElementById('fecha');
f.innerText = moment().format('DD/MM/YYYY');


const texto = document.getElementById("texto");
const btn = document.getElementById("btn_copiar");

btn.addEventListener('click', () => {
    navigator.clipboard.writeText(texto.innerText);
});
