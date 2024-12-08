// Отримуємо елементи з HTML
const inputValue = document.getElementById('inputValue');
const addB = document.getElementById('addButton');
const sortName = document.getElementById('sortName');
const sortValue = document.getElementById('sortValue');
const del=document.getElementById('del');
const outputList = document.getElementById('outputList');
// Створюємо масив куди будуть записуватись введені дані
let dataOutput = [];
// множина для зберігання індексів виділених елементів
let selected = new Set();
// Для кнопки додати створюємо умови при її натисканні
addB.onclick = () => {
    // обрізаємо пробіли
    const input = inputValue.value.trim();
    if (!input.includes('=')) {
        inputValue.value = '';
        return
    }
    // Розбиваємо введену інформацію на ім'я та значення
    const [name, value] = input.split('=').map((str) => str.trim());
    // Додаємо отриману інформацію в масив
    dataOutput.push({name, value});
    // Очищуємо поле введення
    inputValue.value = '';
    action();
}
function action() {
    outputList.innerHTML = '';
    dataOutput.forEach((user, index) =>{
        // Створюємо елемент для відображення даних
        const userBlock = document.createElement('p');
        userBlock.innerText = `${user.name}=${user.value}`;
        userBlock.classList.add('item');
        // Відпрацювання кліку по елементу зі списка
        userBlock.addEventListener('click',() => {
            if (selected.has(index)) {
                selected.delete(index);
                userBlock.classList.remove('select')
            }else {
                selected.add(index);
                userBlock.classList.add('select')
            }
        })
        // Добавляємо елемент в список виводу
        outputList.appendChild(userBlock);
    })
}
// Сортування за ім'ям
sortName.addEventListener('click',  () =>{
    dataOutput.sort((a, b) => a.name.localeCompare(b.name));
    action()
})
// Сортування за значенням
sortValue.addEventListener('click',  () =>{
    dataOutput.sort((a, b) => a.value.localeCompare(b.value));
    action();
})
// Видалення обраних елементів
del.addEventListener('click', () => {
    dataOutput = dataOutput.filter((_,index)=>
    !selected.has(index));
    selected.clear();
    action();
})


