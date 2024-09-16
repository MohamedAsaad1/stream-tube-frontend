import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { themeChange } from 'theme-change';
import { SharedModule } from '../shared/shared.module';
import { GlobalValuesService } from '../shared/globalValues/global-values.service';
// import { UserMenuComponent } from '../user-menu/user-menu.component';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SharedModule,
    MatIconModule,
    // UserMenuComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  theme!: string;
  hidden = true;
  userMenuOpen = false;
  openSpeech: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private globalValues: GlobalValuesService
  ) {}

  @ViewChild('themeCheckbox') themeCheckbox!: ElementRef;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      themeChange();
    }
  }

  toggleSidebar() {
    this.globalValues.changeSideBarState();
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!this.isHiddenElement(targetElement)) {
      this.hidden = true;
    }
    if (!this.isUserMenuOpen(targetElement)) {
      this.userMenuOpen = false;
    }
  }
  private isHiddenElement(targetElement: HTMLElement): boolean {
    const menuElement = document.querySelector('.create') as HTMLElement;
    return menuElement.contains(targetElement);
  }
  private isUserMenuOpen(targetElement: HTMLElement): boolean {
    const userMenuIcon = document.querySelector('.avatar') as HTMLElement;
    const userMenu = document.querySelector('.user-menu') as HTMLElement;
    return (
      userMenuIcon.contains(targetElement) || userMenu.contains(targetElement)
    );
  }
  openListeningDilog() {
    this.openSpeech = true;
  }
}
