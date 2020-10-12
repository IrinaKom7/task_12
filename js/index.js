// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightInput = document.querySelector('.minweight__input'); // поле для ввода минимального веса
const maxWeightInput = document.querySelector('.maxweight__input'); // поле для ввода максимального веса


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    //Создадим элемент li и присвоим ему класс fruit__item
    let li = document.createElement('li');
    li.className = "fruit__item";
    //дополним класс цветом
    switch(fruits[i].color){ 
      case "фиолетовый":
        li.className += ' fruit_violet';
        break;
      case "зеленый":
        li.className += ' fruit_green';
        break;
      case "розово-красный":
        li.className += ' fruit_carmazin';
        break;
      case "желтый":
        li.className += ' fruit_yellow';
        break;
      case "светло-коричневый":
        li.className += ' fruit_lightbrown';
        break;
      default:
        li.className += ' fruit_black';
    };
  //добавим в li внутреннюю структуру с параметрами текущего фрукта
  li.innerHTML = "<div class=\"fruit__info\">" +
    "<div>index: " + i + "</div>" + 
    "<div>kind: " + fruits[i].kind + "</div>" + 
    "<div>color: " + fruits[i].color + "</div>" + 
    "<div>weight: " + fruits[i].weight + "</div>" + 
    "</div>";
  //поместим новый li в код fruitsList
  fruitsList.append(li); 
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  //скопируем исходный массив фруктов
  const  fruits_old  = [...fruits];

  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    
    //генерируем случайный индекс от 0 до индекса последнего элемента 
    let fruit_rnd_index = getRandomInt(0, fruits.length - 1);
    //добавим фрукт со случайным индексом в новый массив
    result.unshift(fruits[fruit_rnd_index]);
    //удалим фрукт с этим индексом из старого массива
    fruits = fruits.filter((el,index) => index !== fruit_rnd_index);

  }

  //v2
  // const result = fruits.reduce((result, fruit) => {
  //   let fruit_rnd_index = getRandomInt(0,fruits.length - 1);
  //   result.unshift(fruits[fruit_rnd_index]);
  //   fruits = fruits.filter((el,index) => index !== fruit_rnd_index);
  //   return result;
  // }, [])
  
  //новый порядок фруктов запишем в массив fruits
  fruits = result;
  //проверим, что все элементы fruits_old совпадают с элементами с тем же индексом из массива fruits
  const not_shuffled = fruits.every((element, index) =>  element == fruits_old[index]);
  //если да - алерт
  if(not_shuffled){
    alert ('Порядок не изменился!')
  };  
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

//Получим массив уникальных весов фруктов
const fruitsWeight = [...new Set(fruits.map(el => el.weight))];
var minWeight = 1;
var maxWeight = 100;
// фильтрация массива
const filterFruits = () => {
  return fruits.filter((item) => {
    return item.weight >= minWeight && item.weight <= maxWeight;
  });
};

filterButton.addEventListener('click', () => {
  if (minWeightInput.value != "" && maxWeightInput.value !="" ) {
  // запомним введенное пользователем минимальное значение в переменной
  minWeight = parseInt(minWeightInput.value);
  // запомним введенное пользователем максимальное значение в переменной
  maxWeight = parseInt(maxWeightInput.value);
  //фильтруем
  fruits = filterFruits();
  display();
  } else {
    alert ('Введите min и max weight')
  };
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const priorityColor = {
  "фиолетовый": 3,
  "зеленый": 2,
  "розово-красный": 0,
  "желтый": 1,
  "светло-коричневый": 4
};

const comparationColor = (fruit1, fruit2) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return priorityColor[fruit1.color] > priorityColor[fruit2.color];  
  //fruit1 и fruit2 это структура вида fruit: {kind: "Мангустин", color: "фиолетовый", weight: 13}
};

function quickSort_main(items,  comparation, left, right) {
// функция разделитель
  function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
    while (i <= j) {
//        while (items[i] < pivot) {
        while (comparation(pivot, items[i])) {
            i++;
        }
//        while (items[j] > pivot) {

        while (comparation(items[j], pivot)) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
  }; 

    function swap (items, firstIndex, secondIndex) {
      const temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
    };

    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
          quickSort_main(items, comparation, left, index - 1);
        }
        if (index < right) {
          quickSort_main(items, comparation, index, right);
        }
    }
  return items;
};

const sortAPI = {
  bubbleSort(arr, comparation) { 
    // arr - массив, который нужно
    // отсортировать по возрастанию.
     const n = arr.length;
     // внешняя итерация по элементам
     for (let i = 0; i < n-1; i++) { 
         // внутренняя итерация для перестановки элемента в конец массива
         for (let j = 0; j < n-1-i; j++) { 
             // сравниваем элементы
             if (comparation(arr[j], arr[j+1])) { 
                 // делаем обмен элементов
                 let temp = arr[j+1]; 
                 arr[j+1] = arr[j]; 
                 arr[j] = temp; 
             }
         }
     }                    
  },


  // алгоритм быстрой сортировки
  quickSort(items, comparation, left, right) {
    quickSort_main(items,  comparation, left, right);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    sortTimeLabel.textContent = sortTime;
  }
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // !!!! открыть позже 
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
  // if (sortKind === 'bubbleSort')
  // then {sortKind = 'quickSort'}
  // else {sortKind = 'bubbleSort'};

  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  let newFruit = {};
  w = parseInt(weightInput.value);

  if (kindInput.value != "" && colorInput.value && w) {

    newFruit.kind = kindInput.value;
    newFruit.color = colorInput.value;
    newFruit.weight = w;
    fruits.push(newFruit);

 } else {

   alert ('Заполните все поля')
 };

  //{"kind": "Мангустин", "color": "фиолетовый", "weight": 13},

  //result.unshift(fruits[fruit_rnd_index]);
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
