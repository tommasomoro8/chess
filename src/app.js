console.warn("Attenzione! Stai giocando in una beta");

/*Movimento tra menÃ¹*/

function goto2localplayers() {
    typegame = "PvP";
    document.title = "Chess - Player vs Player";
    document.getElementById("notAIvAI").style.display = "flex";
    document.getElementById("AIvAI").style.display = "none";
    document.getElementById("bianco").classList.remove("biancoAI");
    document.getElementById("bianco").classList.add("bianco");
    document.getElementById("mosseW").classList.remove("tab3");
    document.getElementById("mosseW").classList.add("tab2");
    document.getElementById("biancotit").innerHTML = "Bianco";
    document.getElementById("pattaricW").style.display = "block";
    document.getElementById("onlyPvP").style.display = "flex";
    document.getElementById("onlyPvAI").style.display = "none";
    document.getElementById("containerhomeid").style.display = "none";
    document.getElementById("containergameid").style.display = "flex";
    startgame();
}

function goto1localplayer1bot() {
    typegame = "PvAI";
    document.title = "Chess - Player vs AI";
    document.getElementById("notAIvAI").style.display = "flex";
    document.getElementById("AIvAI").style.display = "none";
    document.getElementById("bianco").classList.remove("bianco");
    document.getElementById("bianco").classList.add("biancoAI");
    document.getElementById("mosseW").classList.remove("tab2");
    document.getElementById("mosseW").classList.add("tab3");
    document.getElementById("biancotit").innerHTML = "Umano";
    document.getElementById("depth").innerHTML = "Depth: " + d;
    document.getElementById("mosseBOT").innerHTML = "0 mosse";
    document.getElementById("tempoBOT").innerHTML = "in 0 ms";
    document.getElementById("pattaricW").style.display = "none";
    document.getElementById("onlyPvP").style.display = "none";
    document.getElementById("onlyPvAI").style.display = "flex";
    document.getElementById("containerhomeid").style.display = "none";
    document.getElementById("containergameid").style.display = "flex";
    startgame();
}

function goto2bot() {
    typegame = "AIvAI";
    document.title = "Chess - AI vs AI";
    document.getElementById("notAIvAI").style.display = "none";
    document.getElementById("AIvAI").style.display = "flex";
    document.getElementById("containerhomeid").style.display = "none";
    document.getElementById("containergameid").style.display = "flex";
    startgame();
}

function gotohome(origine) {
    document.title = "Chess - Home";
    switch (origine) {
        case "game":
            ongame = false;
            document.getElementById("containergameid").style.display = "none";
            break;
        case "settings":
            document.getElementById("containersettingsid").style.display = "none";
            break;
        case "replay":
            document.getElementById("menureplay").style.display = "none";
            document.getElementById("containergameid").style.display = "none";
            document.getElementById("containerhomeid").style.display = "flex";
            document.getElementById("statgioco1").style.display = "flex";
            document.getElementById("statgioco2").style.display = "flex";
            break;      
    }
    document.getElementById("containerhomeid").style.display = "flex";
}

function gotosettings() {
    document.title = "Chess - Settings";
    document.getElementById("containerhomeid").style.display = "none";
    document.getElementById("containersettingsid").style.display = "flex";
}

function gotoreplay() {
    alert("Funzione non ancora implementata");
    document.title = "Chess - Replay";
    document.getElementById("containerhomeid").style.display = "none";
    document.getElementById("statgioco1").style.display = "none";
    document.getElementById("statgioco2").style.display = "none";
    document.getElementById("menureplay").style.display = "flex";
    document.getElementById("containergameid").style.display = "flex";
}


/*Settings*/

var stilepedina = "img3pack";

function cambiostiliimmagini() {
    nummangWpedone.src =  stilepedina + "/Wpedone.png";
    nummangWcavallo.src =  stilepedina + "/Wcavallo.png";
    nummangWalfiere.src =  stilepedina + "/Walfiere.png";
    nummangWtorre.src =  stilepedina + "/Wtorre.png";
    nummangWregina.src =  stilepedina + "/Wregina.png";
    nummangBpedone.src =  stilepedina + "/Bpedone.png";
    nummangBcavallo.src =  stilepedina + "/Bcavallo.png";
    nummangBalfiere.src =  stilepedina + "/Balfiere.png";
    nummangBtorre.src =  stilepedina + "/Btorre.png";
    nummangBregina.src =  stilepedina + "/Bregina.png";
}

var aiutivisione = true;

var timecrono = 600;

var d = 3; //depth di default PvAI
var d1 = 3; //depth di AI1 AIvAI W
var d2 = 1; //depth di AI2 AIvAI B

/*Audio*/

var audio = true;

var startaudio = new Audio("audio/start.mp3");
var mossaaudio = new Audio("audio/mossa.mp3");
var mangiaaudio = new Audio("audio/mangia.mp3");
var arroccoaudio = new Audio("audio/arrocco.mp3");
var stopaudio = new Audio("audio/stop.mp3");

function allAudioStop() {
    startaudio.pause(); startaudio.currentTime = 0;
    mossaaudio.pause(); mossaaudio.currentTime = 0;
    mangiaaudio.pause(); mangiaaudio.currentTime = 0;
    arroccoaudio.pause(); arroccoaudio.currentTime = 0;
    stopaudio.pause(); stopaudio.currentTime = 0;
}


/*Gioco*/

function startgame() {
    if (audio == true) {allAudioStop(); startaudio.play();}
    ongame = true; AIloading = false;
    Wtorredxspostata = false; Wtorresxspostata = false; Btorredxspostata = false; Btorresxspostata = false;
    Brespostato = false; Wrespostato = false;
    Wpedonealvarco = new Array(8); Bpedonealvarco = new Array(8);
        for (r = 0; r < 8; r++) {
            Wpedonealvarco[r] = false; Bpedonealvarco[r] = false;
        };
    casella = new Array(8); //array della scacchiera principale
    casellelegalispost = new Array(8); //array con posizioni legali spostamento
    
    caselleminacciate = new Array(8);
    casellepossibili = new Array(8);
    casellepossibiliBOT = new Array(8);
    
    casellelegaliTC = new Array(8);
    casellelegaliTCret = new Array(8);
    
    casellelegali = new Array(8); //array utilizzato nei calcoli di trovacasellelegali() e isscacco()
    casellacheck = new Array(8); //array utilizzato nei calcoli di muovicheck()
    
    if (typegame == "PvAI") {
        mossedispBOT = [];
    };
        for (r = 0; r < 8; r++) {
            casella[r] = new Array(8);
            casellelegalispost[r] = new Array(8);
            
            caselleminacciate[r] = new Array(8);
            casellepossibili[r] = new Array(8);
            casellepossibiliBOT[r] = new Array(8);
            
            casellelegaliTC[r] = new Array(8);
            casellelegaliTCret[r] = new Array(8);
            
            
            casellelegali[r] = new Array(8);
            casellacheck[r] = new Array(8);
        };
    
    //B = black, W = white
    casella[0][0] = "Btorre"; casella[0][1] = "Bcavallo"; casella[0][2] = "Balfiere"; casella[0][3] = "Bregina"; casella[0][4] = "Bre"; casella[0][5] = "Balfiere"; casella[0][6] = "Bcavallo"; casella[0][7] = "Btorre";
    for (r = 0; r < 8; r++) {
        casella[1][r] = "Bpedone";
        casella[2][r] = "vuoto";
        casella[3][r] = "vuoto";
        casella[4][r] = "vuoto";
        casella[5][r] = "vuoto";
        casella[6][r] = "Wpedone";
    };
    casella[7][0] = "Wtorre"; casella[7][1] = "Wcavallo"; casella[7][2] = "Walfiere"; casella[7][3] = "Wregina"; casella[7][4] = "Wre"; casella[7][5] = "Walfiere"; casella[7][6] = "Wcavallo"; casella[7][7] = "Wtorre";
    for (r = 1; r < 11; r++) {
        switch(r) {case 1: rpm = "nBtorre"; break; case 2: rpm = "nWtorre"; break; case 3: rpm = "nBcavallo"; break; case 4: rpm = "nWcavallo"; break; case 5: rpm = "nBregina"; break; case 6: rpm = "nWregina"; break; case 7: rpm = "nBalfiere"; break; case 8: rpm = "nWalfiere"; break; case 9: rpm = "nBpedone"; break; case 10: rpm = "nWpedone"; break;}
        document.getElementById(rpm).innerHTML = 0;
    };
    document.getElementById("ultimainiziale").innerHTML = ""; document.getElementById("ultimafinale").innerHTML = "";
    selespostcasellastop();
    nstampe = -1; stampa();
    prossimamossa = "attesastart"; nclicco = 1;
    rischiestapattaB = false; rischiestapattaW = false; document.getElementById("pattaricB").style.backgroundColor = "#583424"; document.getElementById("pattaricW").style.backgroundColor = "#583424";
    mosseWtot = 0; document.getElementById("mosseW").innerHTML = "Mosse: " + mosseWtot;
    mosseBtot = 0; document.getElementById("mosseB").innerHTML = "Mosse: " + mosseBtot;
    cliccodisponibile = true;
    if (typegame == "AIvAI") {
        AIloading = true;
        cliccodisponibile = true;
        prossimamossa = "AIW";
        document.getElementById("depthW").innerHTML = "Depth: " + d1;
        document.getElementById("depthB").innerHTML = "Depth: " + d2;
        document.getElementById("turnoattuale").innerHTML = "AI Bianco";
        selespostcasellastop(); nstampe = -1; stampa();
        controlloturniAIvAI();
    };
}

