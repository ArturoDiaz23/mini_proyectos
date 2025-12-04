export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const progress = (parent) => {
    let progress = document.createElement('md-circular-progress');
    progress.setAttribute('indeterminate', '');
    progress.setAttribute('style', 'margin: 100px auto;');
    parent.appendChild(progress);
}

export const add_error = (parent, msn) => {
    parent.setAttribute('error', '');
    parent.setAttribute('error-text', msn);
}

export const remove_error = (parent) => {
    parent.removeAttribute('error');
    parent.removeAttribute('error-text');
}

export const toast = (msn, type) => {
    Toastify({
        text: msn,
        duration: 4000,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            // --success, --warning, --danger
            background: type === "success" ? 'var(--success)' : 'var(--danger)'
        }
    }).showToast();
}