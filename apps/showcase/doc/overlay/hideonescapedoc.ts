import { Component } from '@angular/core';

@Component({
    selector: 'hide-on-escape-doc',
    standalone: false,
    template: ` <app-docsectiontext>
        <p>The <i>hideOnEscape</i> determines to hide the overlay when escape key pressed. Accepts boolean, default value is <i>false</i>.</p>
    </app-docsectiontext>`
})
export class HideOnEscapeDoc {}
