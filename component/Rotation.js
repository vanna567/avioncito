//Rotación del terreno
AFRAME.registerComponent("tearrain-rotation-reader",{
    schema:{
        speedRotation:{type:"number", default:0},
    },
    
    init:function(){
         window.addEventListener("keydown", (e) => {
            if(e.key === "ArrowRight"){
                if(this.data.speedRotation < 0.1){
                    this.data.speedRotation += 0.01;
                }
            } else if (e.key === "ArrowLeft"){
                if(this.data.speedRotation > 0.1){
                    this.data.speedRotation -= 0.01;
                }
            }
  
         });
    },

    tick: function(){
        var mapRotation = this.el.getAttribute("rotation");
        mapRotation.y += this.data.speedRotation;

        this.el.setAttribute("rotation",{
            x:mapRotation.x,
            y:mapRotation.y,
            z:mapRotation.z
        });
    },
    
});
//Rotación del avión
AFRAME.registerComponent("plane-rotation-reader", {
    schema:{
        speedRotation:{type:"number", default: 0},
        speedAscent:{type:"number", default: 0}
    },
    init: function(){
        window.addEventListener("keydown",(e) => {
            //Obtener info de los atributos
            this.data.speedRotation = this.el.getAttribute("rotation");
            this.data.speedAscent = this.el.getAttribute("position");

            var planeRotation = this.data.speedRotation;
            var planePosition = this.data.speedAscent;

            //controlar el ascenso y descenso con flechas del teclado
            if(e.key === "ArrowRight"){
                if(planeRotation.x > 10){
                    planeRotation.x += 0.5;
                    this.el.setAttribute("rotation", planeRotation);
                }
            }
            if(e.key === "ArrowLeft"){
                if(planeRotation.x > -10){
                   planeRotation.x -= 0.5;
                   this.el.setAttribute("rotation", planeRotation);
                }
            }
            if (e.key === "ArrowUp") {
                 if (planeRotation.z < 20) {
                     planeRotation.z += 0.5;
                      this.el.setAttribute("rotation", planeRotation);
                     } if (planePosition.y < 2) {
                         planePosition.y += 0.01;
                          this.el.setAttribute("position", planePosition);
                         }
            }
             if (e.key === "ArrowDown") {
                 if (planeRotation.z > -10) {
                     planeRotation.z -= 0.5;
                      this.el.setAttribute("rotation", planeRotation);
                     } if (planePosition.y > -2) {
                         planePosition.y -= 0.01;
                          this.el.setAttribute("position", planePosition);
                         }
           }
        })
    }
})