import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Document, Types } from "mongoose";
import { Compte } from "src/compte/entities/compte.entity";
import { Service } from "src/service/entities/service.entity";
export enum TYPE_OPERATION {
    RTR = 'Retrait',
    DPT = 'Depot'
}
export type OperationDocument = Operation & Document;

@Schema({timestamps: true})
export class Operation {
    @Prop({type: String, required: true})
    date: string;

    @Prop({type: String, required: true})
    heure: string;

    @Prop({type: Number, required: true})
    montant: number;

    @Prop({type: TYPE_OPERATION, required: true})
    type: string;

    @Prop({type: Types.ObjectId, ref: Compte.name, required: true, autopopulate: true})
    @Type(() => Compte)
    compte: Compte;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Types.ObjectId, ref: Service.name, required: true, autopopulate: true})
    @Type(() => Service)
    service: Service;

    @Prop({type: Boolean, required: true, default: false})
    isOwn: boolean;

    @Prop({type: String, required: true})
    responsable: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
