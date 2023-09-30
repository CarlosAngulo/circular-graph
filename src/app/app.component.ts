import { Component, OnInit } from '@angular/core';

export interface INodes {
  name: string;
  relations: string[];
  position?: { x: number, y: number };
  edges?: { x: number, y: number, width: number, height: number, M: string, center: string, end: string }[];
  relationPos?: { x: number, y: number }[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  nodes!: INodes[];
  radius = 200;
  offset = 0;
  size = 80;
  padding = 20;
  data: INodes[] = [
    { name: 'A', relations: ['B', 'C'] },
    { name: 'B', relations: [] },
    { name: 'C', relations: ['F', 'D'] },
    { name: 'D', relations: ['B'] },
    { name: 'E', relations: ['A', 'C'] },
    { name: 'F', relations: ['E', 'B'] },
    { name: 'G', relations: ['C', 'H'] },
    { name: 'H', relations: ['C', 'D'] },
    { name: 'I', relations: ['E', 'D'] },
    { name: 'J', relations: ['E', 'D'] },
    { name: 'K', relations: ['M', 'O', 'P'] },
    { name: 'L', relations: ['O', 'V'] },
    { name: 'M', relations: ['A', 'U'] },
    { name: 'N', relations: ['R'] },
    { name: 'O', relations: ['Q', 'F'] },
    { name: 'P', relations: ['E', 'B'] },
    { name: 'Q', relations: ['G', 'S'] },
    { name: 'R', relations: ['G', 'C'] },
    { name: 'S', relations: ['I', 'D'] },
    { name: 'T', relations: ['U', 'N'] },
    { name: 'U', relations: ['H', 'S'] },
    { name: 'V', relations: ['D', 'J'] }
  ];

  ngOnInit(): void {
    if (this.data.length > 10) {
      this.radius += (this.data.length - 10) * 20;
    }
    this.offset = this.radius + this.size / 2 + this.padding;
    this.nodes = 
    this.calculateEdges(
      this.positionRelations(
        this.positionNodes(this.data, this.radius, this.offset)
      ), this.offset
    );

    console.log(this.nodes)
  }

  calculateEdges(nodes: INodes[], offset: number): INodes[] {
    return nodes.map((node) => {
      return {
        ...node,
        edges: node.relationPos?.map((relation) => {
          const x = Math.min((node.position?.x || 0), relation.x, offset);
          const y =  Math.min((node.position?.y || 0), relation.y, offset);
          const width = Math.max((node.position?.x || 0), relation.x, offset) - x;
          const height = Math.max((node.position?.y || 0), relation.y, offset) - y;
          return {
            x: Math.round(x),
            y: Math.round(y),
            width: Math.round(width),
            height: Math.round(height),
            M: `${(node.position?.x || 0) - x} ${(node.position?.y || 0) - y}`,
            center: `${width / 2} ${height / 2}`,
            end: `${relation.x - x} ${relation.y - y}`
          }
        })
      }
    })
  }

  positionRelations(nodes: INodes[]): INodes[] {
    return nodes.map((node) => {
      return {
        ...node,
        relationPos: node.relations.map(relation => ({
          x: nodes.find((item) => item.name == relation)?.position?.x || 0,
          y: nodes.find((item) => item.name == relation)?.position?.y || 0
        }))
      }
    });
  }

  positionNodes(nodes: INodes[], radius: number, offset: number): INodes[] {
    if (nodes.length === 1) {
      radius = 0;
    }

    return nodes.map((node, index) => {
      const angle: number = (index * 2 * Math.PI) / nodes.length;
      const sin = index == nodes.length / 2 ? 0 : Math.sin(angle);
      return {
        ...node,
        position: {
          x: (radius * Math.cos(angle)) + offset,
          y: (radius * sin) + offset
        }
      }
    });
  }
}
