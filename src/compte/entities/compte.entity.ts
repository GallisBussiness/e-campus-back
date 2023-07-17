import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Document, Types } from "mongoose";
import { Etudiant } from "src/etudiant/entities/etudiant.entity";
import {v4} from 'uuid'

export type CompteDocument = Compte & Document;

@Schema({timestamps: true})
export class Compte {

  _id: string;

  @Prop({type: Number, required: true})
  solde: number;

  @Prop({type: String, required: true, unique: true,default: v4()})
  code: string;

  @Prop({ type: String, required: true })
  @Exclude()
  password: string;

  @Prop({type: Types.ObjectId, ref: Etudiant.name, required: true, autopopulate: true})
  etudiant: Etudiant;
}


export const CompteSchema = SchemaFactory.createForClass(Compte);