var nclicco = 1;

function clicco(riga, colonna) { if (cliccodisponibile == true && AIloading == false) {
    if(prossimamossa == "attesastart") {
        prossimamossa = "W";
        //far parite qui il cronometro bianco
        console.log("start cronometro bianco");
    }
    if (nclicco == 1 && casella[riga][colonna] != "vuoto" && prossimamossa == casella[riga][colonna].charAt(0)) {//la casella che si vuole spostare
        if (casellaselcolorata == true) {
            selespostcasellastop();
        }
        casellaselezionata = casella[riga][colonna];
        rigaselezionata = riga;
        colonnaselezionata = colonna;
        mossacolselezionata = casellaselezionata.charAt(0);
        selezionatacasella();

        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                casellelegalispost[r][c] = false;
            }
        }
        
        trovacasellelegali(casella, casellaselezionata, rigaselezionata, colonnaselezionata, mossacolselezionata);
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                casellelegalispost[r][c] = casellelegali[r][c];
            }
        }
        
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                if (casellelegalispost[r][c] == true) {
                    muovicheck(casellaselezionata, rigaselezionata, colonnaselezionata, mossacolselezionata, casella[r][c], r, c, casella[r][c].charAt(0));
                    if (isscacco() == true) {
                        casellelegalispost[r][c] = false;
                    }
                }
            }
        }
        
        if (aiutivisione == true) {
            spostamentocasella();
        }
        
        nclicco = 2;
    }
    else if (nclicco == 2) {//il posto dove si vuole spostare
        if (casellaerrcolorata == true) {
            clearTimeout(timeouterr);
            errorecasellastop();
        }
        casellaspostamento = casella[riga][colonna];
        rigaspostamento = riga;
        colonnaspostamento = colonna;
        mossacolspostamento = casellaspostamento.charAt(0);
        
        if (mossacolselezionata == mossacolspostamento) { //pedina in un posto con pedina dello stesso colore
            nclicco = 1;
            clicco(rigaspostamento, colonnaspostamento);
            return;
        }
        
        if (casellelegalispost[rigaspostamento][colonnaspostamento] == true) {
            if (casellaselezionata == "Wre" && rigaselezionata == 7 && colonnaselezionata == 4 && ((rigaspostamento == 7 && colonnaspostamento == 6) || (rigaspostamento == 7 && colonnaspostamento == 2))) {
                if (rigaspostamento == 7 && colonnaspostamento == 6) {
                    spostaarrocco("W", "corto");
                }
                else if (rigaspostamento == 7 && colonnaspostamento == 2) {
                    spostaarrocco("W", "lungo");
                }
            }
            else if (casellaselezionata == "Bre" && rigaselezionata == 0 && colonnaselezionata == 4 && ((rigaspostamento == 0 && colonnaspostamento == 6) || (rigaspostamento == 0 && colonnaspostamento == 2))) {
                if (rigaspostamento == 0 && colonnaspostamento == 6) {
                    spostaarrocco("B", "corto");
                }
                else if (rigaspostamento == 0 && colonnaspostamento == 2) {
                    spostaarrocco("B", "lungo");
                }
            }
            else if (casellaselezionata == "Wpedone" && Bpedonealvarco[colonnaspostamento] == true && rigaselezionata == 3 && rigaspostamento == 2) {
                mangiaenpassant("W");
            }
            else if (casellaselezionata == "Bpedone" && Wpedonealvarco[colonnaspostamento] == true && rigaselezionata == 4 && rigaspostamento == 5) {
                mangiaenpassant("B");
            }
            else if (casella[rigaspostamento][colonnaspostamento] == "vuoto") {
                sposta();
            }
            else {
                mangia();
            }
            
            if (casellaselezionata == "Wre" || casellaselezionata == "Bre") {
                controllore();
            } else if (casellaselezionata == "Wtorre" || casellaselezionata == "Btorre") {
                controllotorri();
            } else if (casellaselezionata == "Wpedone" || casellaselezionata == "Bpedone") {
                controllopedoni();
                if (casellaselezionata == "Wpedone" && rigaselezionata == 6 && rigaspostamento == 4) {
                    Wpedonealvarco[colonnaspostamento] = true;
                }
                else if (casellaselezionata == "Bpedone" && rigaselezionata == 1 && rigaspostamento == 3) {
                    Bpedonealvarco[colonnaspostamento] = true;
                }
            }
        }
        else if (casellelegalispost[rigaspostamento][colonnaspostamento] == false) {
            errorecasella();
        }
    }
    else {
        if (casella[riga][colonna] != "vuoto") {
            console.warn("Non Ã¨ il tuo turno!");
        }
        else {
            console.warn("Seleziona una casella non vuota!"); 
        }
    }
}}

function controllore() {
    if (Brespostato == false && rigaselezionata == 0 && colonnaselezionata == 4) {Brespostato = true;}
    else if (Wrespostato == false && rigaselezionata == 7 && colonnaselezionata == 4) {Wrespostato = true;} 
}

function controllotorri() {
    if (Wtorredxspostata == false && rigaselezionata == 7 && colonnaselezionata == 7) {Wtorredxspostata = true;}
    else if (Wtorresxspostata == false && rigaselezionata == 7 && colonnaselezionata == 0) {Wtorresxspostata = true;}
    else if (Btorredxspostata == false && rigaselezionata == 0 && colonnaselezionata == 7) {Btorredxspostata = true;}
    else if (Btorresxspostata == false && rigaselezionata == 0 && colonnaselezionata == 0) {Btorresxspostata = true;}
}

function controllopedoni() {
    if (casellaselezionata == "Wpedone" && rigaspostamento == 0) {
        casella[0][colonnaspostamento] = "Wregina"
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                document.getElementById("img" + (r * 8 + c)).src = stilepedina + '/' + casella[r][c] + '.png';
            }
        }
        console.warn("Cambio pedone bianco\nRiga: " + rigaspostamento + " Colonna: " + colonnaspostamento); //cancella questa stringa dopo aver fatto la funzione cambia
    }
    else if (casellaselezionata == "Bpedone" && rigaspostamento == 7) {
        casella[7][colonnaspostamento] = "Bregina"
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                document.getElementById("img" + (r * 8 + c)).src = stilepedina + '/' + casella[r][c] + '.png';
            }
        }
        console.warn("Cambio pedone nero\nRiga: " + rigaspostamento + " Colonna: " + colonnaspostamento); //cancella questa stringa dopo aver fatto la funzione cambia
    }
}

function sposta() {
    if (audio == true) {allAudioStop(); mossaaudio.play();};
    casella[rigaspostamento][colonnaspostamento] = casellaselezionata;
    casella[rigaselezionata][colonnaselezionata] = casellaspostamento;
    nclicco = 1;
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 8; c++) {
            casellelegali[r][c] = false;
            casellelegalispost[r][c] = false;
        }
    } puntatore(rigaspostamento, colonnaspostamento);
    resetpedonienpassant();
    selespostcasellastop();
    stampa();
    setTimeout(controlloturni, 1);
}

function mangia() {
    if (audio == true) {allAudioStop(); mangiaaudio.play();};
    nummangiato = eval(document.getElementById("n" + casella[rigaspostamento][colonnaspostamento]).innerHTML); nummangiato++;
    document.getElementById("n" + casella[rigaspostamento][colonnaspostamento]).innerHTML = nummangiato;
    casella[rigaspostamento][colonnaspostamento] = casellaselezionata;
    casella[rigaselezionata][colonnaselezionata] = "vuoto";
    nclicco = 1;
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 8; c++) {
            casellelegali[r][c] = false;
            casellelegalispost[r][c] = false;
        }
    } puntatore(rigaspostamento, colonnaspostamento);
    resetpedonienpassant();
    selespostcasellastop();
    stampa();
    setTimeout(controlloturni, 1);
}

function mangiaenpassant(colore) {
    if (audio == true) {allAudioStop(); mangiaaudio.play();};
    casella[rigaspostamento][colonnaspostamento] = casellaselezionata;
    casella[rigaselezionata][colonnaselezionata] = "vuoto";
    switch(colore) {
        case "B":
            casella[rigaspostamento - 1][colonnaspostamento] = "vuoto";   
         break;
        case "W":
            casella[rigaspostamento + 1][colonnaspostamento] = "vuoto";
         break; 
    }
    nclicco = 1;
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 8; c++) {
            casellelegali[r][c] = false;
            casellelegalispost[r][c] = false;
        }
    } puntatore(rigaspostamento, colonnaspostamento);
    resetpedonienpassant();
    selespostcasellastop();
    stampa();
    setTimeout(controlloturni, 1);
}

