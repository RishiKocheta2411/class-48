class Game{
    constructor(){
        this.button = createButton('Start');
        this.title = createElement('h1'); 
    }

    handleStartButton(){
        this.button.mousePressed(()=>{
        this.button.hide();  
        this.title.hide();
            
        gameState="play"
        })
        
    }

   


    display(){
        this.button.position (width / 2 - 90, height / 2 - 20);
        this.button.class("Btn")

        this.title.position (width / 2 - 300, height /2 - 275 )
        this.title.html("Shooting Game")
        this.title.class("gameTitle")
    }
}