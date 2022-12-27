import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'



var snmp = require ("net-snmp");


class Server {
    private app: Application;
    public DEBUG: Boolean = false; // Variable de ambiente Cambio

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        //const MONGO_URL = "mongodb+srv://RRC:JuanR1974@cluster0.dbfhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        //// Configuración de las variables de entorno:
        //dotenv.config({path: join(__dirname, '../.env')})
        ////ConectarBD(this.DEBUG ? MONGO_URL : process.env.MONGODB_URI || MONGO_URL);
        //ConectarBD(MONGO_URL);

        // Puerto de escucha de la aplicacion
        this.app.set("port", this.DEBUG ? 5100: process.env.PORT || 5100);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        
        this.app.use(cors());
        
    }

    routes() {
        this.app.use('/', function(req, res) {
            res.send('Bienvenido a la API');
        });

    }

    start() {
        this.app.listen(this.DEBUG ? 5100: process.env.PORT || 5100, () => {
            console.log(`Servidor iniciado en http://localhost:${this.DEBUG ? 5100: process.env.PORT || 5100}`)
        });
    }

}

//Space for testing


// Ejecución del servidor:
const server = new Server()
server.start()
