import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from "@angular/core";

@Component({
    selector: 'app-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class SidePanelComponent {

    @Input() isLeft: boolean = true;
    private isHidden = false;
    @Output() hide = new EventEmitter<boolean>()

    constructor(
    ) {
    }

    public hidePanel() {
        this.isHidden = !this.isHidden;
        this.hide.emit(this.isHidden);
    }

  }