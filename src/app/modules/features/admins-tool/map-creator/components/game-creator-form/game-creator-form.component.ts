import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-creator-form',
  templateUrl: './game-creator-form.component.html',
  styleUrls: ['./game-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCreatorFormComponent implements OnInit {
  ngOnInit(): void {}
}
