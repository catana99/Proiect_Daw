//ce proprietati are un eveniment

export class OngEvent {
    name: string;
    description: string;
    date: Date;
    images?: any[]; //parametru optional, poate avea sau nu imagini
    categories?: any[];
}
