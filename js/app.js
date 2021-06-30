
//constructor
function Insurance(brand, year, type){
    this.brand = brand;
    this.year = year;
    this.type = type;
}

Insurance.prototype.quote = function(){
    let quantity;
    const base = 2000;

    switch(this.brand){
        case '1': quantity = base * 2.15;
            break;
        case '2': quantity = base * 2.07;
            break;
        case '3': quantity = base * 3.14;
            break;
        case '4':
            break;
        default: alert("Error!!");
    }

    const difference = new Date().getFullYear() - this.year;
    quantity -= ((difference * 2) * quantity) / 100;

    if (this.type === 'basico') {
        quantity *= (25 / 100);
    } else {
        quantity *= (45 /100);
    }

    return quantity;
}

function UI() {}

UI.prototype.fill_options = () =>{
    const max = new Date().getFullYear();
    const min = max - 20;
    const select_year = document.querySelector('#year');

    for(let i=min; i<max; i++){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select_year.appendChild(option);
    }
}

UI.prototype.show_message = (message, type) =>{
    const div_message = document.querySelector('#message');
    div_message.style.display = 'block';

    if (type === 'error')
        div_message.classList.add('message','error');
    else
        div_message.classList.add('message','right');

    div_message.classList.add('mt-10');
    div_message.innerHTML = message;

    setTimeout( () =>{
        div_message.style.display = 'none';
    },3000);
}

UI.prototype.show_result = (total, insurance) =>{
    const div = document.createElement('div');
    const result = document.querySelector('#result');
    const spinner = document.querySelector('#loading');
    const {brand, year, type} = insurance;
    let text_brand;

    switch (brand){
        case '1': text_brand = "Americano";
            break;
        case '2': text_brand = "Asiatico";
            break;
        case '3': text_brand = "Americano";
            break;
    }

    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Resumen: </p>
        <p class="font-bold">Marca: <span class="font-normal"> ${text_brand}</span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Tipo de seguro: <span class="font-normal capitalize"> ${type}</span></p>
        <p class="font-bold">Total: <span class="font-normal"> $${total}</span></p>
    `;

    spinner.style.display = 'block';

    setTimeout( () =>{
        spinner.style.display = 'none';
        result.appendChild(div);
    },3000);
        
}

const ui = new UI();


document.addEventListener('DOMContentLoaded', () =>{
    ui.fill_options();
    eventListeners();
});

function eventListeners(){
    const form = document.querySelector('#quote_insurance');
    form.addEventListener('submit',quote_insurance);
}

function quote_insurance(e){
    e.preventDefault();
    
    const brand = document.querySelector('#brand').value;
    const year = document.querySelector('#year').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const result = document.querySelector('#result div');

    if(brand === '- Seleccionar -'){
        ui.show_message('Todos los campos son obligatorios','error');
        return;
    }
    
    ui.show_message('Cotizando...','right');

    if (result != null)
        result.remove();

    const insurance = new Insurance(brand, year, type);
    ui.show_result(insurance.quote(),insurance);

        
}