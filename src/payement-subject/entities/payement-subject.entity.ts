import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Document, Types } from 'mongoose';
import { Service } from "src/service/entities/service.entity";

export type PayementSubjectDocument = PayementSubject & Document;

@Schema({timestamps: true})
export class PayementSubject {
    @Prop({type: String, required: true, unique: true})
    nom: string;
    
    @Prop({type: Number, required: true})
    prix: number;

    @Prop({type: Types.ObjectId, ref: Service.name, required: true, autopopulate: true})
    @Type(() => Service)
    service: Service;
}

export const PayementSubjectSchema = SchemaFactory.createForClass(PayementSubject);
