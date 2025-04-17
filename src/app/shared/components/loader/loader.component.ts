import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FadeInOut } from '@styles/animations/fade.animation';
import { LoaderService } from 'app/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  animations: [FadeInOut],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
