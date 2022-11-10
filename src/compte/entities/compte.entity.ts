import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Etudiant } from "src/etudiant/entities/etudiant.entity";

export type CompteDocument = Compte & Document;

@Schema({timestamps: true})
export class Compte {
  @Prop({type: Number, required: true})
  solde: number;

  @Prop({type: String, required: true, unique: true})
  code: string;

  @Prop({type: Types.ObjectId, ref: Etudiant.name, required: true, autopopulate: true})
  etudiant: Etudiant;
}


export const CompteSchema = SchemaFactory.createForClass(Compte);