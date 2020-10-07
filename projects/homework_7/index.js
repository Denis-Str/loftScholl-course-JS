/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const cookiesData = parseCookie();
renderCookieData();

filterNameInput.addEventListener('input', function (e) {
  updateFilter(e.target.value);
});

addButton.addEventListener('click', () => {
  const cookieName = addNameInput;
  const cookieValue = addValueInput;

  for (const cookie in cookiesData) {
    if (cookie === cookieName.value) {
      cookiesData[cookie] = cookieValue.value;
      document.cookie = `${cookieName.value}=${cookieValue.value}`;
      window.location.reload();
      return renderCookieData();
    }
  }
  listTable.appendChild(renderRowTable(cookieName.value, cookieValue.value));
  document.cookie = `${cookieName.value}=${cookieValue.value}`;
  window.location.reload();
  return renderCookieData();
});

listTable.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target;
  const cookieName = target.parentElement.parentElement.firstElementChild.textContent;
  const date = new Date(0);
  for (const cookie in cookiesData) {
    if (cookie === cookieName) {
      document.cookie = `${cookieName}=; path=/; expires=" ${date.toUTCString()}`;
    }
  }
  if (target.tagName === 'BUTTON') {
    target.parentElement.parentElement.remove();
    window.location.reload();
  }
});

function parseCookie() {
  return document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
}

function renderCookieData() {
  listTable.innerHTML = '';
  for (const cookie in cookiesData) {
    listTable.appendChild(renderRowTable(cookie, cookiesData[cookie]));
  }
  return listTable;
}

function renderRowTable(name, value) {
  const fragment = document.createDocumentFragment();
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${name}</td>
      <td>${value}</td>
      <td><button>delete</button></td>
    `;
  return fragment.appendChild(row);
}

function updateFilter(filterValue) {
  listTable.innerHTML = '';
  if (!filterValue) {
    return window.location.reload();
  }
  for (const cookie in cookiesData) {
    if (filterValue && isMatching(cookie, filterValue)) {
      listTable.append(renderRowTable(cookie, cookiesData[cookie]));
    }
  }
  return listTable;
}

function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}
