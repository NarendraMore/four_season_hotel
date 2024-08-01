import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navData: any = [];
  activePanel: string | null = null;
  activeMenu: string | null = null;
  isSidebarCollapsed: boolean = false;

  dashboard: string = '/dashboard';
  person: string = '/person'
  luggage: string = '/luggage'
  vehicle: string = '/vehicle'
  constructor(private router: Router) { }
  ngOnInit() {
    // this.navData = [
    //   {
    //     routeLink: "dashboard",
    //   },

    // ]
    this.router.events.subscribe(event => {
      // console.log('event', event);

      if (event instanceof NavigationEnd) {
        this.setActiveMenu(event.url);
      }
    });
    // this.setActiveMenu();


  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  togglePanel(panel: string): void {
    // console.log('panel', panel);
    this.activePanel = this.activePanel === panel ? null : panel;
    $('.panel').not(`.${panel}`).removeClass('active');

  }
  setActiveMenu(url: any) {
    const currentRoute = url;
    if (currentRoute.includes('dashboard')) {
      this.activeMenu = 'total'
    } else if (currentRoute.includes('person')) {
      this.activeMenu = 'person';
    } else if (currentRoute.includes('vehicle')) {
      this.activeMenu = 'vehicle';
    } else if (currentRoute.includes('luggage')) {
      this.activeMenu = 'luggage';
    } else if (currentRoute.includes('object')) {
      this.activeMenu = 'object';
    } else if (currentRoute.includes('fire')) {
      this.activeMenu = 'fire';
    } else if (currentRoute.includes('smoke')) {
      this.activeMenu = 'smoke';
    }
  }

  displayMenu(menuName: string) {
    if (menuName == 'person') {
      this.activeMenu = this.activeMenu === menuName ? null : menuName;
    } else if (menuName == 'vehicle') {
      this.activeMenu = this.activeMenu === menuName ? null : menuName;
    } else if (menuName == 'luggage') {
      this.activeMenu = this.activeMenu === menuName ? null : menuName;
    }
  }
  logOut(){
    this.router.navigate(['/'])
  }
}
