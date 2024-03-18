document.addEventListener('DOMContentLoaded', function (){ loadedApp();}
);


function loadedApp(){
    CreatedGallery();
    ScrollNav();
    navegacionFija();
} 
function navegacionFija(){
    const barra = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");

    window.addEventListener("scroll", function(){
       

        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add("fijo");
            barra.classList.add("body-scroll");
        }
        else{
            barra.classList.remove("fijo");
            barra.classList.remove("body-scroll");
        }


    });
}

function ScrollNav(){
    const enlaces = document.querySelectorAll(".navegacion-principal a");


    enlaces.forEach(enlace=> {
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);

            seccion.scrollIntoView({behavior: 'smooth' });
        });
    });

}

function CreatedGallery(){
    const gallery = document.querySelector(".galeria-imagenes");


    
    for(let i=1 ;i<=12;i++){
        const image = document.createElement("picture");
        image.innerHTML =`
            <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
            <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
            <img
                loading="lazy"
                width="200"
                height="300"
                src="build/img/thumb/${i}.jpg"
                alt="imagen thumb"
            />`;

       image.onclick = function(){
        showImage(i);
       }


       gallery.appendChild(image);
    } 

  


}
function showImage(id)
{
    const image = document.createElement("picture");
    image.innerHTML =`
        <source srcset="build/img/grande/${id}.avif" type="image/avif" />
        <source srcset="build/img/grande/${id}.webp" type="image/webp" />
        <img
            loading="lazy"
            width="200"
            height="300"
            src="build/img/grande/${id}.jpg"
            type="image/jpg"
            alt="imagen grande"
        />`;

      
       //created image
       const Overlay = document.createElement("DIV");
       Overlay.appendChild(image);
       Overlay.classList.add("overlay");

       //remove overlay by click outsidde
       Overlay.onclick = function(){
        Overlay.remove(Overlay);
         const body = document.querySelector("body");
        body.classList.remove("fix-body");
       
       }
        //cerated close button
       const closemodal= document.createElement("P");
       closemodal.textContent = "X";
       closemodal.classList.add("btn-close");


       //close modal with button
       Overlay.appendChild(closemodal);

       closemodal.onclick = function(){

        Overlay.remove(closemodal);

        const body = document.querySelector("body");
        body.classList.remove("fix-body");
       }
       



        //adds image
       const body = document.querySelector("body");
       body.appendChild(Overlay);
       body.classList.add("fix-body");
}