function resetpedonienpassant() {
    for (r = 0; r < 8; r++) {
        Wpedonealvarco[r] = false; Bpedonealvarco[r] = false;
    }
}

function spostaarrocco(colore, lunghezza) {
    if (audio == true) {allAudioStop(); arroccoaudio.play();};
    casella[rigaspostamento][colonnaspostamento] = casellaselezionata;
    casella[rigaselezionata][colonnaselezionata] = "vuoto";
    switch(colore) {
        case "W":
            switch (lunghezza) {
                case "corto":
                    casella[7][5] = "Wtorre"; casella[7][7] = "vuoto";
                    break;
                case "lungo":
                    casella[7][3] = "Wtorre"; casella[7][0] = "vuoto";
                    break;
            }
            break;
        case "B":
            switch (lunghezza) {
                case "corto":
                    casella[0][5] = "Btorre"; casella[0][7] = "vuoto";
                    break;
                case "lungo":
                    casella[0][3] = "Btorre"; casella[0][0] = "vuoto";
                    break;
            }
            break;
    }
    nclicco = 1;
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 8; c++) {
            casellelegali[r][c] = false;
            casellelegalispost[r][c] = false;
        }
    } puntatore(rigaspostamento, colonnaspostamento);
    resetpedonienpassant();
    selespostcasellastop();
    stampa();
    setTimeout(controlloturni, 1);
}

function controlloturni() {
    //sistemare qui le partenze e stop dei cronometri
    if (prossimamossa == "W") {
        mosseWtot++; document.getElementById("mosseW").innerHTML = "Mosse: " + mosseWtot;
        
        trovacaselle("W", "B");
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                casellepossibili[r][c] = casellelegaliTCret[r][c]
            }
        } //casellepossibili
        
        trovacaselle("B", "W");
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                caselleminacciate[r][c] = casellelegaliTCret[r][c]
            }
        } //caselleminacciate
        
        controllawin("W", "B");
        //se nessuno vince e non c'Ã¨ patta

        if (typegame == "PvAI" && ongame == true) {
            //document.getElementById("turnoattuale").innerHTML = "AI";
            prossimamossa = "AI";
            controlloturni();
            return;
        }
        else if (typegame == "PvP") {
            prossimamossa = "B";
        }
    }
    else if (prossimamossa == "B") {
        mosseBtot++; document.getElementById("mosseB").innerHTML = "Mosse: " + mosseBtot;
        
        trovacaselle("B", "W"); //dove si puÃ² spostare B
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                casellepossibili[r][c] = casellelegaliTCret[r][c]
            }
        } //casellepossibili
        
        trovacaselle("W", "B"); //dove si puÃ² spostare W
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                caselleminacciate[r][c] = casellelegaliTCret[r][c]
            }
        } //caselleminacciate
        
        controllawin("B", "W");
        
        //se nessuno vince e non c'Ã¨ patta
        prossimamossa = "W";
    }
    else if (prossimamossa == "AI") {
        turnoAI();
        stampa();
        
        trovacaselle("B", "W"); //dove si puÃ² spostare B
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                casellepossibili[r][c] = casellelegaliTCret[r][c]
            }
        } //casellepossibili

        trovacaselle("W", "B"); //dove si puÃ² spostare W
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                caselleminacciate[r][c] = casellelegaliTCret[r][c]
            }
        } //caselleminacciate

        controllawin("B", "W");
        
        if (typegame == "PvAI") {
            prossimamossa = "W";  
        }
    }
}

function controlloturniAIvAI() {
    //sistemare qui le partenze e stop dei cronometri
    if (prossimamossa == "AIW" && ongame == true) {
        //mosseWtot++; document.getElementById("mosseW").innerHTML = "Mosse: " + mosseWtot;
        
        turnoAIW();
        stampa();
        
        trovacaselle("W", "B");
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                casellepossibili[r][c] = casellelegaliTCret[r][c]
            }
        } //casellepossibili
        
        trovacaselle("B", "W");
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                caselleminacciate[r][c] = casellelegaliTCret[r][c]
            }
        } //caselleminacciate
        
        controllawin("W", "B");
        //se nessuno vince e non c'Ã¨ patta

        prossimamossa = "AIB";
        setTimeout(controlloturniAIvAI, 100);
        return;
    }
    else if (prossimamossa == "AIB" && ongame == true) {
        //mosseBtot++; document.getElementById("mosseB").innerHTML = "Mosse: " + mosseBtot;
        
        turnoAIB();
        stampa();
        
        trovacaselle("B", "W"); //dove si puÃ² spostare B
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                casellepossibili[r][c] = casellelegaliTCret[r][c]
            }
        } //casellepossibili
        
        trovacaselle("W", "B"); //dove si puÃ² spostare W
        for (r = 0; r < 8; r++) {
            for (c = 0; c < 8; c++) {
                caselleminacciate[r][c] = casellelegaliTCret[r][c]
            }
        } //caselleminacciate
        
        controllawin("B", "W");
        //se nessuno vince e non c'Ã¨ patta
        
        prossimamossa = "AIW";
        setTimeout(controlloturniAIvAI, 100);
        return;
    };
}

function controllawin(EvVincitore, EvPerdente) {
    if (solo2re() == true) {
        patta();
    };
    
    for (r = 0; r < 8; r++) {
        if (casellepossibili[r].includes(true)) {
            return; //spostamenti disponibili
        };
    };
    
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 8; c++) {
            if(casella[r][c] == EvPerdente + "re") {
                rigaRePerdente = r;
                colonnaRePerdente = c;
            };
        };
    };
    
    if (caselleminacciate[rigaRePerdente][colonnaRePerdente] == true) {
        switch(EvVincitore){
            case "W":
                vinceW();
                break;
            case "B":
                vinceB();
                break;
        };
    }
    else if (caselleminacciate[rigaRePerdente][colonnaRePerdente] == false) {
        patta();         
    };
}

function solo2re() {
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 8; c++) {
            if(casella[r][c] != "Wre" && casella[r][c] != "Bre" && casella[r][c] != "vuoto") {
                return;
            };
        };
    };
    return true;
}

/*Funzioni di fine in gioco*/

function vinceB() {
    if (audio == true) {stopaudio.play();}
    ongame = false;
    cliccodisponibile = false;
    alert("Il nero vince!");
}

function vinceW() {
    if (audio == true) {stopaudio.play();}
    ongame = false;
    cliccodisponibile = false;
    alert("Il bianco vince!");
}

function patta() {
    if (audio == true) {stopaudio.play();}
    ongame = false;
    cliccodisponibile = false;
    alert("Patta!");
}

function pattarichiesta(colore) {
    switch (colore) {
        case "B":
            if (cliccodisponibile == true) {
                if (rischiestapattaB == false) {
                    rischiestapattaB = true;
                    document.getElementById("pattaricB").style.backgroundColor = "#331e15";               
                }
                else if (rischiestapattaB == true) {
                    rischiestapattaB = false;
                    document.getElementById("pattaricB").style.backgroundColor = "#583424";            
                }
            }
            break;
        case "W":
            if (cliccodisponibile == true) {
                if (rischiestapattaW == false) {
                    rischiestapattaW = true;
                    document.getElementById("pattaricW").style.backgroundColor = "#331e15";                
                }
                else if (rischiestapattaW == true) {
                    rischiestapattaW = false;
                    document.getElementById("pattaricW").style.backgroundColor = "#583424";            
                }
            }
            break;
    }
    
    if (rischiestapattaB == true && rischiestapattaW == true && cliccodisponibile == true) {
        patta();
    }
}

/*Funzioni ricerca caselle legali in gioco*/

