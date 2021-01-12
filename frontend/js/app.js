let app = {

    //=============================================================INIT APP============================================================================

    init()
    {
        app.gameReview();
        app.addGame();
        app.selectList();
        app.createNewGame();
        app.listPlatform();

    },

  

    //==============================================================SEE   GAME====================================================================
    gameReview()
    {
        let select = document.querySelector("select");
        select.addEventListener("input",app.seeReview);
    },

    seeReview()
    {
        let select = document.querySelector("select");
        let gameId = select.value;
        fetch("http://localhost/s07/parcours/s07-parcours-air-one-x/backend/public/videogames/"+gameId).then(app.returnResponse).then(app.getReview);
        
    },

    returnResponse(response)
    {
        return response.json();
    },

    getReview(response)
    {
        console.log(response);
        if(response[2].length<1)
        {
            alert('Le jeux ne dispose pas encore de critiques');
        }
       response[2].forEach(element =>{
        let template = document.querySelector("#reviewTemplate");
        let clone = document.importNode(template.content,true);

        let titleTemplate = clone.querySelector(".reviewVideogame");
        titleTemplate.textContent = element.title;
        

        let editorTemplate = clone.querySelector(".reviewEditor");
        editorTemplate.textContent = response[0].editor;
        

        let platformTemplate = clone.querySelector(".reviewPlatform");
        platformTemplate.textContent = response[1].name;

        let authorTemplate = clone.querySelector(".reviewAuthor");
        authorTemplate.textContent = element.author;

        let dateTemplate = clone.querySelector(".reviewPublication");
        dateTemplate.textContent = element.created_at;

        let textTemplate = clone.querySelector(".reviewText");
        textTemplate.textContent = element.text;

        let graphism = clone.querySelector('.reviewDisplay');
        graphism.textContent = element.display_note;


       let gameplay = clone.querySelector('.reviewGameplay');
        gameplay.textContent = element.gameplay_note;

        let scenario = clone.querySelector('.reviewScenario');
        scenario.textContent = element.scenario_note;

        let life = clone.querySelector('.reviewLifetime');
        life.textContent = element.lifetime_note;

        let title = clone.querySelector('.reviewTitle');
        title.textContent = element.title;

        let main = document.querySelector(".main");
        main.append(clone);
       })
        
        
        


    },

    //================================================================ADD VIDEO GAME ====================================================================

    addGame()
    {
        let addVideogameButtonElement = document.getElementById('btnAddVideogame');
        addVideogameButtonElement.addEventListener('click', app.handleClickToAddVideogame);
    },

    handleClickToAddVideogame()
    {
        $('#addVideogameModal').modal('show');
       
    },

    createNewGame()
    {
        let validateForm = document.querySelector(".add-game");
        validateForm.addEventListener("click",app.postNewGame);
    },

    postNewGame(event)
    {
        

         let inputName = document.querySelector('#inputTitle');
         let valueInputName = inputName.value;

         let inputEditor = document.querySelector('#inputEditor');
         let valueInputEditor = inputEditor.value;

         let selectPlatform = document.querySelector('#add-platform_id');
         let valueSelectPlatform = selectPlatform.value;

         let newGame = 
         {
             "name" : valueInputName,
             "editor" : valueInputEditor,
             "platform_id": Number(valueSelectPlatform)
         };

         let fetchOption = 
         {
             method : "POST",
             headers : {"Content-Type":"application/json"},
             body : JSON.stringify(newGame)
         };

        

         fetch("http://localhost/s07/parcours/s07-parcours-air-one-x/backend/public/add-videogame",fetchOption).then(function(response){return response.json()}).then(app.displayNewGame);

         let body = document.querySelector('body');
         body.classList.remove('modal-open');

         let modal = document.querySelector('.fade');
         modal.classList.remove('show');
         modal.style.display = "none";
         
         let petitMalin = document.querySelector(".modal-backdrop");
         body.removeChild(petitMalin);
         event.preventDefault();
         
    },

    displayNewGame(response)
    {
        app.createSelectOption(response[0]);
    },



    //================================================================SELECT GAME LIST ===================================================================

    selectList()
    {
        fetch("http://localhost/s07/parcours/s07-parcours-air-one-x/backend/public/videogames").then(app.returnResponse).then(app.addListGame);
    },

    addListGame(response)
    {
        console.log(response);
        response.forEach(element =>{
            app.createSelectOption(element);
        });
    },

    createSelectOption(param)
    {
        let option = document.createElement("option");
        option.value = param.id;
        option.textContent = param.name;

        let select = document.querySelector("select");
        select.append(option);

    },

  //===============================================================PLATFORM =============================================================================

    listPlatform()
    {
        fetch("http://localhost/s07/parcours/s07-parcours-air-one-x/backend/public/platforms").then(app.returnResponse).then(app.seePlatform);

    },

    seePlatform(response)
    {
        response.forEach(element =>{
            app.displayPlatform(element);
        });
    },

    displayPlatform(param)
    {
        
        let option = document.createElement("option");
        option.value = param.id;
        option.textContent = param.name;

        let select = document.querySelector("#add-platform_id");
        select.append(option);
    },

};

    app.init();




