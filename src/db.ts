import {DataSource} from 'typeorm'
import {User} from './entities/User'
import {Cliente} from './entities/Cliente'
import {CatalogoMontos} from './entities/CatalogoMontos'
import {Prestamo} from './entities/Prestamo'
import {Amortizacion} from './entities/Amortizaciones'

export const AppDataSource = new DataSource({
    type:'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    port: 5432,
    database: 'restcrud',
    entities: [User, Cliente, CatalogoMontos, Prestamo, Amortizacion],
    logging:true,
    synchronize:true
})