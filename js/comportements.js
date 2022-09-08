document.addEventListener('DOMContentLoaded', principale);

var cleAPI = ""//Clé permettant d'accéder à l'API
//Note pour le lecteur :
//Le programme est très long, c'est pour cela que j'ai mis beaucoup de commentaire
//j'ai essayé d'être le plus clair possible pour vous simplifier la lecture

//Tout le programme est dans cette fonction
function principale() {

/* Ce qui suit s'applique à toutes les pages */

//Gestion des évenements des deux menus (le principale et les paramètres)
    document.getElementById('ouvertureMenu').addEventListener('click', ouvrirMenu)
    document.getElementById('ouvertureParametre').addEventListener('click', ouvrirParametre)
    document.getElementById('fermetureMenu').addEventListener('click', fermerMenu)
    document.getElementById('fermetureParametre').addEventListener('click', fermerParametre)
    document.getElementById('reinitCouleur').addEventListener('click', reinitialiserCouleurs)

//Fonctions correspondante aux menus
    function ouvrirMenu(){
        document.querySelector('nav').classList.add('menuOuvert')
    }

    function ouvrirParametre(){
        document.getElementById('parametre').classList.add('menuOuvert')
    }

    function fermerMenu(){
        document.querySelector('nav').classList.remove('menuOuvert')
    }

    function fermerParametre(){
        document.getElementById('parametre').classList.remove('menuOuvert')
    }
    
    function reinitialiserCouleurs(){
        sessionStorage.setItem('--couleur-fond', "#000000")
        sessionStorage.setItem('--couleur-menu', "#616161")
        sessionStorage.setItem('--couleur-texte', "white")
        sessionStorage.setItem('--couleur-header-footer', "#404040")
        sessionStorage.setItem('--couleur-nom-resume', "#121212")
        chargerCouleur()
    }



//Evenement pour le choix du mode gaucher ou droitier
    document.getElementById('choixMode').addEventListener('change', changerMode)

//Fonctions du changement de mode
    // Le changelent de mode n'affecte que les boutons d'ouverture et de fermeture de menus car tous le reste est centrée
    function changerMode(){
        sessionStorage.setItem('--right-fermer', this.value)  //On stocke le choix pour pouvoir l'appliquer sur différentes pages
        chargerMode()//On charge le mode pour qu'il soit actif instantanément
    }

    function chargerMode(){
        var r = document.querySelector(':root');// Il s'agit d'un élément qui stocke toutes les variables css
        if(sessionStorage.getItem("--right-fermer") != null){ //On vérifie que l'utilisateur à fait un choix sinon on laisse le mode par défaut (droitier)
            r.style.setProperty("--right-fermer", sessionStorage.getItem("--right-fermer"))//On change la variable css pour que l'affichage change
            if(sessionStorage.getItem("--right-fermer") == "100vw"){//Ici le mode gaucher est séléctionner "100vw" signifie que le menu se déroule de 0 à 100vw sur le right
                document.getElementById('choixMode').querySelector('option:last-of-type').selected = true//On affiche dans les paramètre le mode séléctionner
                document.getElementById('ouvertureMenu').style.left = 0//les boutons menu sont déplacer à gauche
                document.getElementById('ouvertureMenu').style.right = "initial"//On remet la taille des boutons normalement
                document.getElementById('fermetureMenu').style.alignSelf = "flex-start"//les boutons menu sont déplacer à gauche
                document.getElementById('fermetureParametre').style.alignSelf = "flex-start"//les boutons menu sont déplacer à gauche
            }else{//Le mode gaucher n'est pas choisis donc le mode droitier est donc choisi
                document.getElementById('choixMode').querySelector('option').selected = true//On affiche dans les paramètre le mode séléctionner
                document.getElementById('ouvertureMenu').style.left = "initial"//On remet la taille des boutons normalement
                document.getElementById('ouvertureMenu').style.right = 0//les boutons menu sont déplacer à droite
                document.getElementById('fermetureMenu').style.alignSelf = "flex-end"//les boutons menu sont déplacer à droite
                document.getElementById('fermetureParametre').style.alignSelf = "flex-end"//les boutons menu sont déplacer à droite
            }
        }
    }

//Fonctions de changements de thèmes
    let listeInput = document.querySelectorAll('#parametre input')//Séléction de tous les input des paramètres (tous de type color)
    listeInput.forEach(
        unInput => {
            unInput.addEventListener("input", changeCouleur)//chaque changement de couleur aura un effet instantanément
        }
    )

    function changeCouleur(){
        var r = document.querySelector(':root');// L'élément qui stocke toutes les variables css
        r.style.setProperty(this.getAttribute('name'), this.value)//On applique la couleur séléctionner pour le type d'éléments séléctionnés
        sessionStorage.setItem(this.getAttribute('name'), this.value)//On enregistre pour pouvoir l'appliquer sur toutes les pages
        this.style.backgroundColor = this.value//affiche la couleur séléctionner
    }

    function chargerCouleur(){
        var r = document.querySelector(':root');// L'élément qui stocke toutes les variables css
        //Pour chaque variables css de couleurs on va chercher la couleur choisi par l'utilisateur 
        //si il n'en a pas choisi alors on mets les couleurs de base
        if(sessionStorage.getItem("--couleur-fond") != null){//Vérification que l'utilisateur à bien choisi une couleur pour ce type d'éléments
            r.style.setProperty("--couleur-fond", sessionStorage.getItem("--couleur-fond"))//Si oui on applique la couleur
            document.getElementById('couleurFond').style.backgroundColor = sessionStorage.getItem("--couleur-fond")//et on l'affiche pour savoir laquelle a été choisi
        }
        if(sessionStorage.getItem("--couleur-menu") != null){
            r.style.setProperty("--couleur-menu", sessionStorage.getItem("--couleur-menu"))
            document.getElementById('couleurMenu').style.backgroundColor = sessionStorage.getItem("--couleur-menu")
        }
        if(sessionStorage.getItem("--couleur-texte") != null){
            r.style.setProperty("--couleur-texte", sessionStorage.getItem("--couleur-texte"))
            document.getElementById('couleurTexte').style.backgroundColor = sessionStorage.getItem("--couleur-texte")
        }
        if(sessionStorage.getItem("--couleur-header-footer") != null){
            r.style.setProperty("--couleur-header-footer", sessionStorage.getItem("--couleur-header-footer"))
            document.getElementById('couleurHeaderFooter').style.backgroundColor = sessionStorage.getItem("--couleur-header-footer")
        }
        if(sessionStorage.getItem("--couleur-nom-resume") != null){
            r.style.setProperty("--couleur-nom-resume", sessionStorage.getItem("--couleur-nom-resume"))
            document.getElementById('couleurNomResume').style.backgroundColor = sessionStorage.getItem("--couleur-nom-resume")
        }
    }

//Appels de ces deux fonctions pour que l'onglet paramètres soit à jour avec les séléctions de l'utilisateurs
    chargerCouleur()
    chargerMode()

/* Fin des fonctions communes à toutes les pages */








/* Ce qui suit s'applique seulement à la page Recherche */

//Si la page est la page de recherche
    if(document.getElementById('boutonRecherche') != null){
    //On met l'évenment de recherche au bouton 'boutonRecherche'
        document.getElementById('boutonRecherche').addEventListener('click', function(){rechercheCorrespondance(document.querySelector('header input').value)})
    //On effectue une recherche de base
        rechercheCorrespondance('Hello World')
    }

//Fonction de recherche de résultat correpondant au mots entrer dans le header input
//La fonction à comme entrée le mot à chercher et la page de recherche utili lorsqu'il y a beaucoup de résultats
    function rechercheCorrespondance(texteAChercher, page=1) {
        document.querySelector('main').style.marginTop = document.querySelector('header').clientHeight + "px"//Adaptation du margin-top du main
    //L'URL des données se compose d'une clé api pour pouvoir chercher les données, du mot a rechercher, du language utilisé, du numéro de page à chercher
    //du mot multi qui signifie rechercher dans films, séries et acteurs et le include_adult=false permet de ne pas afficher de films pour adultes
        const URL = "https://api.themoviedb.org/3/search/multi?api_key="+cleAPI+"&language=fr&include_adult=false&query="+texteAChercher+"&page="+page;

        let promesse = axios.get(URL);

        promesse.then(afficherResultats);
        promesse.catch(afficherErreurAjax);

        function afficherResultats(resultats) {
            let listeFilms = resultats.data.results;//Liste de tous les films, séries et acteurs trouver
            document.getElementById('listeSimilaires').innerHTML = "";//On efface le contenu de la recherche précédente
            document.getElementById('boutons').innerHTML = "";//On efface les boutons page precedente et page suivantes
            document.getElementById('boutons').classList.remove('boutonsPreSui');//On retire la classe boutonsPreSui qui permet d'avoir un fond
            document.querySelector('main').style.marginTop = document.querySelector('header').clientHeight + "px"//Adaptation du margin-top du main
            if(listeFilms.length > 0){//Si il y a au moins 1 résultat
                listeFilms.forEach(//Pour chaque résultat
                    unFilm =>{
                        //Création des éléments qui seront affichés
                        let figure = document.createElement('figure')//Une figure contenant l'image et le nom
                        let image = document.createElement('img')//Une image représentant le résultat
                        let nom = document.createElement('figcaption')//Un nom représentant le résultat
                        let resumeFilm = document.createElement('p')//Un résumé ou biographie

                        if(unFilm.poster_path != null){//Si il y a une image représentative (seulement les films et séries)
                            image.setAttribute('src', "https://image.tmdb.org/t/p/original/"+unFilm.poster_path)//on affiche cette image
                        }else{
                            image.setAttribute('src', "img/image-null.png")//sinon on mets une image qui annonce qu'aucune image n'a été trouvé
                        }

                        //Suivant le type de résultats les noms de variables changent
                        if(unFilm.media_type == "tv"){//Si le résultat est une série
                            var titre = unFilm.name//Le titre est dans la variable name
                        }else if(unFilm.media_type == "person"){//Si le résultat est une personne
                            var titre = unFilm.name//Son nom est dans la variable name
                            if(unFilm.profile_path != null){//L'image représentative est dans une autre variable si celle ci existe 
                                image.setAttribute('src', "https://image.tmdb.org/t/p/original/"+unFilm.profile_path)//on l'affiche
                            }else{
                                image.setAttribute('src', "img/image-null.png")//sinon on mets l'image null
                            }
                        }else{//enfin si le résultat est un film
                            var titre = unFilm.title//Le titre est dans la variable title
                        }

                        image.setAttribute('alt', titre)//On mets un alt à l'image au cas où elle ne s'afficherait pas
                        nom.textContent = titre;//On affiche le titre trouvé précédemment

                        if(unFilm.overview != null){//Si il y a un résumé
                            if(unFilm.overview.length<400){//Si le résumé fait moins de 400 caractères
                                resumeFilm.innerHTML = unFilm.overview + "<p class='bouton'>Plus d'infos</p>"//on l'affiche et on ajoute un bouton pour aller sur la page du résultat
                            }else{//Si le résumé fait plus de 400 caractères
                                resumeFilm.innerHTML = unFilm.overview.slice(0,400)+ "..." + "<p class='bouton'>Plus d'infos</p>"//On le coupe à 400 caractère pui on rajoute le bouton vers la page
                            }
                        }else{//Si il n'y a pas de résumé
                            resumeFilm.innerHTML = "<p class='bouton'>Plus d'infos</p>"//On affiche seulement le bouton vers la page du résultat
                        }
                        resumeFilm.classList.add('resumeFermer')//On ferme le résumé, il ne s'affichera que lorsqu'il sera survolé (sur grand écran) ou cliquer (sur mobile)
                        resumeFilm.querySelector('.bouton').addEventListener('click', pageFilm)//On ajoute l'évenement permettant d'afficher la page du résultat
                        //On ajoute tous les éléments à la page
                        figure.appendChild(image)
                        figure.appendChild(nom)
                        figure.appendChild(resumeFilm)
                        figure.setAttribute('id', unFilm.id)
                        figure.setAttribute('type', unFilm.media_type)
                        figure.addEventListener('mouseenter', resume)
                        figure.addEventListener('mouseleave', fermerResume)
                        document.getElementById('listeSimilaires').appendChild(figure)
                    }
                );
                //Fin de l'affichage des résultats

                if(page>1){//Si on est sur une autre page de résultats que la première
                    let pagePrecedente = document.createElement('p')//On créer un bouton page précédente
                    pagePrecedente.textContent = "Page précédente"
                    pagePrecedente.addEventListener('click', allerpagePrecedente)//On lui donne l'action à effectuer
                    pagePrecedente.setAttribute('id', "pagePrecedente")
                    document.getElementById('boutons').appendChild(pagePrecedente)//On l'ajoute à la page
                    document.getElementById('boutons').classList.add('boutonsPreSui');//On ajoute la classe boutonsPreSui qui permet d'avoir un fond
                }
                if(resultats.data.total_pages>page){//Si il y a d'autres pages après celle si
                    let pageSuivante = document.createElement('p')//On créer un bouton page suivante
                    pageSuivante.textContent = "Page suivante"
                    pageSuivante.addEventListener('click', allerPageSuivante)//On lui donne l'action à effectuer
                    pageSuivante.setAttribute('id', "pageSuivante")
                    document.getElementById('boutons').appendChild(pageSuivante)//On l'ajoute à la page
                    if(document.getElementById('boutons').classList.contains('boutonsPreSui') == false){//Si l'élément bouton n'a pas la classe boutonsPreSui
                        document.getElementById('boutons').classList.add('boutonsPreSui');//On ajoute la classe boutonsPreSui qui permet d'avoir un fond
                    }
                }
                function allerPageSuivante(){
                    rechercheCorrespondance(texteAChercher, page+1)//On relance la fonction de recherche mais en allant sur la page suivante
                }
                function allerpagePrecedente(){
                    rechercheCorrespondance(texteAChercher, page-1)//On relance la fonction de recherche mais en allant sur la page précédente
                }
            }else{//Si aucun résultat n'a été trouvé
                let erreur = document.createElement('p');//On créer un élément d'erreur
                erreur.textContent = "Nous ne trouvons pas ce que vous chercher 😥 !";//On écris le message d'excuse
                document.getElementById('listeSimilaires').appendChild(erreur);//On affiche dans la page
            }
        }//Fin afficherResultats()

        function afficherErreurAjax(erreur) {//Si la requête n'a pas fonctionné
            document.getElementById('listeSimilaires').innerHTML = ""//On efface la recherche précédente
            let messageErreur = document.createElement('p');//On créer un élément d'erreur
            messageErreur.textContent = "Une erreur est venue nous embêter veuillez recommencer votre recherche !";//On écris le message d'excuse
            document.getElementById('listeSimilaires').appendChild(messageErreur);//On affiche dans la page
        }
    
        function resume(){//Lorsque l'utilisateur survole ou clique sur un résultat le résumé s'ouvre
            this.querySelector('p').classList.remove('resumeFermer')
            this.querySelector('p').classList.add('resumeOuvert')
        }
    
        function fermerResume(){//Lorsque l'utilisateur ne survole plus ou clique sur un autre résultat le résumé se ferme
            this.querySelector('p').classList.remove('resumeOuvert')
            this.querySelector('p').classList.add('resumeFermer')
        }
    
        function pageFilm(){//Affiche la page résultat du film, de la série ou de la personne séléctionné
            sessionStorage.setItem("idFilm", this.parentNode.parentNode.getAttribute('id'))//Enregistre l'identifiant du film pour l'ouvrir dans une autre page
            sessionStorage.setItem("typeFilm", this.parentNode.parentNode.getAttribute('type'))//Enregistre le type de résultat (film, série, personne) pour l'ouvrir dans une autre page
            window.open("infos.html", "_self");//Affiche la page dans le même onglet
        }
    }//Fin rechercheCorrespondance()

/* Fin des fonctions de la page Recherche */








/* Ce qui suit s'applique seulement à la page Infos */
//Attention cette partie est très longue

    if(window.location.href.includes('infos')){//Vérification que l'on est sur la page infos à l'aide de l'url
        if(sessionStorage.getItem("idFilm") != null && sessionStorage.getItem("typeFilm") != null){//Si la page précédante à bien enregistrer l'identifiant et le type de résultat
            //L'URL des données change en fonction du type de recherche
            //Dans les trois cas on utilisera l'identifiant enregistrer précédemment
            if(sessionStorage.getItem("typeFilm") == "tv"){//L'URL si la recherche est une série
                var URL = "https://api.themoviedb.org/3/tv/"+sessionStorage.getItem("idFilm")+"?api_key="+cleAPI+"&language=fr&append_to_response=images,videos,credits";
            }else if(sessionStorage.getItem("typeFilm") == "movie"){//L'URL si la recherche est un film
                var URL = "https://api.themoviedb.org/3/movie/"+sessionStorage.getItem("idFilm")+"?api_key="+cleAPI+"&language=fr&append_to_response=images,videos,credits";
            }else{//L'URL si la recherche est une personne
                var URL = "https://api.themoviedb.org/3/person/"+sessionStorage.getItem("idFilm")+"?api_key="+cleAPI+"&language=fr&append_to_response=images,movie_credits,tv_credits"
            }

            let promesse = axios.get(URL);//Lancement de la recherche
    
            promesse.then(afficherResultats);
            promesse.catch(afficherErreurAjax);
    
            //La fonction qui suit est très longue car il y a de nombreuses informations à récupérer
            //De plus beaucoup de variables et contenus changent en fonction du type de résultat
            //Pour plus de compréhension la fonction est découpé en partie préciser en commentaire
            function afficherResultats(resultat){//Fonction qui affiche le résultat de la recherche d'un film ou d'une série ou d'une personne

            //Partie 1 : Informations sur le resultat
                let film = resultat.data//variable contenant les informations récupérés

                if(sessionStorage.getItem("typeFilm") == "tv"){//Si le resultat est une série
                    document.querySelector('h1').textContent = film.name//On affiche son nom dans le h1 de la page
                    document.getElementById('film').parentNode.querySelector('h2').textContent = "Informations sur la série"//On modifie le texte de base pour annoncer que c'est une série
                }else if(sessionStorage.getItem("typeFilm") == "movie"){//Si le resultat est un film
                    document.querySelector('h1').textContent = film.title//On affiche son nom dans le h1 de la page
                    //Le texte de base annonce déjà que c'est un film
                }else{//Si le resultat est une personne
                    document.querySelector('h1').textContent = film.name//On affiche son nom dans le h1 de la page
                    document.getElementById('film').parentNode.querySelector('h2').textContent = "Informations sur la personne"//On modifie le texte de base pour annoncer que c'est une personne
                }
				document.querySelector('main').style.marginTop = document.querySelector('header').clientHeight + "px"//Adaptation du margin-top du main
                //Création des éléments à afficher
                let affiche = document.createElement('img')
                let informations = document.createElement('article')
                let annee = document.createElement('p')
                let genre = document.createElement('p')
                let resume = document.createElement('p')
                let trailer = document.createElement('p')

                //Gestion de l'image de présentation
                if(film.poster_path != null){//Si il y a une affiche de film ou série on l'affiche
                    affiche.setAttribute('src', "https://image.tmdb.org/t/p/original/"+film.poster_path)
                    if(sessionStorage.getItem("typeFilm") == "movie"){//Si le resultat est un film
                        affiche.setAttribute('alt', film.title)//Le texte alternatif de l'image sera title
                    }else{//Si le resultat est une série
                        affiche.setAttribute('alt', film.name)//Le texte alternatif de l'image sera name
                    }
                }else if(film.profile_path != null){//Si c'est une personne il n'y a pas d'affiche mais une image de profile
                    affiche.setAttribute('src', "https://image.tmdb.org/t/p/original/"+film.profile_path)
                    affiche.setAttribute('alt', film.name)//Texte alternatif de l'image pour une personne
                }else{//Si il n'y a ni affiche ni image de profile on affiche l'image null
                    affiche.setAttribute('src', "img/image-null.png")
                    affiche.setAttribute('alt', "Aucune Image")
                }
                
                //Gestion de l'année de création (film), de début et fin (série) ou de naissance et de mort(personne)
                if(sessionStorage.getItem("typeFilm") == "tv"){//Si le resultat est une série
                    if(film.first_air_date != null){//Si il y a une date
                        if(film.status == "Ended"){//Si la série est terminée
                            annee.textContent += film.first_air_date.split('-')[0] + " - " + film.last_air_date.split('-')[0]//On affiche l'année de début et de fin de cette série
                        }else{//Si la série n'est pas terminée
                            annee.textContent = "Depuis " + film.first_air_date.split('-')[0]//On affiche seulement l'année de début
                        }
                    }else{//Si il n'y a aucune date
                        annee.textContent = "Aucune informations sur la date de sortie"//On affiche qu l'on a pas la date
                    }
                }else if(sessionStorage.getItem("typeFilm") == "movie"){//Si le résultat est un film
                    if(film.release_date != null){//Si il y a une date
                        annee.textContent = film.release_date.split('-')[0]//On affiche l'année de sortie
                    }else{//Si il n'y a aucune date
                        annee.textContent = "Aucune informations sur la date de sortie"//On affiche qu l'on a pas la date
                    }
                }else{//Si le résultat est une personne
                    if(film.birthday != null){//Si il y a une date de naissance
                        if(film.deathday != null){//Si il y a une date de décés
                            annee.textContent += film.birthday + " - " + film.deathday//On affiche les deux dates
                        }else{//Si la personne est vivante
                            annee.textContent = "Né le " + film.birthday//On affiche seulement sa date de naissance
                        }
                    }else{//Si il n'y a aucune date
                        annee.textContent = "Aucune informations sur sa date de naissance"//On affiche qu l'on a pas la date
                    }
                }

                //Gestion des autres informations
                if(sessionStorage.getItem("typeFilm") == "tv" || sessionStorage.getItem("typeFilm") == "movie"){//Si le resultat est un film ou une série
                    let note = document.createElement('p')//On créer un élément note
                    note.textContent = "Note : " + film.vote_average + " / 10"//Dans lequel on met la note du public
                    informations.appendChild(note)//On affiche la note
                    genre.textContent = "Genres : "//On complète l'élément genre
                    film.genres.forEach(//Pour chaque genre trouver on l'affiche
                        unGenre => genre.textContent += unGenre.name + ", "
                    )
                    resume.innerHTML = "Résumé : " + film.overview//On rajoute le résumé
                    if(film.videos.results.length>0){//Si au moins une vidéo est trouvé, on affiche la première
                        trailer.innerHTML = '<iframe width="1920" height="937" src="https://www.youtube.com/embed/'+film.videos.results[0].key+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    }else{//Si il n'y a pas de vidéos on le dis
                        trailer.textContent = "Aucune bande annonce n'est disponible"
                    }
                }else{//Si le resultat est une personne
                    resume.textContent = "Biographie : " + film.biography//On affiche seulement sa biographie
                }
                //Affichage des éléments dans la page
                informations.appendChild(annee)
                informations.appendChild(genre)
                informations.appendChild(resume)
                informations.appendChild(trailer)
                document.getElementById('film').appendChild(affiche)
                document.getElementById('film').appendChild(informations)
    
                

            //Cette fonction sera utilisé dans les 3 parties qui suivent
                function  creerContenu(sourceImage, nomObjet, identifiant, action, emplacement, typeObjet, personnage=null, job=null){//Fonction qui créer un contenu dans la page
                    let conteneur = document.createElement('figure')//On créer une figure
                    let image = document.createElement('img')//Avec une image
                    let nom = document.createElement('figcaption')//et un titre
                    if(sourceImage != null){//Si l'objet une affiche
                        image.setAttribute('src', "https://image.tmdb.org/t/p/original/"+sourceImage)//on l'affiche
                    }else{//si l'objet n'a pas d'affiche
                        image.setAttribute('src', "img/image-null.png")//On mets l'image null
                    }
                    image.setAttribute('alt', nomObjet)//On place le titre dans le texte alternatif
                    nom.textContent = nomObjet
                    if(personnage != null){//Si l'objet est un acteur
                        nom.innerHTML += "<br>Dans le rôle de " + personnage//On affiche le nom de son personnage
                    }
                    if(job != null){//Si l'objet est un personne de l'équipe technique
                        nom.innerHTML += "<br>Job : " + job//On insère son rôle dans la production du film
                    }
                    //On affiche le tout dans la page
                    conteneur.appendChild(image)
                    conteneur.appendChild(nom)
                    conteneur.setAttribute('id', identifiant)
                    conteneur.setAttribute('type', typeObjet)
                    conteneur.addEventListener('click', action)//Chaque saison pourra être cliquer pour voir la page de la saison
                    document.getElementById(emplacement).appendChild(conteneur)
                }


            //Partie 2 : Listes des saisons, des collections ou des films dans lesquels la personne joue

                if(sessionStorage.getItem("typeFilm") == "tv"){//Si le résultat est une série
                    document.getElementById('saisons').parentNode.querySelector('h2').textContent = "Listes des saisons"//On prévient que l'on va afficher des saisons de la série

                    let listeSaisons = film.seasons//On stocke les saisons dans une variable
                    listeSaisons.forEach(//Pour chaque saison
                        uneSaison => {
                            creerContenu(uneSaison.poster_path, uneSaison.name, uneSaison.season_number, pageSaison, 'saisons', "tv")//On créer le contenu
                        }
                    )
                }else if(sessionStorage.getItem("typeFilm") == "movie"){//Si le resultat est un film
                    if(film.belongs_to_collection != null){//Si le film fait partie d'une collection (ex: Harry potter, Star Wars...)
                        //On fait une recherche de tous les films de cette collection
                        const URL = "https://api.themoviedb.org/3/collection/"+film.belongs_to_collection.id+"?api_key="+cleAPI+"&language=fr";

                        let promesse = axios.get(URL);
            
                        promesse.then(afficherCollection);
                        promesse.catch(afficherErreurAjax);

                        function afficherCollection(resultat){
                            let listeCollection = resultat.data.parts
                            listeCollection.forEach(//Pour chaque film de la collection
                                unFilm => {
                                    creerContenu(unFilm.poster_path, unFilm.title, unFilm.id, pageFilm, 'saisons', "movie")//On créer le contenu
                                }
                            )
                        }
                    }else{//Si le film ne fait pas partie d'une collection
                        document.getElementById('saisons').parentNode.querySelector('h2').remove()//On retire la partie collection
                    }
                }else{//Si le résultat est une personne
                    if(film.movie_credits.cast.length>0){//Si la personne à jouée dans au moins un film
                        let listeFilm = film.movie_credits.cast
                        listeFilm.forEach(//On affichera chaque film
                            unFilm => {
                                creerContenu(unFilm.poster_path, unFilm.title, unFilm.id, pageFilm, 'saisons', "movie")//On créer le contenu
                            }
                        )
                        document.getElementById('saisons').parentNode.querySelector('h2').textContent = "Liste des films dans lesquels il apparait"//On change le texte de base
                    }else{//Si la personne n'a joué dans aucun film
                        document.getElementById('saisons').parentNode.querySelector('h2').remove()//On retire cette partie
                    }
                }

            //Partie 3 : Informations sur les acteurs ou liste des séries dans lesquels la personne joue
                
                if(sessionStorage.getItem("typeFilm") == "tv" || sessionStorage.getItem("typeFilm") == "movie"){//Si le resultat est un film ou une série
                    let listePersonnes = film.credits
                    listePersonnes.cast.forEach(//Pour chaque acteurs
                        unActeur => {
                            creerContenu(unActeur.profile_path, unActeur.name, unActeur.id, pageFilm, 'acteurs', "person", unActeur.character)//On créer le contenu
                        }
                    )
                }else{//Si le résultat est un personnage
                    if(film.tv_credits.cast.length>0){//Si la personne à jouée dans au moins une série
                        let listeFilm = film.tv_credits.cast
                        listeFilm.forEach(//Pour chaque série dans laquelle la personne à jouée
                            unFilm => {
                                creerContenu(unFilm.poster_path, unFilm.name, unFilm.id, pageFilm, 'acteurs', "tv")//On créer le contenu
                            }
                        )
                        document.getElementById('acteurs').parentNode.querySelector('h2').textContent = "Liste des séries dans lesquelles il apparait"//Changement du nom de l'article
                    }else{//Si l'acteur n'a jouée dans aucune série on retire cette section
                        document.getElementById('acteurs').parentNode.querySelector('h2').remove()
                    }
                }

            //Partie 4 : Liste de l'equipe technique ou liste des films et séries produite ou co-produite par la personne
                if(sessionStorage.getItem("typeFilm") == "tv" || sessionStorage.getItem("typeFilm") == "movie"){//Si le resultat est une série ou un film
                    let listePersonnes = film.credits
                    listePersonnes.crew.forEach(//Pour chaque personne de la production
                        unAgent => {
                            creerContenu(unAgent.profile_path, unAgent.name, unAgent.id, pageFilm, 'equipe', "person", null, unAgent.job)//On créer le contenu
                        }
                    )
                }else{//Si le resultat est une personne
                    if(film.tv_credits.crew.length>0 || film.movie_credits.crew.length>0){//Si il à produit ou aider à produire au moins un film ou une série
                        if(film.tv_credits.crew.length>0){//Si il à produit au moins une série
                            let listeFilm = film.tv_credits.crew
                            listeFilm.forEach(//Pour chaque films produits
                                unFilm => {
                                    creerContenu(unFilm.poster_path, unFilm.name, unFilm.id, pageFilm, 'equipe', "tv")//On créer le contenu
                                }
                            )
                        }
                        if(film.movie_credits.crew.length>0){//Si il à produit au moins un film
                            let listeFilm = film.movie_credits.crew
                            listeFilm.forEach(//Pour chaque film
                                unFilm => {
                                    creerContenu(unFilm.poster_path, unFilm.title, unFilm.id, pageFilm, 'equipe', "movie")//On créer le contenu
                                }
                            )
                        }
                        document.getElementById('equipe').parentNode.querySelector('h2:last-of-type').textContent = "Liste de ses films et séries"//On change le nom de la section
                    }else{//Si la personne n'a pas produit de film ou de série
                        document.getElementById('equipe').parentNode.querySelector('h2:last-of-type').remove()//on retire cette section
                    }
                }
                
            //Partie 5 : Images disponibles sur la recherche
                if(sessionStorage.getItem("typeFilm") == "tv" || sessionStorage.getItem("typeFilm") == "movie"){//Si le resultat est un film ou une série
                    let listeImages = film.images
                    listeImages.backdrops.forEach(//Pour chaque fond d'écran trouvé
                        unFond => {
                            let image = document.createElement('img')//On créer une image
                            image.setAttribute('src', "https://image.tmdb.org/t/p/original/"+unFond.file_path)//On lui met la source trouvé
                            image.setAttribute('alt', "Un fond d'écran")//On ajoute un texte alternatif
                            document.getElementById('fond').appendChild(image)//On insère l'image dans la page
                        }
                    )
                    listeImages.posters.forEach(//Pour chaque poster trouvé
                        unPoster => {
                            let image = document.createElement('img')//On créer une image
                            image.setAttribute('src', "https://image.tmdb.org/t/p/original/"+unPoster.file_path)//On lui met la source trouvé
                            image.setAttribute('alt', "Un poster")//On ajoute un texte alternatif
                            document.getElementById('poster').appendChild(image)//On insère l'image dans la page
                        }
                    )
                    if(listeImages.backdrops.length == 0 && listeImages.posters == 0){//Si aucune image n'a été trouvé
                        document.getElementById('fond').textContent = "Aucune image n'est disponibles"//On affiche qu'il n'a **y a pas d'images
                    }
                }else{//Si le résultat est une personne
                    let listeImages = film.images
                    listeImages.profiles.forEach(//Pour chaque photo
                        unPoster => {
                            let image = document.createElement('img')//On créer une image
                            image.setAttribute('src', "https://image.tmdb.org/t/p/original/"+unPoster.file_path)//On lui met la source trouvé
                            image.setAttribute('alt', "Une photo")//On ajoute un texte alternatif
                            document.getElementById('poster').appendChild(image)//On insère l'image dans la page
                        }
                    )
                    if(listeImages.profiles == 0){//Si aucune image n'a été trouvé
                        document.getElementById('fond').textContent = "Aucune image n'est disponible"//On affiche qu'il n'a **y a pas d'images
                    }
                }
            }//Fin de la fonction afficherResultats()

            function afficherErreurAjax(erreur) {//Si la recherche du film ou de la série ou de la personne échoue
                let messageErreur = document.createElement('p');//On créer un élément d'erreur
                messageErreur.textContent = "Une erreur est venue nous embêter veuillez recommencer votre recherche !";//On écris le message d'excuse
                document.getElementById('film').appendChild(messageErreur);//On affiche dans la page
            }

            function pageFilm(){//Permet d'acceder à une page de film, série ou personage
                sessionStorage.setItem("idFilm", this.getAttribute('id'))//Identifiant de la recherche
                sessionStorage.setItem("typeFilm", this.getAttribute('type'))//type de recherche (film, série ou personne)
                window.open("infos.html", "_self")//Aller à la page en restant dans le même onglet
            }
            function pageSaison(){//Permet d'acceder à une page d'une saison
                sessionStorage.setItem("nbSaison", this.getAttribute('id'))//numéro de la saison
                window.open("saison.html", "_self");//Aller à la page en restant dans le même onglet
            }
        }else{//Si la page recherche n'as pas bien enregistrer l'identifiant et le type de recherche
            document.querySelector('main').textContent = "Une erreur est venue nous embêter veuillez recommencer votre recherche !"//On affiche un message d'erreur sur la page
        }
    }//Fin du if la page est info
    
/* Fin des fonctions de la page Infos */








/* Ce qui suit s'applique seulement à la page saison */

    if(window.location.href.includes('saison')){//Vérification que l'on est sur la page saison à l'aide de l'url
        if(sessionStorage.getItem("idFilm") != null && sessionStorage.getItem("nbSaison") != null){//Si la page précédante à bien enregistrer l'identifiant et le numéro de la saison
            document.querySelector('main').style.marginTop = document.querySelector('header').clientHeight + "px"//Adaptation du margin-top du main
            
            var URL = "https://api.themoviedb.org/3/tv/"+sessionStorage.getItem("idFilm")+"/season/"+sessionStorage.getItem("nbSaison")+"?api_key="+cleAPI+"&language=fr";

            let promesse = axios.get(URL);//Lancement de la recherche
    
            promesse.then(afficherResultats);
            promesse.catch(afficherErreurAjax);

            function afficherResultats(resultat){//Fonction qui affiche le résultat de la recherche d'un film ou d'une série ou d'une personne
                let saison = resultat.data
                document.querySelector('h1').textContent = saison.name//On affiche le nom de la saison dans le h1 de la page

            //Partie 1 : Informations sur la série
                //Création des éléments à afficher
                let affiche = document.createElement('img')
                let informations = document.createElement('article')
                let annee = document.createElement('p')
                let resume = document.createElement('p')
                let nbEpisodes = document.createElement('p')

                //Gestion de l'image de présentation
                if(saison.poster_path != null){//Si il y a une affiche de la saison
                    affiche.setAttribute('src', "https://image.tmdb.org/t/p/original/"+saison.poster_path)
                    affiche.setAttribute('alt', saison.name)//Le texte alternatif de l'image sera name
                }else{//Si il n'y a ni affiche ni image de profile on affiche l'image null
                    affiche.setAttribute('src', "img/image-null.png")
                    affiche.setAttribute('alt', "Aucune Image")
                }

                //Gestion de l'année
                if(saison.air_date != null){//Si il y a une date
                    annee.textContent = saison.air_date.split('-')[0]//On affiche l'année de début de cette saison
                }else{//Si il n'y a aucune date
                    annee.textContent = "Aucune informations sur la date de sortie"//On affiche qu l'on a pas la date
                }

                //Gestion des autres informations
                nbEpisodes.innerHTML = saison.episodes.length + " épisodes"//On rajoute le nombre d'épisodes
                resume.innerHTML = "Résumé : " + saison.overview//On rajoute le résumé

                //Affichage des éléments dans la page
                informations.appendChild(annee)
                informations.appendChild(nbEpisodes)
                informations.appendChild(resume)
                document.getElementById('saison').appendChild(affiche)
                document.getElementById('saison').appendChild(informations)

            //Partie 2 : Affichage de tous les épisodes
                saison.episodes.forEach(//Pour chaque épisode
                    unEpisode => {
                        let episodeConteneur = document.createElement('article')//On créer un article
                        let figure = document.createElement('figure')//Une figure
                        let image = document.createElement('img')//Une image 
                        let titre = document.createElement('figcaption')//Un titre
                        let infos = document.createElement('p')//Des informations sur l'épisode
                        let resume = document.createElement('p')//Un résumé
                        titre.textContent = unEpisode.name//On insère le nom
                        infos.textContent = "Saison " + unEpisode.season_number + " - Episode " + unEpisode.episode_number + " - Note " + unEpisode.vote_average + " / 10"//On insère les infos
                        resume.textContent = unEpisode.overview//On insère le résumé
                        if(unEpisode.still_path != null){//Si il y a une image
                            image.setAttribute('src', "https://image.tmdb.org/t/p/original/"+unEpisode.still_path)//On affiche l'image
                            image.setAttribute('alt', unEpisode.name)//On ajoute un texte alternatif
                        }else{//Si il n'y a pas d'images
                            image.setAttribute('src', "img/image-null-paysage.png")//On affiche l'image null
                            image.setAttribute('alt', "Aucune image")//On ajoute un texte alternatif
                        }
                        //On ajoute tout à la page
                        figure.appendChild(image)
                        figure.appendChild(titre)
                        episodeConteneur.appendChild(figure)
                        episodeConteneur.appendChild(infos)
                        episodeConteneur.appendChild(resume)
                        document.getElementById('episodes').appendChild(episodeConteneur)
                    }
                )

            }//Fin de la fonction afficherResultats()

            function afficherErreurAjax(erreur) {//Si la recherche de la saison échoue
                let messageErreur = document.createElement('p');//On créer un élément d'erreur
                messageErreur.textContent = "Une erreur est venue nous embêter veuillez recommencer votre recherche !";//On écris le message d'excuse
                document.getElementById('saison').appendChild(messageErreur);//On affiche dans la page
            }
        }else{//Si la page précédante à mal enregistrer le numéro de saison ou l'identifiant du film
            document.querySelector('main').textContent = "Une erreur est venue nous embêter veuillez recommencer votre recherche !"//On affiche un message d'erreur sur la page
        }
    }//Fin du if la page est saison
    
/* Fin des fonctions de la page saison */


}//Fin de la fonction principale