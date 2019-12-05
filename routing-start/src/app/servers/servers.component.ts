import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // 여기서 router는 현재 경로를 알지 못한다. 따라서 /를 붙이던 안붙이던 ... localhost/servers (절대경로)
    // 옵션으로 relativeTo에 this.route를 해주면 현재경로에다가 servers경로를 추가한 경로로 이동시켜준다! 즉, localhost/servers/servers (상대경로)
    this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