function trovacasellelegali(casellaTCL, casellaselezionataTCL, rigaselezionataTCL, colonnaselezionataTCL, mossacolselezionataTCL, type) {
    for (rTCL = 0; rTCL < 8; rTCL++) {
        for (cTCL = 0; cTCL < 8; cTCL++) {
            casellelegali[rTCL][cTCL] = false;
        }
    }
    if (casellaselezionataTCL== "Bpedone" || casellaselezionataTCL== "Wpedone") { //spostare il pedone
        if (casellaselezionataTCL== "Wpedone") { //pedone bianco
            if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL - 1].charAt(0) == "B") {
                casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL - 1] = true;
            }//diagonale per mangiare sx
            if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL + 1].charAt(0) == "B") {
                casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL + 1] = true;
            }//diagonale per mangiare dx
            if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL - 1] == "vuoto" && Bpedonealvarco[colonnaselezionataTCL - 1] == true && rigaselezionataTCL == 3) {
                casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL - 1] = true;
            }//diagonale per mangiare en passant sx
            if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL + 1] == "vuoto" && Bpedonealvarco[colonnaselezionataTCL + 1] == true && rigaselezionataTCL == 3) {
                casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL + 1] = true;
            }//diagonale per mangiare en passant dx
            if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL] == "vuoto") {
                casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL] = true;
            }//avanti
            if (rigaselezionataTCL == 6 && casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL - 2][colonnaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL] == "vuoto" && casellaTCL[rigaselezionataTCL - 2][colonnaselezionataTCL] == "vuoto") {
                casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL] = true;
                casellelegali[rigaselezionataTCL - 2][colonnaselezionataTCL] = true;
            }//avanti prima mossa
        }
        else if (casellaselezionataTCL== "Bpedone") { //pedone nero
            if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL - 1].charAt(0) == "W") {
                casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL - 1] = true;
            }//diagonale per mangiare sx
            if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL + 1].charAt(0) == "W") {
                casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL + 1] = true;
            }//diagonale per mangiare dx
            if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL - 1] == "vuoto" && Wpedonealvarco[colonnaselezionataTCL - 1] == true && rigaselezionataTCL == 4) {
                casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL - 1] = true;
            }//diagonale per mangiare en passant sx
            if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL + 1] == "vuoto" && Wpedonealvarco[colonnaselezionataTCL + 1] == true && rigaselezionataTCL == 4) {
                casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL + 1] = true;
            }//diagonale per mangiare en passant dx
            if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL] == "vuoto") {
                casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL] = true;
            }//avanti
            if (rigaselezionataTCL == 1 && casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL + 2][colonnaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL] == "vuoto" && casellaTCL[rigaselezionataTCL + 2][colonnaselezionataTCL] == "vuoto") {
                casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL] = true;
                casellelegali[rigaselezionataTCL + 2][colonnaselezionataTCL] = true;
            }//avanti prima mossa
        }
    }
    else if (casellaselezionataTCL== "Btorre" || casellaselezionataTCL== "Wtorre") {
        controlloTorreRegina(casellaTCL, casellaselezionataTCL, rigaselezionataTCL, colonnaselezionataTCL, mossacolselezionataTCL);
    }
    else if (casellaselezionataTCL== "Balfiere" || casellaselezionataTCL== "Walfiere") {
        controlloAlfiereRegina(casellaTCL, casellaselezionataTCL, rigaselezionataTCL, colonnaselezionataTCL, mossacolselezionataTCL);
    }
    else if (casellaselezionataTCL== "Bregina" || casellaselezionataTCL== "Wregina") {
        controlloTorreRegina(casellaTCL, casellaselezionataTCL, rigaselezionataTCL, colonnaselezionataTCL, mossacolselezionataTCL);
        controlloAlfiereRegina(casellaTCL, casellaselezionataTCL, rigaselezionataTCL, colonnaselezionataTCL, mossacolselezionataTCL);
    }
    else if (casellaselezionataTCL== "Bcavallo" || casellaselezionataTCL== "Wcavallo") {
        if (casellaTCL[rigaselezionataTCL - 2] != undefined && casellaTCL[rigaselezionataTCL - 2][colonnaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL - 2][colonnaselezionataTCL + 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - 2][colonnaselezionataTCL + 1] = true;
        }//su su dx
        if (casellaTCL[rigaselezionataTCL - 2] != undefined && casellaTCL[rigaselezionataTCL - 2][colonnaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 2][colonnaselezionataTCL - 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - 2][colonnaselezionataTCL - 1] = true;
        }//su su sx
        if (casellaTCL[rigaselezionataTCL + 2] != undefined && casellaTCL[rigaselezionataTCL + 2][colonnaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 2][colonnaselezionataTCL + 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + 2][colonnaselezionataTCL + 1] = true;
        }//giu giu dx
        if (casellaTCL[rigaselezionataTCL + 2] != undefined && casellaTCL[rigaselezionataTCL + 2][colonnaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL + 2][colonnaselezionataTCL - 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + 2][colonnaselezionataTCL - 1] = true;
        }//giu giu sx
        if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL + 2] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL + 2].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL + 2] = true;
        }//dx dx su
        if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL + 2] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL + 2].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL + 2] = true;
        }//dx dx giu
        if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL - 2] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL - 2].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL - 2] = true;
        }//sx sx su
        if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL - 2] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL - 2].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL - 2] = true;
        }//sx sx giu
    }
    else if (casellaselezionataTCL== "Bre" || casellaselezionataTCL== "Wre") {
        if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL] = true;
        }//su
        if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL] = true;
        }//giu
        if (casellaTCL[rigaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL][colonnaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL][colonnaselezionataTCL + 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL][colonnaselezionataTCL + 1] = true;
        }//dx
        if (casellaTCL[rigaselezionataTCL] != undefined && casellaTCL[rigaselezionataTCL][colonnaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL][colonnaselezionataTCL - 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL][colonnaselezionataTCL - 1] = true;
        }//sx
        if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL + 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL + 1] = true;
        }//su dx
        if (casellaTCL[rigaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL - 1][colonnaselezionataTCL - 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - 1][colonnaselezionataTCL - 1] = true;
        }//su sx
        if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL + 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL + 1] = true;
        }//giu dx
        if (casellaTCL[rigaselezionataTCL + 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL - 1] != undefined && casellaTCL[rigaselezionataTCL + 1][colonnaselezionataTCL - 1].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + 1][colonnaselezionataTCL - 1] = true;
        }//giu sx
        
        if (type != "bot") {
            if (casellaselezionataTCL== "Wre" && rigaselezionataTCL == 7 && colonnaselezionataTCL == 4 && Wrespostato == false && caselleminacciate[7][4] != true) {
                if (casellaTCL[7][5] == "vuoto" && casellaTCL[7][6] == "vuoto" && casellaTCL[7][7] == "Wtorre" && Wtorredxspostata == false && caselleminacciate[7][5] != true && caselleminacciate[7][6] != true) {
                    casellelegali[rigaselezionataTCL][colonnaselezionataTCL + 2] = true;
                } //W arrocco corto
                if (casellaTCL[7][3] == "vuoto" && casellaTCL[7][2] == "vuoto" && casellaTCL[7][1] == "vuoto" && casellaTCL[7][0] == "Wtorre" && Wtorresxspostata == false && caselleminacciate[7][2] != true && caselleminacciate[7][3] != true) {
                    casellelegali[rigaselezionataTCL][colonnaselezionataTCL - 2] = true;
                } //W arrocco lungo
            }
            if (casellaselezionataTCL== "Bre" && rigaselezionataTCL == 0 && colonnaselezionataTCL == 4 && Brespostato == false && caselleminacciate[0][4] != true) {
                if (casellaTCL[0][5] == "vuoto" && casellaTCL[0][6] == "vuoto" && casellaTCL[0][7] == "Btorre" && Btorredxspostata == false && caselleminacciate[0][5] != true && caselleminacciate[0][6] != true) {
                    casellelegali[rigaselezionataTCL][colonnaselezionataTCL + 2] = true;
                } //B arrocco corto
                if (casellaTCL[0][3] == "vuoto" && casellaTCL[0][2] == "vuoto" && casellaTCL[0][1] == "vuoto" && casellaTCL[0][0] == "Btorre" && Btorresxspostata == false && caselleminacciate[0][2] != true && caselleminacciate[0][3] != true) {
                    casellelegali[rigaselezionataTCL][colonnaselezionataTCL - 2] = true;
                } //B arrocco lungo
            }
        }
    }
    return casellelegali;
}

function controlloTorreRegina(casellaTCL, casellaselezionataTCL, rigaselezionataTCL, colonnaselezionataTCL, mossacolselezionataTCL) {
    for (p = 1; p < 8; p++) { //torre/regina giu
        if (casellaTCL[rigaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL] == "vuoto") {
            casellelegali[rigaselezionataTCL + p][colonnaselezionataTCL] = true;
        } else if (casellaTCL[rigaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + p][colonnaselezionataTCL] = true;
            break;
        } else {break;}
    }
    for (p = 1; p < 8; p++) { //torre/regina su
        if (casellaTCL[rigaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL] == "vuoto") {
            casellelegali[rigaselezionataTCL - p][colonnaselezionataTCL] = true;
        } else if (casellaTCL[rigaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - p][colonnaselezionataTCL] = true;
            break;
        } else {break;}
    }
    for (p = 1; p < 8; p++) { //torre/regina dx
        if (casellaTCL[rigaselezionataTCL][colonnaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL][colonnaselezionataTCL + p] == "vuoto") {
            casellelegali[rigaselezionataTCL][colonnaselezionataTCL + p] = true;
        } else if (casellaTCL[rigaselezionataTCL][colonnaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL][colonnaselezionataTCL + p].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL][colonnaselezionataTCL + p] = true;
            break;
        } else {break;}
    }
    for (p = 1; p < 8; p++) { //torre/regina sx
        if (casellaTCL[rigaselezionataTCL][colonnaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL][colonnaselezionataTCL - p] == "vuoto") {
            casellelegali[rigaselezionataTCL][colonnaselezionataTCL - p] = true;
        } else if (casellaTCL[rigaselezionataTCL][colonnaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL][colonnaselezionataTCL - p].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL][colonnaselezionataTCL - p] = true;
            break;
        } else {break;}
    }
}

