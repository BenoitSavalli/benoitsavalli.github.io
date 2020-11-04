$(document).ready(function () {

    /*Liste des id sections utilise sur les pages*/
    tabSection = ["#s1", "#s2", "#s3", "#s4", "#s5"];
    tabTopSection = [0, 0, 0, 0, 0, 0];
    tabClass = [1, 2, 3, 4, 5, 6];

    allClass = '1 2 3 4 5 6 n1 cache';
    /*----------------------------------*/



    /*--INITIALISATION DE LA PAGE HTML--*/
    
    //Navigation interne
    
    function init_nav() {
        // -->On récupére un tableau de tous les enfants 'a' de "navigation-interne"
        var childs = document.getElementById("navigation-interne").querySelectorAll('a');
        
        var classement = 1;
        childs.forEach(function (element) { // Cible les <a> dans la ul class navigation-interne
            $(element).addClass('b');
            childs[classement-1].id=''+classement;
            classement = classement + 1;
        });
    }
    
    //Les Sections
    
    function init_content() {
        // -->On récupére un tableau de tous les enfants 'section' de "navigation-interne"
        var childs = document.getElementById("deplace-contenu").querySelectorAll('section');
        
        var classement = 1;
        childs.forEach(function (element) { // Cible les section dans le main qui contient la class deplace-contenu
            $(element).addClass(''+classement);
            childs[classement-1].id='s'+classement;
            classement = classement + 1;
        });
    }
    
    
    init_nav();
    init_content();
    /*----------------------------------*/

    /*Reafectation des classes pour l'ordre*/
    function decalClass(cl) {
        cla = cl + 1
        $('.' + cl).removeClass('' + cl).addClass('' + cla);
    }

    /*La section qui monte prends la classe '1'*/
    function topClass(cl, id) {
        $('#' + id).removeClass('' + cl).addClass('1');
    }



    /*Appliquer les changements si hover bouton,
     * et prends la classe de section attribuer au bouton '#s-n°'
     */

    $('.b').hover(function () {
        //On prends les classe de l'element, convertie en entier
        idboutton = parseInt(this.getAttribute('id'), 10);
        // y = ordre
        z = document.getElementById('s' + idboutton).getAttribute('class');

        if (z in tabClass) {
            /*On monte la section s en premiere position*/
            monter_Section(z);
            /*On donne a s la classe de premiere position*/
            topClass(z, 's' + idboutton);

            for (i in tabSection) {
                if (tabSection[i] != tabSection[idboutton - 1]) {
                    $(tabSection[i]).addClass('cache');
                } else {
                    $(tabSection[i]).addClass('n1');
                }
            }
        } else {
            for (i in tabSection) {
                if (tabSection[i] != tabSection[idboutton - 1]) {
                    $(tabSection[i]).removeClass('cache');
                } else {
                    $(tabSection[i]).removeClass('n1');
                }
            }
            //On prends les classe de l'ID #s
            z = document.getElementById('s' + idboutton).getAttribute('class');

            /*On monte la section s en premiere position*/
            monter_Section(z);

            /*On donne a s la classe de premiere position*/
            topClass(z, 's' + idboutton);
        }
    });

    /*Responsive : si changement de taille d'ecran*/
    window.onresize = function () {
        tabTopSection = [0, 0, 0, 0, 0, 0];
        t = 1
        tabSection.forEach(function (element) {
            $(element).css('top', "0px");
            $(element).removeClass(allClass).addClass('' + t);
            t = t + 1;
        });
    }

    /**Calcule de la hauteur a monter
     * Reccupere le top de la section qui va monter
     * On applique le nouveau top a la section
     * (Sans le margin 16px)
     * type void
     */
    function monter_Section(z) {
        if (z == 1) { // Si il est deja en permiere position, Aucun changement
            console.log('Aucun changement');
        } else { // Sinon, on actualise
            b = z - 1; // Le nombre de section au dessus
            y = 0; //La future valeur du top de s1
            for (b; b > 0; b--) { // On passe sur tout les section au dessus de celle cible

                var sectionElementClass = document.getElementsByClassName(b); //On reccupere notre section par ça classe
                var dataElementClass = window.getComputedStyle(sectionElementClass[0], null); //Sur cette section on prends les propriéter CSS

                var divHeight = parseInt(dataElementClass.height.split("px")[0], 10); //On prends la hauteur parmis les propriété CSS, on change le string en numerique, et on enleve 'px'

                y = y + divHeight + 0;//32; //On rajoute la padding
            }


            $("." + z).each(function () {
                idd = parseInt((this.id).split("s")[1], 10);
            });
            idd = idd - 1

            /*Rectification des variables*/
            tabTopSection[idd] = tabTopSection[idd] - y; // top de la SectionMonter - SUM(section au dessus)

            /*Mise en place du top sur la sectionMonter*/
            $('.' + z).css('top', tabTopSection[idd] + "px");

            //On descend les autres sections
            descendre_Section(z);
        }
    }

    function descendre_Section(z) {

        /*Reccup la hauteur de la sectionMonter z */
        var sectionElementClass = document.getElementsByClassName(z);
        var dataElementClass = window.getComputedStyle(sectionElementClass[0], null); // On prends son style

        var x = parseInt(dataElementClass.height.split("px")[0], 10); // On prends la hauteur du block monter

        b = z - 1; // Pour l'ensembles des sections a descendre


        for (b; b > 0; b--) {

            $("." + b).each(function () {
                idd = parseInt((this.id).split("s")[1], 10);
            });
            idd = idd - 1

            tabTopSection[idd] = tabTopSection[idd] + 0/*32*/ + x; //Margin *2   ,   On descends de la valeur x


            $('.' + b).css('top', tabTopSection[idd] + "px"); // Application du nouveau top a la section qui descends

            decalClass(b); // Une fois déplacer on change les classe (+1)
        }
    }
});


/** Documentation - utilisation du js
* 
* @author Savalli Benoit
* @version 1.2
*
* ---Deux identifiants a utiliser---
* 
* ##
* ### Pour le menu interne
* ##
* 
* On utilise l' ID : "navigation-interne"
* 
* -- sous la forme :
* 
* <ul id='navigation-interne'>
*   <a><li></li></a>
*   <a><li></li></a>
* </ul>
*
* --- /!\ ATTENTION :
* les enfants direct de l'ID ne doivent pas avoir d'ID et de classe
* -----------------------------------------------------------------
* 
* ##
* ### Pour le contenu a déplacer
* ##
* 
* On utilise l'ID : "deplace-contenu"
* 
* -- sous la forme :
* 
* <div id='deplace-contenu'>
*   <section><p>...</p></section>
*   <section><article>...</article></section>
* </div>
* 
* --- /!\ ATTENTION :
* les enfants direct de l'ID ne doivent pas avoir d'ID et de classe
* -----------------------------------------------------------------
*/