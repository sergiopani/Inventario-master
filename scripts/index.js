//const { getProduct } = require("../../../controllers/product");

//import axios from "axios";

 new Vue({
    el: "#app",
    data: {
        //Array de articulos que parseamos desde el fichero json
        articulos: [],
        toProduce: [],
        //Array del fetch de json de empresas
        facturas: [],

        //Objeto que guarda la empresa que esta selecionada en el select
        selectedFactura: {
            id: '',
            nomfiscli: '',
            serie: '',
            tipo: '',
            centro: '',
            numero: ''
        },

        //Atributos de los aticulos
        fondos: [],
        laterales: [],
        tapas: [],

    },
    /*Metodos que se ejecutan al iniciar la pagina*/
    created() {

        const getfacturasExecution = new Promise((resolve, reject) => {
            resolve (this.getFacturas());
        });
        getfacturasExecution
            .then(value => {this.setDefault(this.facturas[0]) })

    },
    methods: {
        comprobar: function (index, a) {
            if (this.fondos[index] === true && this.laterales[index] === true && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === '' && this.laterales[index] === '' && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === true && this.laterales[index] === '' && this.tapas[index] === '') {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === '' && this.laterales[index] === true && this.tapas[index] === '') {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === true && this.laterales[index] === '' && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === '' && this.laterales[index] === true && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === true && this.laterales[index] === true && this.tapas[index] === '') {
                this.sendProduction(index, a);
                return true;
            } else {
                this.deleteProduct(index, a);
            }

        },
        sendProduction: function (index, a) {
            //Comprueba que elementos li estan marcados en verde
            this.toProduce[index] = (a);
        },
        deleteProduct: function (index) {
            this.toProduce[index] = null;
        },
        showProduction: function () {

            //Eliminar las posiciones que son nulas
            const results = this.toProduce.filter(element => {
                return element !== null;
            });

            console.log(results);
        },
        filter: function (a) {
            /*console.log(a.serie + " "+ a.tipo + " " + a.centro + " es igual a ->" + this.currentEmpresa.serie + " " + this.currentEmpresa.tipo + " " + this.currentEmpresa.centro)
            console.log()*/
            let ideProducto = a.serie + a.tipo + a.centro + a.numero;
            return ideProducto.toUpperCase() === this.selectedFactura.id.toUpperCase();
        },
        setSelected: function (facturaObject) {
            //console.log("cambiando  ->" + facturaId)
            //Sacamos una array separando por '/' en cada uno de las posiciones
            //let atributos = this.currentFactura.id.split('/');
            //console.log(atributos);
            //Recorrer la array
            this.setDefault(facturaObject);
        },
        setDefault: function (factura) {
            /*this.selectedFactura.id = factura.serie + factura.tipo + factura.centro + factura.numero;
            this.selectedFactura.nombre = factura.nomfiscli;
            this.selectedFactura.serie = factura.serie;
            this.selectedFactura.tipo = factura.tipo;
            this.selectedFactura.centro = factura.centro;
            this.selectedFactura.numero = factura.numero;*/
            this.selectedFactura = factura;
            console.log("pasooptin ")
            console.log(this.facturas)
            this.getProducts();
        },
        getProducts: async function(){
            try{
                const response = await axios("../data/products.json")
                const res = response.data;
                this.articulos = res;
                console.log(this.articulos);
            }catch(err){
                console.log(err);
            }
        },
        /*
        getProducts() {
            //const url = "http://localhost:8080/kriterOMNI/KriterRS004/getOP?centro=" + this.currentFactura.centro + "&tipo=" + this.currentFactura.tipo
            //    + "&serie=" + this.currentFactura.serie + "&numero=" + this.currentFactura.numero;
            //console.log(url);

            fetch("../data/products.json")
                .then((res) => res.json())
                .then((data) => ((this.articulos = data), console.log(this.articulos)))
                .catch((err) => console.log(err.message));


        },
        */

        getFacturas: async function(){
            try{
                const response = await axios("../data/facturas.json")
                const res = response.data;
                this.facturas = res;
                console.log(this.facturas)
            }catch(err){
                console.log(err);
            }
        }
        /*
        getFacturas() {
            fetch("../data/facturas.json")
                .then((res) => res.json())
                .then((data) => ((this.facturas = data), console.log(this.facturas)))
                .catch((err) => console.log(err.message));
        },
        */

    },
});


