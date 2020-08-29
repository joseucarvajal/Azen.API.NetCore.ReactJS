
zft simple:
estado.valueesPx[px][indice_zft][0]["camp2"] = "nuevo value";

estado.valueesPx[px][indice_zft]["camp2"] = "nuevo value";

zft multi:
estado.valueesPx[px][indice_zft][linea]["camp2"] = "nuevo value";

estado.valueesPx[0][1][0]["camp2"] = "nuevo value";
estado.valueesPx[0][1][0]["camp2"].soloreadOnly = false;

let stateOld = {
    zPantexModule:{
        pilaPantex:[
            {},
            {}
        ],
        pilaPantexState:{
            "1":{ //px=1
                zFormaTablaStateList:{
                    "0":{ //encabezado
                        "camp1":{
                            readOnly:true,
                            value:"1"
                        },
                        "campi":{
                            readOnly:true,
                            value:"2"
                        },
                        "campn":{
                            readOnly:true,
                            value:"3"
                        },                        
                    },
                    "1":{ //detalles
                        "0":{
                            "camp1":{
                                readOnly:false,
                                value:"1"
                            },    
                            "camp2":{
                                readOnly:false,
                                value:"1"
                            },                                
                        },
                        "1":{
                            "camp1":{
                                readOnly:false,
                                value:"1"
                            },    
                            "camp2":{
                                readOnly:false,
                                value:"1"
                            },                                
                        }                        
                    }
                }
            }
        }        
    }
} as any;


let state = {
    zPantexModule:{
        pilaPantex:[
            {},
            {}
        ],
        pilaPantexState:{
            byId:{
                3:{
                    id:3,
                    zFormaTablaStateListIds:[4]
                },
                4:{
                    id:4,
                    zFormaTablaStateListIds:[7, 9]
                }               
            },
            allIds:[3,4]
        },
        zFormaTablaState:{
            byId:{
                4:{
                    id:4,
                    zCampoStateListIds:[0,1]
                },
                7:{
                    id:7,                                        
                },  
                9:{
                    id:9
                }              
            },
            allIds:[4, 7, 9]
        },
        zCampoState:{
            byId:{
                0:{
                    id:0,
                    value:"123383",
                    readOnly: false,
                },
                1:{
                    id:1,
                    value:"x",
                    readOnly: false,
                }                
            }
        }
    }
} as any;