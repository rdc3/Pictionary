import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { DataStoreService } from './../../services/data-store.service';
import { GameService } from './../../services/game.service';
import { GameInfo, GameState } from './../../types/types';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent implements OnInit {

  displayForm = true;
  displayResetButton = false;
  isModerator = false;
  constructor(private gameService: GameService, private dStoreS: DataStoreService, private auth: AuthService) {
    this.dStoreS.gameInfo$.subscribe(
      (gameInfo: GameInfo) => {
        this.displayForm = (gameInfo.gameState < GameState._3_playing);
        this.displayResetButton = (gameInfo.gameState > GameState._1_init && this.displayForm);
      },
      (err) => this.auth.analyzeError(err)
    );
    this.dStoreS.player$.subscribe(player => {
      this.isModerator = player.isModerator;
    });
  }
  ngOnInit() {
  }
  resetGame() {
    this.gameService.resetGame();
  }

}
