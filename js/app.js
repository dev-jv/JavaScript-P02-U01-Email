// Variables
const btnEnviar = document.querySelector('#enviar');
// const btnEnviarIcon = document.querySelector('.material-icons')
const btnReset = document.querySelector('#resetBtn')

const formulario = document.querySelector('#enviar-mail');

// Variables para los campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


const expRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
//Scope global

eventListeners();
function eventListeners(){
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', resetearForm);
}

// Funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50', 'text-white', 'bg-gray-500');

}

function validarFormulario(event){

    if(event.target.value.length > 0){
        
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        event.target.classList.remove('border-red-400');
        event.target.classList.add('border-teal-400');
    }
    else{
        // event.target.style.borderColor = 'lime';
        event.target.classList.remove('border-teal-400');
        event.target.classList.add('border-red-400');
        
        mostrarError('Todos los campos son necesarios!');
    }
    
    if(event.target.type === 'email'){

        if( expRe.test(event.target.value) ){

            const error = document.querySelector('p.error');
            if(error){ // No parece necesario, pero es la manera formal
                error.remove();
            }

            console.log('El email ingresado es aceptado');
            
            event.target.classList.remove('border-teal-400', 'text-gray-800', 'bg-gray-100', 'text-red-500', 'border-red-400')
            event.target.classList.add('text-gray-500', 'bg-teal-100', 'italic')

            // if(asunto.value !== '' && mensaje.value !== ''){
            
            //     btnEnviar.disabled = false;
            //     btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50', 'text-gray-500', 'bg-gray-500');
            //      btnEnviar.classList.add('text-teal-400');
            // }else{
            //     console.log('Aún no puedes enviar')
            // } // Mi forma de hacerlo
        
        }else{

            event.target.classList.remove('border-teal-400', 'text-gray-800');
            event.target.classList.add('border-red-400', 'text-red-500');
            mostrarError('Email inválido');
        }
    }

    if(asunto.value !== '' && mensaje.value !== '' && expRe.test(email.value)){
            activarBtn();
    }else{
        console.log('Aún no puedes enviar')
    } // La forma de habilitar Enviar

} 

function activarBtn(){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50', 'text-gray-500', 'bg-gray-500');
    btnEnviar.classList.add('text-teal-400');
}

function enviarEmail(event){


    event.preventDefault();

    const spinner = document.querySelector('#spinner')
    // Mostrar el Spinner
    spinner.style.display = 'flex';
    // console.log(spinner);

    // Después de 3 segundos ocultarlo
    setTimeout( () => {
        spinner.style.display = 'none';
        
        // Mensaje de - Se envió correctamente
        const mens = document.createElement('p');
        mens.textContent = 'Se envió correctamente!';
        mens.classList.add('text-center', 'text-gray-500', 'font-mono', 'text-lg', 'italic', 'env', 'p-2', 'h-9', 'mt-3', 'mb-3');

        const envios = document.querySelectorAll('env')

        //Insertarlo antes del spinner
        if(envios.length === 0){
        formulario.insertBefore(mens, spinner);
        // formulario.appendChild(men);
        }

        setTimeout( ()=> {
            mens.remove();
            formulario.reset();
            iniciarApp();

        }, 1000);

    }, 3000);
    


}


function resetearForm(){
    console.log('reset!')
    formulario.reset();
    iniciarApp();
}



function mostrarError(mensaj){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaj;
    mensajeError.classList.add('w-auto-inline-block', 'h-9', 'border', 'border-blue-200', 'background-color-100', 'text-blue-400', 'p-1','mt-3', 'bg-blue-100', 'text-center', 'error');

    const errores = document.querySelectorAll('.error'); //qSA retorna una collecion de elementos que contienen la clase error
    if(errores.length === 0){ // length sólo disponible para qSA 
        formulario.appendChild(mensajeError);
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10:nth-child(2)'));
        }
}
































