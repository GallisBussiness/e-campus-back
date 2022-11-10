import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({timestamps: true})
export class Service {
    @Prop({type: String, required: true, unique: true})
    nom: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);