/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createDiv() {
  const width = document.body.clientWidth / 2;
  const div = document.createElement('div');

  div.classList.add('draggable-div');
  div.style.width = `${random(width, 10)}px`;
  div.style.height = `${random(width, 10)}px`;
  div.style.top = `${random(width, 10)}px`;
  div.style.left = `${random(width, 10)}px`;
  div.style.backgroundColor = `#${Math.random().toString(16).slice(3, 9)}`;
  homeworkContainer.appendChild(div);

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', () => createDiv());

console.log(addDivButton);
