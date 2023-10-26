import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input()
  public name: string = '';

  @Input()
  public width!: number;
  
  @Input()
  public height!: number;

  public imageURL: string = environment.imagePath;
}
