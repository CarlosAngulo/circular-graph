import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'load-data',
    templateUrl: './load-data.component.html',
    styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent {
    @Output() onTextChange = new EventEmitter<string>();
    @Input() text = '';
    
    constructor() {}

    sendText(content: string): void {
        const text = content.trim();
        if (text === '') {
            console.error('El texto ingresado puede estar vacío');
            return;
        }
        this.onTextChange.next(text);
    }
}