function controlloAlfiereRegina(casellaTCL, casellaselezionataTCL, rigaselezionataTCL, colonnaselezionataTCL, mossacolselezionataTCL) {
    for (p = 1; p < 8; p++) { //alfiere/regina giu
        if (casellaTCL[rigaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL + p] == "vuoto") {
            casellelegali[rigaselezionataTCL + p][colonnaselezionataTCL + p] = true;
        } else if (casellaTCL[rigaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL + p].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + p][colonnaselezionataTCL + p] = true;
            break;
        } else {break;}
    }
    for (p = 1; p < 8; p++) { //alfiere/regina su
        if (casellaTCL[rigaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL - p] == "vuoto") {
            casellelegali[rigaselezionataTCL - p][colonnaselezionataTCL - p] = true;
        } else if (casellaTCL[rigaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL - p].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - p][colonnaselezionataTCL - p] = true;
            break;
        } else {break;}
    }
    for (p = 1; p < 8; p++) { //alfiere/regina sx
        if (casellaTCL[rigaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL - p] == "vuoto") {
            casellelegali[rigaselezionataTCL + p][colonnaselezionataTCL - p] = true;
        } else if (casellaTCL[rigaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL + p][colonnaselezionataTCL - p].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL + p][colonnaselezionataTCL - p] = true;
            break;
        } else {break;}
    }
    for (p = 1; p < 8; p++) { //alfiere/regina dx
        if (casellaTCL[rigaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL + p] == "vuoto") {
            casellelegali[rigaselezionataTCL - p][colonnaselezionataTCL + p] = true;
        } else if (casellaTCL[rigaselezionataTCL - p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL + p] != undefined && casellaTCL[rigaselezionataTCL - p][colonnaselezionataTCL + p].charAt(0) != mossacolselezionataTCL) {
            casellelegali[rigaselezionataTCL - p][colonnaselezionataTCL + p] = true;
            break;
        } else {break;}
    }
}

/*Funzioni scacco e scaccomatto in gioco*/

function muovicheck(casellaselezionataMC, rigaselezionataMC, colonnaselezionataMC, mossacolselezionataMC, casellaspostamentoMC, rigaspostamentoMC, colonnaspostamentoMC, mossacolspostamentoMC) {
    for (rMC = 0; rMC < 8; rMC++) {
        for (cMC = 0; cMC < 8; cMC++) {
            casellacheck[rMC][cMC] = casella[rMC][cMC];
        }
    }
    
    if (casellaselezionataMC== "Wre" && rigaselezionataMC == 7 && colonnaselezionataMC == 4 && ((rigaspostamentoMC == 7 && colonnaspostamentoMC == 6) || (rigaspostamentoMC == 7 && colonnaspostamentoMC == 2))) {
        if (rigaspostamentoMC == 7 && colonnaspostamentoMC == 6) {
            casellacheck[rigaspostamentoMC][colonnaspostamentoMC] = casellaselezionataMC;
            casellacheck[rigaselezionataMC][colonnaselezionataMC] = "vuoto";
            casellacheck[7][5] = "Wtorre"; casellacheck[7][7] = "vuoto";
        }
        else if (rigaspostamentoMC == 7 && colonnaspostamentoMC == 2) {
            casellacheck[rigaspostamentoMC][colonnaspostamentoMC] = casellaselezionataMC;
            casellacheck[rigaselezionataMC][colonnaselezionataMC] = "vuoto";
            casellacheck[7][3] = "Wtorre"; casellacheck[7][0] = "vuoto";
        }
    }
    else if (casellaselezionataMC== "Bre" && rigaselezionataMC == 0 && colonnaselezionataMC == 4 && ((rigaspostamentoMC == 0 && colonnaspostamentoMC == 6) || (rigaspostamentoMC == 0 && colonnaspostamentoMC == 2))) {
        if (rigaspostamentoMC == 0 && colonnaspostamentoMC == 6) {
            casellacheck[rigaspostamentoMC][colonnaspostamentoMC] = casellaselezionataMC;
            casellacheck[rigaselezionataMC][colonnaselezionataMC] = "vuoto";
            casellacheck[0][5] = "Btorre"; casellacheck[0][7] = "vuoto";
        }
        else if (rigaspostamentoMC == 0 && colonnaspostamentoMC == 2) {
            casellacheck[rigaspostamentoMC][colonnaspostamentoMC] = casellaselezionataMC;
            casellacheck[rigaselezionataMC][colonnaselezionataMC] = "vuoto";
            casellacheck[0][3] = "Btorre"; casellacheck[0][0] = "vuoto";
        }
    }
    else if (casellaselezionataMC== "Wpedone" && Bpedonealvarco[colonnaspostamentoMC] == true && rigaselezionataMC == 3 && rigaspostamentoMC == 2) {
        casellacheck[rigaspostamentoMC][colonnaspostamentoMC] = casellaselezionataMC;
        casellacheck[rigaselezionataMC][colonnaselezionataMC] = "vuoto";
        casellacheck[rigaspostamentoMC + 1][colonnaspostamentoMC] = "vuoto";
    }
    else if (casellaselezionataMC== "Bpedone" && Wpedonealvarco[colonnaspostamentoMC] == true && rigaselezionataMC == 4 && rigaspostamentoMC == 5) {
        casellacheck[rigaspostamentoMC][colonnaspostamentoMC] = casellaselezionataMC;
        casellacheck[rigaselezionataMC][colonnaselezionataMC] = "vuoto";
        casellacheck[rigaspostamentoMC - 1][colonnaspostamentoMC] = "vuoto";
    }
    else if (casellaspostamentoMC == "vuoto") {
        casellacheck[rigaspostamentoMC][colonnaspostamentoMC] = casellaselezionataMC;
        casellacheck[rigaselezionataMC][colonnaselezionataMC] = "vuoto";
    }
    else {
        casellacheck[rigaspostamentoMC][colonnaspostamentoMC] = casellaselezionataMC;
        casellacheck[rigaselezionataMC][colonnaselezionataMC] = "vuoto";
    }
}

function isscacco() {
    switch(mossacolselezionata) {
        case "W": coloreopposto = "B"; break;
        case "B": coloreopposto = "W"; break;
    }
    
    for (rIS = 0; rIS < 8; rIS++) {
        for (cIS = 0; cIS < 8; cIS++) {
            if (casellacheck[rIS][cIS].charAt(0) == coloreopposto) { //per tutte le caselle opposte
                
                for (rR = 0; rR < 8; rR++) {
                    for (cR = 0; cR < 8; cR++) {
                        if(casellacheck[rR][cR] == mossacolselezionata + "re") { //trova il nostro re
                            rigaRe = rR;
                            colonnaRe = cR;
                        }
                    }
                }
                
                trovacasellelegali(casellacheck, casellacheck[rIS][cIS], rIS, cIS, coloreopposto); //trova le posizioni minacciate da la casella in cui Ã¨
                
                if (casellelegali[rigaRe][colonnaRe] == true) { //controlla se il nostro re Ã¨ in una di queste
                    return true;
                }
            }    
        }
    }
}

function trovacaselle(coloreatt, coloreopp) {
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 8; c++) {
            casellelegaliTC[r][c] = false;
            casellelegaliTCret[r][c] = false;
        }
    }
    for (rCS = 0; rCS < 8; rCS++) {
        for (cCS = 0; cCS < 8; cCS++) {
            if (casella[rCS][cCS].charAt(0) == coloreopp) {
                for (r = 0; r < 8; r++) {
                    for (c = 0; c < 8; c++) {
                        casellelegaliTC[r][c] = false;
                    }
                }

                trovacasellelegali(casella, casella[rCS][cCS], rCS, cCS, casella[rCS][cCS].charAt(0));
                for (r = 0; r < 8; r++) {
                    for (c = 0; c < 8; c++) {
                        casellelegaliTC[r][c] = casellelegali[r][c];
                    }
                }
                
                for (r = 0; r < 8; r++) {
                    for (c = 0; c < 8; c++) {
                        if (casellelegaliTC[r][c] == true) {
                            muovicheck(casella[rCS][cCS], rCS, cCS, casella[rCS][cCS].charAt(0), casella[r][c], r, c, casella[r][c].charAt(0));
                            if (isscaccoCSP(coloreopp, coloreatt) == true) {
                                casellelegaliTC[r][c] = false;
                            }
                        }
                    }
                }
                
                for (r = 0; r < 8; r++) {
                    for (c = 0; c < 8; c++) {
                        if (casellelegaliTCret[r][c] == false && casellelegaliTC[r][c] == true) {
                            casellelegaliTCret[r][c] = casellelegaliTC[r][c];
                        }
                    }
                }
             
            }
        }
    }
    return casellelegaliTCret;
}

