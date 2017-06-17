import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hh',
  templateUrl: './hh.component.html'
})
export class HhComponent implements OnInit {

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  routeModules(navigateTo: string) : void{
    switch(navigateTo){
      case 'Tasks':{
        this.router.navigate(['task'], { relativeTo: this.activeRoute });
        break;
      }
      case 'Expense':{
        this.router.navigate(['expense'], { relativeTo: this.activeRoute });
        break;
      }
      default: {
        this.router.navigate(['task'], { relativeTo: this.activeRoute });
        break;
      }
    }
  }
  
  ngOnInit() {
  }

}
