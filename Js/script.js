"use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error===0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok){
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert("Ошибка отправки");
        form.classList.remove('_sending');
      }
    } else {
      alert('Заполните обязательные поля');
    }

  }


  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('_phone')) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        } 
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  // Функция валидации email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
    // Функция валидации телефона
    function phoneTest(input) {
      return !/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}/gm.test(input.value);
    }
});


// Меню бургер------------------------------------------------------
const burgerMenu = document.querySelector(".burger__icon");
const burgerClose = document.querySelector(".burger__close");
const burgerItem = document.querySelector(".burger__menu");
const burgerContacts = document.querySelector(".burger__footer");

if (burgerMenu) {
  const burger = document.querySelector(".burger");
  burgerMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("body-lock");
    burger.classList.toggle("burger-active");
  });
  burgerClose.addEventListener("click", function (e) {
    document.body.classList.toggle("body-lock");
    burger.classList.toggle("burger-active");
    e.preventDefault();
  });
  burgerItem.addEventListener("click", function (e) {
    document.body.classList.toggle("body-lock");
    burger.classList.toggle("burger-active");
  });
  burgerContacts.addEventListener("click", function (e) {
    document.body.classList.toggle("body-lock");
    burger.classList.toggle("burger-active");
  });
  burger.addEventListener("click", function (e) {
    if (!e.target.closest(".burger__body")) {
      document.body.classList.toggle("body-lock");
      burger.classList.toggle("burger-active");
    }
  });
}

// Обработка ссылок с data-goto, чтобы в адресной строке не было ничего лишнего.
const Links = document.querySelectorAll(".link[data-goto]");
if (Links.length > 0) {
  Links.forEach((Links) => {
    Links.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const Links = e.target;
    if (Links.dataset.goto && document.querySelector(Links.dataset.goto)) {
      const gotoBlock = document.querySelector(Links.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
      // - document.querySelector('header').offsetHeight
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}