function isscaccoCSP(coloreatt, coloreopp) {
    for (rIS = 0; rIS < 8; rIS++) {
        for (cIS = 0; cIS < 8; cIS++) {
            if (casellacheck[rIS][cIS].charAt(0) == coloreopp) { //per tutte le caselle opposte
                
                for (rR = 0; rR < 8; rR++) {
                    for (cR = 0; cR < 8; cR++) {
                        if(casellacheck[rR][cR] == coloreatt + "re") { //trova il nostro re
                            rigaRe = rR;
                            colonnaRe = cR;
                        }
                    }
                }
                
                trovacasellelegali(casellacheck, casellacheck[rIS][cIS], rIS, cIS, coloreopp); //trova le posizioni minacciate da la casella in cui Ã¨
                
                if (casellelegali[rigaRe][colonnaRe] == true) { //controlla se il nostro re Ã¨ in una di queste
                    return true;
                }
            }
        }
    }
}

/*Funzioni di tempo in gioco*/

function starttempo() {
    cronowhite = timecrono;
    cronoblack = timecrono;
}

function cronoW() { //deve diminuire una variabile uguale a quella della funzione tempo() e quando arriva a 0 fa vincere l'altro
    console.log("ciao")
    settimewhite = setTimeout(cronoW, 1000); //clearTimeout(settimewhite)
}

function cronoB() {
    console.log("ciao2")
    settimeblack = setTimeout(cronoB, 1000); //clearTimeout(settimeblack)
}

/*Funzioni di interfaccia utente in gioco*/

function stampa() {
    nstampe++;
    for (r = 0; r < 8; r++) { //stampa l'array sulla scacchiera
        for (c = 0; c < 8; c++) {
            document.getElementById("img" + (r * 8 + c)).src = stilepedina + '/' + casella[r][c] + '.png';
        }
    }
    cambiostiliimmagini();
    if (nstampe == 0) {
        document.getElementById("ultimaimg").src = stilepedina + "/vuoto.png";
        document.getElementById("turnoattuale").innerHTML = "Bianco";
    }
    if (nstampe != 0) {
        document.getElementById("ultimaimg").src = stilepedina + "/" + casellaselezionata + ".png";
        switch(colonnaselezionata) {
            case 0: letterainizio = "A"; break; case 1: letterainizio = "B"; break; case 2: letterainizio = "C"; break; case 3: letterainizio = "D"; break; case 4: letterainizio = "E"; break; case 5: letterainizio = "F"; break; case 6: letterainizio = "G"; break; case 7: letterainizio = "H"; break; default: console.error("Errore");
        }
        switch(colonnaspostamento) {
            case 0: letterafine = "A"; break; case 1: letterafine = "B"; break; case 2: letterafine = "C"; break; case 3: letterafine = "D"; break; case 4: letterafine = "E"; break; case 5: letterafine = "F"; break; case 6: letterafine = "G"; break; case 7: letterafine = "H"; break; default: console.error("Errore");
        }
        document.getElementById("ultimainiziale").innerHTML = "Da " + letterainizio + Math.abs(rigaselezionata - 8) ;
        document.getElementById("ultimafinale").innerHTML = "A " + letterafine + Math.abs(rigaspostamento - 8);
        if (typegame == "PvAI") {
            if (prossimamossa == "AI") {document.getElementById("turnoattuale").innerHTML = "Bianco";}
            else if (prossimamossa == "W") {document.getElementById("turnoattuale").innerHTML = "AI";}
        }
        else if (typegame == "PvP") {
            if (prossimamossa == "B") {document.getElementById("turnoattuale").innerHTML = "Bianco";}
            else if (prossimamossa == "W") {document.getElementById("turnoattuale").innerHTML = "Nero";}
        }
        
    }
}

var casellaerrcolorata = false;

function errorecasella() {
    casellaerrcolorata = true;
    casellaerr = rigaspostamento * 8 + colonnaspostamento;
    if (rigaspostamento % 2 == 0) {
        if (casellaerr % 2 == 0){
            document.getElementById("img" + casellaerr).style.backgroundImage = "url(imgbase/legnochiaroerr.png)"; document.getElementById("img" + casellaerr).style.backgroundSize = "cover";         
        }
        else if (casellaerr % 2 == 1){
            document.getElementById("img" + casellaerr).style.backgroundImage = "url(imgbase/legnoscuroerr.png)"; document.getElementById("img" + casellaerr).style.backgroundSize = "cover";         
        }
    }
    else if (rigaspostamento % 2 == 1) {
        if (casellaerr % 2 == 1){
            document.getElementById("img" + casellaerr).style.backgroundImage = "url(imgbase/legnochiaroerr.png)"; document.getElementById("img" + casellaerr).style.backgroundSize = "cover";           
        }
        else if (casellaerr % 2 == 0){
            document.getElementById("img" + casellaerr).style.backgroundImage = "url(imgbase/legnoscuroerr.png)"; document.getElementById("img" + casellaerr).style.backgroundSize = "cover";         
        }
    }
    timeouterr = setTimeout(errorecasellastop, 1500);
}

function errorecasellastop() {
    if (rigaspostamento % 2 == 0) {
        if (casellaerr % 2 == 0){
            document.getElementById("img" + casellaerr).style.backgroundImage = "url(imgbase/legnochiaro.png)";           
        }
        else if (casellaerr % 2 == 1){
            document.getElementById("img" + casellaerr).style.backgroundImage = "url(imgbase/legnoscuro.png)";         
        }
    }
    else if (rigaspostamento % 2 == 1) {
        if (casellaerr % 2 == 1){
            document.getElementById("img" + casellaerr).style.backgroundImage = "url(imgbase/legnochiaro.png)";           
        }
        else if (casellaerr % 2 == 0){
            document.getElementById("img" + casellaerr).style.backgroundImage = "url(imgbase/legnoscuro.png)";         
        }
    }
    casellaerrcolorata = false;
}

var casellaselcolorata = false;

function selezionatacasella() {
    casellaselcolorata = true;
    casellasel = rigaselezionata * 8 + colonnaselezionata;
    if (rigaselezionata % 2 == 0) {
        if (casellasel % 2 == 0){
            document.getElementById("img" + casellasel).style.backgroundImage = "url(imgbase/legnochiarosel.png)"; document.getElementById("img" + casellasel).style.backgroundSize = "cover";
        }
        else if (casellasel % 2 == 1){
            document.getElementById("img" + casellasel).style.backgroundImage = "url(imgbase/legnoscurosel.png)"; document.getElementById("img" + casellasel).style.backgroundSize = "cover";  
        }
    }
    else if (rigaselezionata % 2 == 1) {
        if (casellasel % 2 == 1){
            document.getElementById("img" + casellasel).style.backgroundImage = "url(imgbase/legnochiarosel.png)"; document.getElementById("img" + casellasel).style.backgroundSize = "cover";          
        }
        else if (casellasel % 2 == 0){
            document.getElementById("img" + casellasel).style.backgroundImage = "url(imgbase/legnoscurosel.png)"; document.getElementById("img" + casellasel).style.backgroundSize = "cover";        
        }
    }
}

function spostamentocasella() {
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 8; c++) {
            if (casellelegalispost[r][c] == true) {
                if (r % 2 == 0) {
                    if (c % 2 == 0){
                        document.getElementById("img" + (r*8+c)).style.backgroundImage = "url(imgbase/legnochiarospost.png)"; document.getElementById("img" + (r*8+c)).style.backgroundSize = "cover";
                    }
                    else if (c % 2 == 1){
                        document.getElementById("img" + (r*8+c)).style.backgroundImage = "url(imgbase/legnoscurospost.png)"; document.getElementById("img" + (r*8+c)).style.backgroundSize = "cover";         
                    }
                }
                else if (r % 2 == 1) {
                    if (c % 2 == 1){
                        document.getElementById("img" + (r*8+c)).style.backgroundImage = "url(imgbase/legnochiarospost.png)"; document.getElementById("img" + (r*8+c)).style.backgroundSize = "cover";           
                    }
                    else if (c % 2 == 0){
                        document.getElementById("img" + (r*8+c)).style.backgroundImage = "url(imgbase/legnoscurospost.png)"; document.getElementById("img" + (r*8+c)).style.backgroundSize = "cover";         
                    }
                }
            }
        }
    } 
}

function selespostcasellastop() {
    for(var r = 0; r < 8; r++) {
        for(var c = 0; c < 8; c++) {
            if (r % 2 == 0) {
                if (c % 2 == 0){
                    document.getElementById("img" + (r*8+c)).style.backgroundImage = "url(imgbase/legnochiaro.png)"; document.getElementById("img" + (r*8+c)).style.backgroundSize = "cover";            
                }
                else if (c % 2 == 1){
                    document.getElementById("img" + (r*8+c)).style.backgroundImage = "url(imgbase/legnoscuro.png)"; document.getElementById("img" + (r*8+c)).style.backgroundSize = "cover";          
                }
            }
            else if (r % 2 == 1) {
                if (c % 2 == 1){
                    document.getElementById("img" + (r*8+c)).style.backgroundImage = "url(imgbase/legnochiaro.png)"; document.getElementById("img" + (r*8+c)).style.backgroundSize = "cover";            
                }
                else if (c % 2 == 0){
                    document.getElementById("img" + (r*8+c)).style.backgroundImage = "url(imgbase/legnoscuro.png)"; document.getElementById("img" + (r*8+c)).style.backgroundSize = "cover";          
                }
            }
        }
    }
    casellaselcolorata = false;
}

