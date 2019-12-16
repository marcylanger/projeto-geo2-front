import { Gateway } from './gateway';

export class EndDevice {
    constructor(
        public id: number,
        public identificador: string,
        public theGeom: Object,
        public gateway: Gateway,
        public x: number,
        public y: number
       ) {  }
}
