import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Document, Types } from "mongoose";
import { Compte } from "src/compte/entities/compte.entity";
import { PayementSubject } from "src/payement-subject/entities/payement-subject.entity";
export enum TYPE_OPERATION {
    RTR = 'RTR',
    DPT = 'DPT',
}
export type OperationDocument = Operation & Document;

@Schema({timestamps: true})
export class Operation {
    @Prop({type: Number, required: true})
    montant: number;

    @Prop({type: String, required: true})
    type: string;

    @Prop({type: Types.ObjectId, ref: Compte.name, required: true, autopopulate: true})
    @Type(() => Compte)
    compte: Compte;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Types.ObjectId, ref: PayementSubject.name, autopopulate: true})
    @Type(() => PayementSubject)
    payement_subject: PayementSubject;

    @Prop({type: Boolean, required: true, default: false})
    isVirement: boolean;

    @Prop({type: String, required: true})
    responsable: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
