import { Component } from '@angular/core';
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
  sidebarActive = false;
  lshFlag = false;
  rshFlag = false;
  totalFlag = true;
  dashboard: string = '/dashboard';
  person: string = '/person'
  luggage: string = '/luggage'
  vehicle: string = '/vehicle'
  constructor() { }
  ngOnInit() {
    // this.navData = [
    //   {
    //     routeLink: "dashboard",
    //   },

    // ]

  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  togglePanel(panel: string): void {
    this.activePanel = this.activePanel === panel ? null : panel;
    $('.panel').not(`.${panel}`).removeClass('active');
  }

  displayMenu(menuName: string) {
    //   if (menuName == 'rsh') {
    //     this.activeMenu = this.activeMenu === menuName ? null : menuName;

    //     this.lshFlag = false;
    //     this.rshFlag = true ;
    //     this.totalFlag =false;
    //   } else if (menuName == 'lsh') {
    //     this.activeMenu = this.activeMenu === menuName ? null : menuName;

    //     this.lshFlag = true;
    //     this.rshFlag = false;
    //     this.totalFlag =false;
    //   } else if(menuName == 'total'){
    //     this.activeMenu = this.activeMenu === menuName ? null : menuName;

    //     this.lshFlag = false;
    //     this.rshFlag = false;
    //     this.totalFlag =true
    //   }
  }
}
