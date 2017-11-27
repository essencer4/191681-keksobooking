/* Как мы это будем делать

<div class="pool pool-1">
  <div class="el el-1"><span>0</span></div>
  <div class="el el-2"><span>1</span></div>
  <div class="el el-3"><span>2</span></div>
  <div class="el el-4"><span>3</span></div>
  <div class="el el-5"><span>4</span></div>
  <div class="el el-6"><span>5</span></div>
</div>

<div class="pool pool-2">

</div>

Для начала создадим переменные-коллекции.

var pools = document.querySelectorAll('.pool'); //здесь будут контейнеры (два дива (pool-1, pool-2), которые содержат дивы-блоки)
var blocks = document.querySelectorAll('.el'); //здесь будут дивы-блоки, которые мы будем перемещать

//Отсоединение или удаление DOM-элемента

Используется метод removeChild

pools[0].removeChild(blocks[0]); //в первом элементе массива pool удаляется первый элемент массива blocks

Элемент отсоединен, но он сохранился в коллекции blocks - он по прежнему первый в ней.

//Добавление DOM-элемента

Используется метод appendChild. Добавление отсоединенного элемента во второй контейнер.

pools[1].appendChild(blocks[0]);

appendChild добавляет элемент в конец указанного.

insertBefore - добавляет элемент в произвольное место.

pools[1].insertBefore(blocks[3], blocks[0]); // первый параметр это что передаем, второй - перед каким элементом.

2__4__5

1__3__0

Если вторым параметром передать null, то добавляемый элемент встанет в конец блока

pools[1].insertBefore(blocks[2], null);

4__5

1__3__0__2

//Замена одного элемента другим

Используется метод replaceChild

pools[0].replaceChild(blocks[2], blocks[4]); //первый параметр это что заменяем, второй - на место чего мы ставим элемент из первого параметра.

2__5

1__3__0

replaceChild возвращает значение — элемент, который был заменен в результате операции. Это нужно для того, чтобы с этим элементом можно было производить дальнейшие действия

pools[0].appendChild(replaced);

2__5__4

1__3__0

//Копирование элементов

Используется метод cloneNode

Он копирует только саму ноду - без элементов внутри него (текстовая нода например не копируется)

pools[0].appendChild(blocks[0].cloneNode());

2__5__4__|_| // |_| - такая же нода как и все, но без числа внутри.

1__3__0

С параметром true происходит глубокое или полное копирование элемента

pools[0].appendChild(blocks[0].cloneNode(true));

2__5__4__|_|__0

1__3__0

//Тэг template

Зачастую, чтобы создавать элементы по образу и подобию (на основе шаблона), используют специальный элемент в верстке, из которого можно копировть структуру и заполнять её необходимыми данными. Для этих целей служит тег template

<template id="element-template">
  <div class="el el-1">
    <span><!--Номер элемента--></span>
  </div>
</template>

У этого элемента есть всего одно свойство content, которое хранит элемент DocumentFragment всего содержимого

var pools = document.querySelectorAll('.pool');
var template = document.querySelector('#element-template');
for (var i = 0; i < 6; i++) {
  var element = template.content.cloneNode(true);
  element.children[0].textContent = i;
  pools[1].appendChild(element);
}

// Сравнение элементов

Метод contains позволяет узнать, содержится DOM-элемент внутри или нет

if (pools[1].contains(blocks[0])) {
  pools[1].style.backgroundColor = 'rgba(30, 0, 0, 0.2)';
}

compareDocumentPosition - еще один метод, который сравнивает положение текущего узла с другим узлом в любом другом документе.

var head = document.getElementsByTagName('head').item(0);
if (head.compareDocumentPosition(document.body) & Node.DOCUMENT_POSITION_FOLLOWING) {
  console.log("well-formed document");
} else {
  console.log("<head> is not before <body>");
}

//////////////////////////////////////////////////////////////////////

В DOM-дереве всегда есть "корневой объект". В DOM-дереве этим объектом является объект document.

console.log(document);
console.dir(document, 1);

Кроме свойств самого объекта, DOM-объект хранит в себе информацию о родительском элементе — свойство parentElement (parentNode), о своих соседних элементах previousElementSibling (previousSibling) и nextElementSibling (nextSibling) и о элементах, расположенных внутри него children (childNodes)

console.log(document.parentElement);
console.dir(document.children, 1);

Структура данных, в которой хранятся дети children очень похожа на массив — у нее есть индексы и поле length. Поэтому для простоты мы будем называть её массив, но важно помнить, что на самом деле это не настоящий массив

for (var i = 0; i < document.children.length; i++) {
  console.log(document.children[i]);
}

Управление элементами DOM-дерева происходит через чтение или изменение нужного элемента. Например, чтобы узнать имя текущего элемента, нужно обратиться к свойству tagName или nodeName. По соглашению, для HTML-документов имя тега всегда возвращается написанное прописными (заглавными) буквами, поэтому важно не забывать приводить к общему написанию строки при сравнении

for (var i = 0; i < document.children.length; i++) {
  var child = document.children[i];
  console.log('Имя элемента ' + i + ': ' + child.tagName);
  console.log('Этот элемент HTML: ' + (child.tagName.toLowerCase() === 'html'));
}

Зная, как связаны между собой элементы, мы можем вывести нашу структуру произвольного документа в консоль

var html = document.children[0];
for (var i = 0; i < html.children.length; i++) {
  var child = html.children[i];
  console.log(child.tagName.toLowerCase());
  for (var j = 0; j < child.children.length; j++) {
    var innerChild = child.children[j];
    console.log('|---' + innerChild.tagName.toLowerCase());
  }
}

Выведет это:

log: "head"
log: "|---base"
log: "|---meta"
log: "|---title"
log: "|---script"
log: "|---link"
log: "body"
log: "|---h1"
log: "|---script"
log: "|---div"

Перемещение по DOM-дереву с помощью атрибутов можно производить двумя способами. Для этого у каждого DOM-узла существует парный набор атрибутов, например children и childNodes: оба этих атрибута содержат вложенные элементы, но children содержит только элементы, например HTML- и SVG-теги, а childNodes все возможные узлы — тексты, комментарии и пр. Мы сфокусируемся на методах и атрибутах для работы именно с HTML-документами

console.dir(document.body.children, 1);
console.dir(document.body.childNodes, 1);

/////////////////////////////////////////////////////////////////////////////

Проверка скиллов

1. Выведите тег третьего элемента в "head".

Сначала переходим в некий неизвестный элемент через .children[0], потом переходим в head через второй .children[0], и наконец указываем третий элемент в head который title через .children[2]

.tagName - параметр элемента в котором лежит имя

.toLowerCase() - переводим поулченный текст в строчны вариант

console.log('Выведите тег третьего элемента в "head": ' +  document.children[0].children[0].children[2].tagName.toLowerCase());

log: "Выведите тег третьего элемента в "head": title"

2. "Выведите тег первого элемента в "body"

console.log('Выведите тег первого элемента в "body": ' + document.children[0].children[1].children[0].tagName.toLowerCase());

log: "Выведите тег первого элемента в "body": h1"

///////////////////////////////////////////////////////////////////////////

Понятно, что работать так со вложенными элементами DOM очень неудобно. Поэтому для поиска элементов в DOM есть специальные методы у объекта document:

getElementById — находит конкретный элемент по аттрибуту id
querySelector — находит первый элемент, совпавший по CSS-селектору
querySelectorAll — находит все элементы, совпадающие по CSS-селектору

//html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <script src="https://zeckson.github.io/demo-console/2.2.1/index-silent.min.js"></script>
</head>
<body>
<h1 id="firstDiv" class="page-title">Document Object Model</h1>

</body>
</html>

//js
var firstDiv = document.children[0].children[1].children[0];
console.log(firstDiv.tagName);
console.log(firstDiv === document.getElementById('firstDiv'));
console.log(firstDiv === document.querySelector('.page-title'));

//console
log: "H1"
log: true
log: true



Для управления атрибутами DOM-дерева можно пользоваться специальными методами getAttribute и setAttribute. Метод getAttribute возвращает значение указанного атрибута элемента, а setAttribute добавляет новый атрибут или изменяет значение существующего атрибута элемента по его названию в HTML

var pageHeading = document.querySelector('h1'); // находим первый элемент по css-седектору
pageHeading.setAttribute('style', 'background: red;'); // присваиваем ему красный цвет
console.log(pageHeading.getAttribute('class')); выводим в консоль указаный атрибут ('class'), т.е. в нашем случае css-класс

var pageHeading = document.querySelector('h2');
pageHeading.setAttribute('style', 'background: green;');
console.log(pageHeading.getAttribute('class'))

///////////////////////////////////////////////////////////////////////////

Для того чтобы получить содержимое DOM-элемента, у нас есть свойства innerHTML и textContent

var description = document.querySelector('p');
console.log(description.innerHTML);   // возвращает всю разметку
console.log(description.textContent); // возвращает только текстовое содержимое

document.querySelector('b').textContent = "Владимир Путин";

Чтобы избежать ненужных обновлений страницы, существуют специальные методы, которые позволяют вставить текст или разметку точечно — insertAdjacentHTML, insertAdjacentText

var heroName = document.querySelector('b');
heroName.textContent = 'Кощей Бессмертный';
document.body.insertAdjacentHTML('afterbegin', '<h1>Привет!</h1>');
heroName.textContent = 'Баба Яга';

*/

// Переменные-константы и массивы || Основные статичные данные

var numberOfLocations = 8; // число локаций-зданий или js-объектов

var TITLE_ARRAY = [ // имена объектов-зданий
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPE_ARRAY = [ // типы объектов-зданий
  'flat',
  'house',
  'bungalo'
];

var TIME_ARRAY = [ // временные значения для заезда и выезда
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES_ARRAY = [ // различные опции заказа
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// Функции || Первичное вычисление динамических данных

var getRandomNumber = function (min, max) { // функция по возвращению рандомного числа от min до max включительно
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomPriece = getRandomNumber (1000, 1000000); // вычисление рандомного прайса от 1000 до 1000000

var getRandomRooms = getRandomNumber (1, 5); // вычисление рандомного числа комнаn от 1 до 5

var getRandomX = getRandomNumber (300, 900); // вычисление рандомного числа координаты X

var getRandomY = getRandomNumber (100, 500); // вычисление рандомного числа координаты Y

// Склейка объектов в итоговый массив

var JS_OBJECTS - []; // создаем пустой массив

// Создаем цикл для создания этих объектов-локаций в виде объектов для массива JS_OBJECTS


