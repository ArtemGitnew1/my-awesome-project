// Элементы модального окна
const dialog = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActiveElement = null;

// Открытие модального окна
openBtn.addEventListener('click', () => {
    lastActiveElement = document.activeElement;
    dialog.showModal();
    // Фокусируемся на первом поле формы
    dialog.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модального окна
closeBtn.addEventListener('click', () => {
    dialog.close('cancel');
});

// Обработка отправки формы
form.addEventListener('submit', (e) => {
    // 1. Сбрасываем кастомные сообщения об ошибках
    Array.from(form.elements).forEach(element => {
        if (element.setCustomValidity) {
            element.setCustomValidity('');
        }
    });

    // 2. Проверяем валидность формы
    if (!form.checkValidity()) {
        e.preventDefault();

        // Показываем сообщения об ошибках
        form.reportValidity();

        // Подсвечиваем невалидные поля
        Array.from(form.elements).forEach(element => {
            if (element.willValidate) {
                element.toggleAttribute('aria-invalid', !element.checkValidity());
            }
        });
        return;
    }

    // 3. Успешная отправка (заглушка)
    e.preventDefault();
    alert('Форма успешно отправлена! Спасибо за обращение.');
    dialog.close('success');
    form.reset();
});

// Возвращаем фокус после закрытия модалки
dialog.addEventListener('close', () => {
    lastActiveElement?.focus();
});