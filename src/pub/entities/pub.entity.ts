import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PubDocument = Pub & Document;

@Schema({timestamps: true})
export class Pub {
    @Prop({type: String, required: true})
    titre: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: String, required: true})
    audio: string;
}

export const PubSchema = SchemaFactory.createForClass(Pub);