function puntatore(riga, colonna) {
    id = riga * 8 + colonna;
    if (cliccodisponibile == false) {
        document.getElementById(id).style.cursor = "no-drop";
    }
    else if (AIloading == true) {
        document.getElementById(id).style.cursor = "progress";
    }
    else if (cliccodisponibile == true && AIloading == false) {
        if (casellelegalispost[riga][colonna] == true && aiutivisione == true) {
            document.getElementById(id).style.cursor = "pointer";    
        }
        else if (casella[riga][colonna] == "vuoto") {
            document.getElementById(id).style.cursor = "default";    
        }
        else if ((casella[riga][colonna]).charAt(0) == "B") {
            if (prossimamossa == "B") {
                document.getElementById(id).style.cursor = "pointer";   
            }
            else if (prossimamossa == "W" || prossimamossa == "attesastart") {
                document.getElementById(id).style.cursor = "default";
            }
        }
        else if ((casella[riga][colonna]).charAt(0) == "W") {
            if (prossimamossa == "W" || prossimamossa == "attesastart") {
                document.getElementById(id).style.cursor = "pointer";   
            }
            else if (prossimamossa == "B") {
                document.getElementById(id).style.cursor = "default";
            }
        }
    }
}

window.onbeforeunload = function() {
    if (ongame == true) {
        if (confirm) {return true;}
        else {return false;}
    }
};


/*Chess AI*/

function turnoAI() {
    AIloading = true;
    nCaseCalcolate = 0;
    cronoAIstart = new Date().getTime();
    
    movimentoBOT(minimaxRoot(d, true, "B", "W"), true);

    cronoAIstop = new Date().getTime();
    cronoAI = cronoAIstop - cronoAIstart;
    AIloading = false;
    document.getElementById("depth").innerHTML = "Depth: " + d;
    document.getElementById("mosseBOT").innerHTML = nCaseCalcolate + " mosse";
    document.getElementById("tempoBOT").innerHTML = "in " + cronoAI + " ms";
}

var minimaxRoot = function(depth, isMaximisingPlayer, color, opponentcolor) {
    var mosseBOT = [];
    mossedisponibiliBOT(color, opponentcolor);
    for(var i = 0; i < mossedispBOT.length; i++){
        mosseBOT[i] = mossedispBOT[i]; //tutte le mosse che puÃ² fare il bot del primo ramo
    }
    var valMigliore = -9999; //se non ho piÃ¹ mosse allora significa che perdo quindi return di -9999 perchÃ¨ non vene fatto il loop sotto
    var mossaMigliore;

    for(var i = 0; i < mosseBOT.length; i++) {
        var mossaBOT = mosseBOT[i];
        
        var casellabackup = new Array(8);
        for (var r = 0; r < 8; r++) {
            casellabackup[r] = casella[r].slice()
        }
        
        movimentoBOT(mossaBOT, false);
        var valAttuale = minimax(depth - 1, -10000, 10000, !isMaximisingPlayer, color, opponentcolor); //! inverte (true -> false e false -> true)

        for (var r = 0; r < 8; r++) {
            casella[r] = casellabackup[r].slice()
        }
        
        if(valAttuale >= valMigliore) {
            valMigliore = valAttuale;
            mossaMigliore = mossaBOT;
        }
    }
    return mossaMigliore; //torna la mossa con la valutazione piÃ¹ alta
};

var minimax = function (depth, alpha, beta, isMaximisingPlayer, color, opponentcolor) {
    nCaseCalcolate++; //contatore per vedere quante mosse ha calcolato
    
    if (depth == 0 && color == "B") {
        return -valutatore(casella); //valutatore di base Ã¨ positivo se Ã¨ in vantaggio il bianco
    }
    else if (depth == 0 && color == "W") {
        return valutatore(casella); //valutatore di base Ã¨ positivo se Ã¨ in vantaggio il bianco
    }
    
    if (isMaximisingPlayer) {
        var mosseBOT = [];
        mossedisponibiliBOT(color, opponentcolor);
        for(var i = 0; i < mossedispBOT.length; i++){
            mosseBOT[i] = mossedispBOT[i];
        }
            
        var valMigliore = -9999;
        
        for (var i = 0; i < mosseBOT.length; i++) {
            var mossaBOT = mosseBOT[i];

            var casellabackup = new Array(8);
            for (var r = 0; r < 8; r++) {
               casellabackup[r] = casella[r].slice()
            }

            movimentoBOT(mossaBOT, false);
            valMigliore = Math.max(valMigliore, minimax(depth - 1, alpha, beta, !isMaximisingPlayer, color, opponentcolor));
            
            for (var r = 0; r < 8; r++) {
                casella[r] = casellabackup[r].slice()
            }
            
            alpha = Math.max(alpha, valMigliore);
            if (beta <= alpha) {
                return valMigliore;
            }
        }
        return valMigliore;
    } else {
        var mosseBOT = [];
        mossedisponibiliBOT(opponentcolor, color);
        for(var i = 0; i < mossedispBOT.length; i++){
            mosseBOT[i] = mossedispBOT[i];
        }
          
        var valMigliore = 9999;
        
        for (var i = 0; i < mosseBOT.length; i++) {
            var mossaBOT = mosseBOT[i];

            var casellabackup = new Array(8);
            for (var r = 0; r < 8; r++) {
               casellabackup[r] = casella[r].slice()
            }

            movimentoBOT(mossaBOT, false);
            valMigliore = Math.min(valMigliore, minimax(depth - 1, alpha, beta, !isMaximisingPlayer, color, opponentcolor));
            
            for (var r = 0; r < 8; r++) {
                casella[r] = casellabackup[r].slice()
            }
            
            beta = Math.min(beta, valMigliore);
            if (beta <= alpha) {
                return valMigliore;
            }
        }
        return valMigliore;
    }
};

function movimentoBOT(mossaBOT, last) {
    if (last == true) {
        if ((mossaBOT.casellapartenza.charAt(0) == "W" || mossaBOT.casellapartenza.charAt(0) == "B") && (mossaBOT.casellaarrivo.charAt(0) == "W" || mossaBOT.casellaarrivo.charAt(0) == "B") && (mossaBOT.casellaarrivo.charAt(0) != mossaBOT.casellapartenza.charAt(0))) {
            nummangiato = eval(document.getElementById("n" + casella[mossaBOT.rigaarrivo][mossaBOT.colonnaarrivo]).innerHTML); nummangiato++;
            document.getElementById("n" + casella[mossaBOT.rigaarrivo][mossaBOT.colonnaarrivo]).innerHTML = nummangiato;
            if (audio == true) {allAudioStop(); mangiaaudio.play();};
        }
        else {
            if (audio == true) {allAudioStop(); mossaaudio.play();};
        };
    };
    
    casella[mossaBOT.rigaarrivo][mossaBOT.colonnaarrivo] = mossaBOT.casellapartenza;
    casella[mossaBOT.rigapartenza][mossaBOT.colonnapartenza] = "vuoto";
    
    if (mossaBOT.casellapartenza == "Wpedone" && mossaBOT.rigaarrivo == 0) {
        casella[mossaBOT.rigaarrivo][mossaBOT.colonnaarrivo] = "Wregina";
    }
    else if (mossaBOT.casellapartenza == "Bpedone" && mossaBOT.rigaarrivo == 7) {
        casella[mossaBOT.rigaarrivo][mossaBOT.colonnaarrivo] = "Bregina";
    };
      
    if (last == true) { 
        casellaselezionata = mossaBOT.casellapartenza;
        rigaselezionata = mossaBOT.rigapartenza;
        colonnaselezionata = mossaBOT.colonnapartenza;
        casellaspostamento = mossaBOT.casellaarrivo;
        rigaspostamento = mossaBOT.rigaarrivo;
        colonnaspostamento = mossaBOT.colonnaarrivo;
    };
}

/*Ricerca mosse disponibili in Chess AI*/

function mossedisponibiliBOT(colorebot, coloreuman) {
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 8; c++) {
            casellelegaliTC[r][c] = false;
            mossedispBOT = []
        }
    }
    for (rCS = 0; rCS < 8; rCS++) {
        for (cCS = 0; cCS < 8; cCS++) {
            if (casella[rCS][cCS].charAt(0) == colorebot) {
                for (r = 0; r < 8; r++) {
                    for (c = 0; c < 8; c++) {
                        casellelegaliTC[r][c] = false;
                    }
                }

                trovacasellelegali(casella, casella[rCS][cCS], rCS, cCS, casella[rCS][cCS].charAt(0), "bot");
                for (r = 0; r < 8; r++) {
                    for (c = 0; c < 8; c++) {
                        casellelegaliTC[r][c] = casellelegali[r][c];
                    }
                }
                
                for (r = 0; r < 8; r++) {
                    for (c = 0; c < 8; c++) {
                        if (casellelegaliTC[r][c] == true) {
                            muovicheck(casella[rCS][cCS], rCS, cCS, casella[rCS][cCS].charAt(0), casella[r][c], r, c, casella[r][c].charAt(0));
                            if (isscaccoBOT(colorebot, coloreuman) == true) {
                                casellelegaliTC[r][c] = false;
                            }
                        }
                    }
                }
                
                for (r = 0; r < 8; r++) {
                    for (c = 0; c < 8; c++) {
                        if (casellelegaliTC[r][c] == true) {
                            mossedispBOT.push({casellapartenza: casella[rCS][cCS], rigapartenza: rCS, colonnapartenza: cCS, colorepartenza: casella[rCS][cCS].charAt(0), casellaarrivo: casella[r][c], rigaarrivo: r, colonnaarrivo: c, colorearrivo: casella[r][c].charAt(0)});
                        }
                    }
                }
             
            }
        }
    }
    return mossedispBOT;
}

