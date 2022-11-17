import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type EtudiantDocument = Etudiant & Document;

@Schema({timestamps: true})
export class Etudiant {
    _id: string;

    @Prop({type: String, required: true})
    prenom: string;
  
    @Prop({type: String, required: true})
    nom: string;
  
    @Prop({type: String, required: true,unique: true})
    email: string;
  
    @Prop({type: String, required: true, unique: true, max: 14})
    tel: string;
  
    @Prop({type: String, required: true})
    password: string;
  
    @Prop({type: String, required: true})
    dateDeNaissance: string;
  
    @Prop({type: String, required: true})
    lieuDeNaissance: string;
  
    @Prop({type: String, required: true})
    formation: string;
  
    @Prop({type: String, required: true})
    avatar: string;
  
    @Prop({type: String, required: true, unique: true, max: 8})
    nce: string;
}


export const EtudiantSchema = SchemaFactory.createForClass(Etudiant);