const porte = ['-','1-A','1-B','2-A','3-A','4-A','4-B','5-A','5-B','6-A','6-B','7-A','7-B','8-A','8-B'];
const gre = [ '01ª GRE (João Pessoa)', '02ª GRE (Guarabira)', '03ª GRE (Campina Grande)', '04ª GRE (Cuité)', '05ª GRE (Monteiro)', '06ª GRE (Patos)', '07ª GRE (Itaporanga)', '08ª GRE (Catolé do Rocha)', '09ª GRE (Cajazeiras)', '10ª GRE (Sousa)', '11ª GRE (Princesa Isabel)', '12ª GRE (Itabaiana)', '13ª GRE (Pombal)', '14ª GRE (Mamanguape)' ];
const gres = [ '1ª GRE', '2ª GRE', '3ª GRE', '4ª GRE', '5ª GRE', '6ª GRE', '7ª GRE', '8ª GRE', '9ª GRE', '10ª GRE', '11ª GRE', '12ª GRE', '13ª GRE', '14ª GRE' ];

let dadoscsv = {
    
    totalEscolas: async function (escolas) {
        return escolas.length;
    },

    exibirEscolasPorPorte: async function (escolas) {
        let escolasPorPorte = porte.map((porte) => {
            let cont = 0
            escolas.map((porteEscola) => {
                if(porteEscola["Porte"] === porte) {
                    cont++;
                }
            });
            return cont;
        });
        return escolasPorPorte;
    },

    totalMatriculasPorPorte: async function (escolas) {
        let escolasPorPorte = porte.map((porte) => {
            let cont = 0
            escolas.map((porteEscola) => {
                if(porteEscola["Porte"] === porte) {
                    cont += Number.parseInt(porteEscola["Matrículas*"]);
                }
            });
            return cont;
        });
        return escolasPorPorte;
    },

    totalEscolasPorGRE: async function (escolas) {
        let escolasPorGRE = gre.map((gre) => {
            let cont = 0
            escolas.map((greEscola) => {
                if(greEscola["Gerência Regional"] === gre) {
                    cont ++
                }
            });
            return cont;
        });
        return escolasPorGRE;
    },

    totalMatriculasPorGRE: async function (escolas) {
        let escolasPorGRE = gre.map((gre) => {
            let cont = 0
            escolas.map((greEscola) => {
                if(greEscola["Gerência Regional"] === gre) {
                    cont += Number.parseInt(greEscola["Matrículas*"]);
                }
            });
            return cont;
        });
        return escolasPorGRE;
    },

    mediaMatriculasPorGRE: async function (escolas) {
        let totalMatriculas = await this.totalMatriculasPorGRE(escolas);
        let totalEscolas = await this.totalEscolasPorGRE(escolas);
        let media = totalMatriculas.map((matriculas, i) => {
            return Math.round((matriculas / totalEscolas[i]));
        });
        return media;
    },

    mediaMatriculasPorPorte: async function (escolas) {
        let totalMatriculas = await this.totalMatriculasPorPorte(escolas);
        let totalEscolas = await this.exibirEscolasPorPorte(escolas);
        let media = totalMatriculas.map((matriculas, i) => {
            return Math.round((matriculas / totalEscolas[i]));
        });
        return media;
    },

    retornaArrayPortes: function() {
        return porte;
    },

    retornaArraygGRE: function () {
        return gres;
    },
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
    top10geral: async function (escolas) {
        escolas.sort(function ordenar(a, b){return Number.parseInt(b['Matrículas*']) - Number.parseInt(a['Matrículas*']);
        })
        var arrayx = [];
        var arrayy = []; 
        escolas.slice(0,10).forEach(element => arrayx.push(parseInt(element['Matrículas*'])));
        escolas.slice(0,10).forEach(element => arrayy.push(element["Escola"]));
        return [arrayx,arrayy]
    },

    bottom10geral: async function (escolas) {
        escolas.sort(function ordenar(a, b){return Number.parseInt(a['Matrículas*']) - Number.parseInt(b['Matrículas*']);
        })
        var arrayx = [];
        var arrayy = []; 
        escolas.slice(0,10).forEach(element => arrayx.push(parseInt(element['Matrículas*'])));
        escolas.slice(0,10).forEach(element => arrayy.push(element["Escola"]));
        return [arrayx,arrayy]
    },

    jpbottom: async function (escolas) {
        var jp = [];
        var len;
        var i;
        var arrayx = [];
        var arrayy = []; 

        for (i = 0, len = escolas.length, jp =[]; i < len; i++) {
            if (escolas[i]['Município'] === 'João Pessoa'){
                jp.push(escolas[i]);
            }
        }
        jp.sort(function ordenar(a, b){return Number.parseInt(a['Matrículas*']) - Number.parseInt(b['Matrículas*']);
    })
        jp.slice(0,10).forEach(element => arrayx.push(parseInt(element['Matrículas*'])));
        jp.slice(0,10).forEach(element => arrayy.push(element["Escola"]));
        return [arrayx,arrayy]
    },

    cgbottom: async function (escolas) {
        var cg = [];
        var len;
        var i;
        var arrayx = [];
        var arrayy = []; 

        for (i = 0, len = escolas.length, cg =[]; i < len; i++) {
            if (escolas[i]['Município'] === 'Campina Grande'){
                cg.push(escolas[i]);
            }
          }
        cg.sort(function ordenar(a, b){return Number.parseInt(a['Matrículas*']) - Number.parseInt(b['Matrículas*']);
        })
        cg.slice(0,10).forEach(element => arrayx.push(parseInt(element['Matrículas*'])));
        cg.slice(0,10).forEach(element => arrayy.push(element["Escola"]));
        return [arrayx,arrayy]
    },


    jptop: async function (escolas) {
        var jp = [];
        var len;
        var i;
        var arrayx = [];
        var arrayy = []; 

        for (i = 0, len = escolas.length, jp =[]; i < len; i++) {
            if (escolas[i]['Município'] === 'João Pessoa'){
                jp.push(escolas[i]);
            }
          }
        jp.sort(function ordenar(a, b){return Number.parseInt(b['Matrículas*']) - Number.parseInt(a['Matrículas*']);
    })
        jp.slice(0,10).forEach(element => arrayx.push(parseInt(element['Matrículas*'])));
        jp.slice(0,10).forEach(element => arrayy.push(element["Escola"]));
        return [arrayx,arrayy]
    },

    cgtop: async function (escolas) {
        var cg = [];
        var len;
        var i;
        var arrayx = [];
        var arrayy = []; 

        for (i = 0, len = escolas.length, cg =[]; i < len; i++) {
            if (escolas[i]['Município'] === 'Campina Grande'){
                cg.push(escolas[i]);
            }
          }
        cg.sort(function ordenar(a, b){return Number.parseInt(b['Matrículas*']) - Number.parseInt(a['Matrículas*']);
        })
        cg.slice(0,10).forEach(element => arrayx.push(parseInt(element['Matrículas*'])));
        cg.slice(0,10).forEach(element => arrayy.push(element["Escola"]));
        return [arrayx,arrayy]
    },

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    gremat:  async function (escolas) {
        const dataParsed = {}; 
        for (let index = 0; index < escolas.length; index++) {
            const element = escolas[index];
            const gerencia = element['Gerência Regional'];
            if (dataParsed[gerencia]) {
                dataParsed[gerencia] = {
                    value: dataParsed[gerencia]['value'] + parseInt(element['Matrículas*']),
                }
            }
            else {
                dataParsed[gerencia] = {
                    value: parseInt(element['Matrículas*']),
    
                }
            }
    
        }
        var aux = Object.values(dataParsed);
        var arrayx=[];  
        aux.forEach(element => {
            arrayx.push(element.value)
        });
        var arrayy = Object.keys(dataParsed);

        return [arrayx,arrayy]
    },
    
    portmat:  async function (escolas) {
        const dataParsed = {}; 
        for (let index = 0; index < escolas.length; index++) {
            const element = escolas[index];
            const gerencia = element['Porte'];
            if (dataParsed[gerencia]) {
                dataParsed[gerencia] = {
                    value: dataParsed[gerencia]['value'] + parseInt(element['Matrículas*']),
                }
            }
            else {
                dataParsed[gerencia] = {
                    value: parseInt(element['Matrículas*']),
    
                }
            }
    
        }
        var aux = Object.values(dataParsed);
        var arrayx=[];  
        aux.forEach(element => {
            arrayx.push(element.value)
        });
        var arrayy = Object.keys(dataParsed);
        return [arrayx,arrayy]
    },

}
export default dadoscsv;