function isscaccoBOT(coloreatt, coloreopp) {
    for (rIS = 0; rIS < 8; rIS++) {
        for (cIS = 0; cIS < 8; cIS++) {
            if (casellacheck[rIS][cIS].charAt(0) == coloreopp) { //per tutte le caselle opposte
                
                for (rR = 0; rR < 8; rR++) {
                    for (cR = 0; cR < 8; cR++) {
                        if(casellacheck[rR][cR] == coloreatt + "re") { //trova il nostro re
                            rigaRe = rR;
                            colonnaRe = cR;
                        }
                    }
                }
                
                trovacasellelegali(casellacheck, casellacheck[rIS][cIS], rIS, cIS, coloreopp); //trova le posizioni minacciate da la casella in cui Ã¨
                
                if (casellelegali[rigaRe][colonnaRe] == true) { //controlla se il nostro re Ã¨ in una di queste
                    return true;
                }
            }
        }
    }
}

/*Valutazione scacchiera in Chess AI*/

function valutatore(scacchiera) {
    var valutazionetot = 0;
    for(r = 0; r < 8; r++){
        for(c = 0; c < 8; c++){
            valutazionetot = valutazionetot + valutatorepedina(scacchiera[r][c], r, c);
        }
    }
    return valutazionetot;
}
    
function valutatorepedina(tipopedina, riga, colonna) {
    if (tipopedina == "vuoto") {
        return 0;
    }
    
    if (tipopedina == "Wpedone") {
        var valoreattuale = 10 + ValPosizioneWPedone[riga][colonna];
    } else if (tipopedina == "Bpedone") {
        var valoreattuale = 10 + ValPosizioneBPedone[riga][colonna];
        
    } else if (tipopedina == "Wcavallo" || tipopedina == "Bcavallo") {
        var valoreattuale = 30 + ValPosizioneCavallo[riga][colonna];  
        
    } else if (tipopedina == "Walfiere") {
        var valoreattuale = 30 + ValPosizioneWAlfiere[riga][colonna];
    } else if (tipopedina == "Balfiere") {
        var valoreattuale = 30 + ValPosizioneBAlfiere[riga][colonna];
        
    } else if (tipopedina == "Wtorre") {
        var valoreattuale = 50 + ValPosizioneWTorre[riga][colonna];
    } else if (tipopedina == "Btorre") {
        var valoreattuale = 50 + ValPosizioneBTorre[riga][colonna];
        
    } else if (tipopedina == "Wregina" || tipopedina == "Bregina") {
        var valoreattuale = 90 + ValPosizioneRegina[riga][colonna];
        
    } else if (tipopedina == "Wre") {
        var valoreattuale = 900 + ValPosizioneWRe[riga][colonna];
    } else if (tipopedina == "Bre") {
        var valoreattuale = 900 + ValPosizioneBRe[riga][colonna];
    }
    
    if (tipopedina.charAt(0) == "W") {
        return valoreattuale;
    }
    else if (tipopedina.charAt(0) == "B") {
        return -valoreattuale;
    }
}

function reverseArray(array) {
    return array.slice().reverse();
}

var ValPosizioneWPedone = [
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
    [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
    [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
    [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
    [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
    [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
];

var ValPosizioneBPedone = reverseArray(ValPosizioneWPedone);

var ValPosizioneCavallo = [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
    [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
    [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
    [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
    [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
    [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
];

var ValPosizioneWAlfiere = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var ValPosizioneBAlfiere = reverseArray(ValPosizioneWAlfiere);

var ValPosizioneWTorre = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var ValPosizioneBTorre = reverseArray(ValPosizioneWTorre);

var ValPosizioneRegina = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var ValPosizioneWRe = [
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0]
];

var ValPosizioneBRe = reverseArray(ValPosizioneWRe);

/*Chess AI vs Chess AI*/

function turnoAIW() {
    nCaseCalcolate = 0;
    cronoAIstart = new Date().getTime();
    
    movimentoBOT(minimaxRoot(d1, true, "W", "B"), true);

    cronoAIstop = new Date().getTime();
    cronoAI = cronoAIstop - cronoAIstart
    document.getElementById("depthW").innerHTML = "Depth: " + d1;
    document.getElementById("mosseAIW").innerHTML = nCaseCalcolate + " mosse";
    document.getElementById("tempoAIW").innerHTML = "in " + cronoAI + " ms";
    document.getElementById("turnoattualeBOT").innerHTML = "AI Nero";
}

function turnoAIB() {
    nCaseCalcolate = 0;
    cronoAIstart = new Date().getTime();
    
    movimentoBOT(minimaxRoot(d2, true, "B", "W"), true);

    cronoAIstop = new Date().getTime();
    cronoAI = cronoAIstop - cronoAIstart;
    document.getElementById("depthB").innerHTML = "Depth: " + d2;
    document.getElementById("mosseAIB").innerHTML = nCaseCalcolate + " mosse";
    document.getElementById("tempoAIB").innerHTML = "in " + cronoAI + " ms";
    document.getElementById("turnoattualeBOT").innerHTML = "AI Bianco";
}


/*Creazione di situzazioni specifiche (da cancellare)*/

function CreaSituazioneDiPatta() {
    prossimamossa = "W";
    controlloturni();
    casella = [
        ["Btorre", "Bcavallo", "vuoto", "vuoto", "Bre", "vuoto", "Bcavallo", "Btorre"],
        ["Bpedone", "Bpedone", "Bpedone", "vuoto", "vuoto", "Bpedone", "Bpedone", "Bpedone"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "Balfiere", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "Balfiere", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "Bregina", "vuoto", "vuoto"],
        ["Wre", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"]
    ];
    stampa();
}

function CreaSituazioneDiVittoriaB() {
    prossimamossa = "W";
    controlloturni();
    casella = [
        ["Btorre", "Bcavallo", "vuoto", "vuoto", "Bre", "vuoto", "Bcavallo", "Btorre"],
        ["Bpedone", "Bpedone", "Bpedone", "vuoto", "vuoto", "Bpedone", "Bpedone", "Bpedone"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["Balfiere", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["Wpedone", "Bregina", "Balfiere", "vuoto", "Wpedone", "Wpedone", "Wpedone", "Wpedone"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "Wre", "Walfiere", "Wcavallo", "Wtorre"]
    ];
    stampa();
}

function CreaSituazioneDiVittoriaW() {
    prossimamossa = "B";
    controlloturni();
    casella = [
        ["Wtorre", "Wcavallo", "vuoto", "vuoto", "Wre", "vuoto", "Wcavallo", "Wtorre"],
        ["Wpedone", "Wpedone", "Wpedone", "vuoto", "vuoto", "Wpedone", "Wpedone", "Wpedone"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["Walfiere", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["Bpedone", "Wregina", "Walfiere", "vuoto", "Bpedone", "Bpedone", "Bpedone", "Bpedone"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "Bre", "Balfiere", "Bcavallo", "Btorre"]
    ];
    stampa();
}

function CreaSituazioneDiArrocco() {
    prossimamossa = "B";
    controlloturni();
    casella = [
        ["Btorre", "vuoto", "vuoto", "vuoto", "Bre", "vuoto", "vuoto", "Btorre"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["Balfiere", "Bregina", "Bcavallo", "vuoto", "vuoto", "vuoto", "vuoto", "Balfiere"],
        ["Bpedone", "Bpedone", "Bpedone", "Bpedone", "Bpedone", "Bpedone", "Wcavallo", "Bpedone"],
        ["Wpedone", "Wpedone", "Wpedone", "Wpedone", "Wpedone", "Wpedone", "Bcavallo", "Wpedone"],
        ["Walfiere", "Wregina", "Wcavallo", "vuoto", "vuoto", "vuoto", "vuoto", "Walfiere"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["Wtorre", "vuoto", "vuoto", "vuoto", "Wre", "vuoto", "vuoto", "Wtorre"]
    ];
    stampa();
}

function CreaSituazioneDiSoloRe() {
    prossimamossa = "B";
    controlloturni();
    casella = [
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "Wre", "Btorre", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "Bre", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"],
        ["vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto", "vuoto"]
    ];
    stampa();
}


/*---- Chess by Tommaso Moro  ----*/
 /*--- moroxtommaso@gmail.com ---*/