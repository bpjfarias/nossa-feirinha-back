import { getConnection } from "typeorm";
import { Endereco } from "../entity/Endereco";
import { Evento } from "../entity/Evento";
import { Usuario } from "../entity/Usuario";
import EnderecoService from "./EnderecoService";
import moment = require('moment');

const enderecoService = new EnderecoService();

export class EventoService {

   async update(evento: Evento) {

      return await getConnection().getRepository(Evento).save(evento)

   }

   async getAllEventosAtivos(): Promise<Evento[]> {

      const eventos: Evento[] = await this.getAllEventos();

      const horaAtual = moment().format();

      const result = eventos.filter(evento => {
         const horaEvento = moment(evento.dataEvento).format();
         if (horaEvento > horaAtual) {
            return evento;
         }
      })

      return result;

   }

   async createEvento(evento: Evento, endereco: Endereco, usuario: Usuario) : Promise<Evento> {

      evento.criador = usuario;

      evento.endereco = endereco;
      
      return await getConnection().getRepository(Evento).save(evento)

   }

   async delete(evento: Evento): Promise<Evento> {

      return await getConnection().getRepository(Evento).remove(evento);

   }

   async deleteEnderecoRelation(evento: Evento) {

      await enderecoService.delete(evento.endereco);

   }


   async getById(idEvento: string): Promise<Evento> {

      return await getConnection().getRepository(Evento).findOne(idEvento)

   }


   async getAllEventos(): Promise<Evento[]> {

      return await getConnection().getRepository(Evento).find()
   }



}

export default EventoService;