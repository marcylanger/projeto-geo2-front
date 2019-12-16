import { Polygon } from './polygon';

export class AreaProdutiva {
    constructor(
        public id: number,
        public nome: string,
        public descricao: string, 
        public theGeom: Object,
        public x: number[],
        public y: number[]
       ) {  }
}
