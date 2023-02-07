const header = document.querySelector('.header');   //contenedor del header
const buttonInputSearch = document.querySelector('.button-search');
const asideContainer = document.querySelector('.navigation-bar');//contenedor del Aside
const listBlackContainer = document.querySelector('.list-black-container');//contenedor de todo el main
const buttonAside = document.querySelector('.button__bar-options');//boton para la barra lateral derecha
const buttonAddEnemy = document.querySelector('.add');//boton de añadir un enemigo
const buttonDeleteEnemy = document.querySelector('.delete');//boton eliminar un enemigo
const buttonSearch = document.querySelector('.search');//boton buscar un enemigo
const searchInput = document.querySelector('.search-enemy');//input de tipo search
const containerForm = document.querySelector('.container-form');//container formulario
const form = document.querySelector('.form-set-datos');//form
const nameEnemy = document.querySelector('.name-enemy');//input-name
const infoEnemy = document.querySelector('.data-enemy');//input-info
const setImage = document.querySelector('.set-img');//input-image
const preview = document.querySelector('.preview');//se mostrara aqui la previsualización de la img
const buttonSubmit = document.querySelector('.submit');//envia los datos del formulario
const buttonTrash = document.querySelector('.trash');//boton para eliminar cantidad de enemigos
/* ELEMENTOS CREADOS */
const image = document.createElement('IMG');//nueva img, se alamacena la img de la previzualizacion
const divList = document.createElement('DIV');//se almacenan todas las listas que creemos
divList.classList.add('enemy');
/* OBJETOS DE ALERTAS EN EL FORMULARIO */
const alertName = document.querySelector('.alert-name');//alert si no se coloca un nombre
const alertData = document.querySelector('.alert-data');//alert si no se coloca datos
const alertImage = document.querySelector('.alert-image');//alert si no se coloca iamgen
/*Variables*/
let srcImage = '';//se guarda el src de la img que ingresemos
let dataEnemy = [];
let arrayEnemys = [];//array para guardare todos los enemigos
//abre la barra lateral
const openAside =()=>{
    asideContainer.classList.toggle('open__bar');
}
///oculta el form y a la vez muestra el header y abre o cierra el aside
const mostrarOcultar=()=>{  
    containerForm.style.display = 'none';  
    header.style.top = "0";
    openAside();
}
const keyEsc =(e)=>{//al apretar esc se cierra el form solo si el form esta abierto
    if(e.key == 'Escape'){
        mostrarOcultar();
        removeEventListener('keydown',keyEsc);//se remueve el evento tras apretar una vez
     };
}
//añade un enemigo a la lista
const addEnemy=()=>{
    openAside();
    header.style.top = "-80px";
    containerForm.style.display = 'flex';
    moverModalDelete('none')
    addEventListener('keydown',keyEsc);//inicia el evento de apretar la tecla esc
}
const addDataEnemy=(name,image,data)=>{//añade los datos a un array y los muestra ene pantalla
    const divItem = document.createElement('div');
    const modalDelete = document.createElement('div');
    modalDelete.classList.add('modal-delete');
    const inputCheckBox = document.createElement('input');
    inputCheckBox.type = 'checkbox';
    inputCheckBox.classList.add('check-delete','check-click');
    modalDelete.appendChild(inputCheckBox);
    divItem.classList.add('divlist');
    divItem.innerHTML = `
        <div class="enemy-logo">
            <img src="${image}" alt="" class="img-enemy">
        </div>
        <section class="list-item">
            <h4>${name}</h4>
            <textarea class="info">${data}</textarea> 
        </section>`
    ;
    divItem.appendChild(modalDelete);
    divList.appendChild(divItem);
    let enemy = [name,image,data];
    arrayEnemys.push(enemy);
    //divItem.classList.add(`${arrayEnemys.length}`);
    listBlackContainer.appendChild(divList);
}
//eliminar los datos del array que almacena los datos de la persona
const delDataArray=(array)=>{
    let i = 0;
    for(el in arrayEnemys){
        if(parseInt(el + 1) != array[i]){
           newArray.push(arrayEnemys[el])
        }else{
            i++;
        }
    }
    console.log(arrayEnemys);
}
//elimina n cantidad de enemigos
const delCantEnemy=()=>{
    const enemy = document.querySelector('.enemy');
    let enemyChildren = enemy.children;
    for(en in enemyChildren){
        if(enemyChildren[en].lastElementChild.firstElementChild.checked == true){
            enemy.removeChild(enemyChildren[en]);
            //delDataArray();
        }
    }
}
const moverModalDelete=(display)=>{
    const modal = document.querySelectorAll('.modal-delete');//selecciona el elemento modal 
    for (m of modal){
        m.style.display= `${display}`;
        m.firstElementChild.checked = false;
    }
}
//salta seccion para eliminar un enemigo
const deleteEnemy=()=>{
    if(arrayEnemys.length > 0){
        moverModalDelete("flex")
        openAside();
        buttonTrash.style.display = 'block';
        buttonTrash.addEventListener('click',delCantEnemy);
    }else{
        alert('no hay nada pa eliminar');
    }
}
//buscar enemigo
const searchEnemy=()=>{

}
//Validar formulario
const validarForm=()=>{
    let addEnemy = false;
    let c = 0;
    if(nameEnemy.value.trim() == '')   alertName.style.display = 'block' 
    else {alertName.style.display = 'none'; c++};
    if(infoEnemy.value.trim() == '')   alertData.style.display = 'block'
    else {alertData.style.display = 'none'; c++};
    if(srcImage == '')   alertImage.style.display = 'block';
    else {alertImage.style.display = 'none'; c++};

    if(c == 3){ addEnemy = true}
    return addEnemy;
}
//carga el src de la imagen que se añada
const readDataImg = (e)=>{
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('load',()=>{ 
        preview.innerHTML = '';
        image.src = reader.result;
        srcImage = reader.result;
        image.classList.add('style-img');
        preview.appendChild(image);
        alertImage.style.display = 'none';
    });
}
//EVENTOS
buttonAside.addEventListener('click',openAside);//abre el aside
buttonAddEnemy.addEventListener('click',addEnemy);//muesrta un form para añadir un enemigo
setImage.addEventListener('change',readDataImg);
buttonDeleteEnemy.addEventListener('click',deleteEnemy);//elimina un enemigo solo si hay 
buttonSearch.addEventListener('click',searchEnemy);//busca enemigo

buttonSubmit.addEventListener('click', (e)=>{//registra los datos del enemigo que le enviemos por un form
    e.preventDefault();
    if(validarForm()){
        dataEnemy = [nameEnemy.value , srcImage, infoEnemy.value];
        srcImage = '';
        preview.removeChild(image);
        mostrarOcultar();
        divList.style.display = 'flex';
        addDataEnemy(dataEnemy[0],dataEnemy[1],dataEnemy[2]);
        form.reset();    
    }
});