// Элементы модального окна
const dialog = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActiveElement = null;
openBtn.addEventListener('click', () => {
    lastActiveElement = document.activeElement;
    dialog.showModal();
    // Фокусируемся на первом поле формы
    dialog.querySelector('input, select, textarea, button')?.focus();
});
closeBtn.addEventListener('click', () => {
    dialog.close('cancel');
});
form.addEventListener('submit', (e) => {
    Array.from(form.elements).forEach(element => {
        if (element.setCustomValidity) {
            element.setCustomValidity('');
        }
    });
    if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        Array.from(form.elements).forEach(element => {
            if (element.willValidate) {
                element.toggleAttribute('aria-invalid', !element.checkValidity());
            }
        });
        return;
    }
    e.preventDefault();
    alert('Форма успешно отправлена! Спасибо за обращение.');
    dialog.close('success');
    form.reset();
});
dialog.addEventListener('close', () => {
    lastActiveElement?.focus();
});