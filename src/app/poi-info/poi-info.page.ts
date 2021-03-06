import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';
import { ApiService } from '../services/api.service';
import * as L from 'leaflet';
//imports for showing leaflet marker
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";
export class PoiInfo {
  poiID: any;
  latitude: any;
  longitude: any;
}

@Component({
  selector: 'app-poi-info',
  templateUrl: './poi-info.page.html',
  styleUrls: ['./poi-info.page.scss'],
})
export class POIInfoPage implements OnInit {
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10
  };

  public poi: PoiInfo[] = [];
  public poiData: any[];
  public index: any;

  public poiInfo: any;
  image: any;
  id: string;
  data: any;
  checkdata: any;
  map: L.Map;
  fields: any;
  baseUrl="http://127.0.0.1:3000";
  nodata: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _poiService: PoiService
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.index = this.router.getCurrentNavigation().extras.state.index;
        }
      })
     }

  ngOnInit() {

    let result = Object.values(this.index);
    // store data for id , coordinate x and 
    this.poiInfo = {
      "lat": result[0],
      "lng": result[1]
      
    }

   this._poiService.getPoibyCoordinate(this.poiInfo).subscribe((res: any) => {
     console.log(res);
    if (res === ""){
      this.nodata = true;
      this.data = "";
    }
    this.checkdata = true;
    this.data = res;
    this.id = this.data.id
    this.fields = this.data.fields;
    this.image = this.data.image_pois[0]["image"]["url"]
    console.log(this.image)
    this.map = L.map('map', {
      center: [this.data.poi_latitude, this.data.poi_longitude],
      zoom: 18,
      renderer: L.canvas
    })

    var layer = L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
      maxNativeZoom: 18,
      minNativeZoom: 18,
     });
    layer.addTo(this.map);

    var marker = L.marker([this.data.poi_latitude, this.data.poi_longitude])
    .bindPopup('Place you search is here')
    .openPopup();
    marker.addTo(this.map);
    });


 


  }

  buttonEdit() {
    //Go to page poi based on ID of each marker
    let navigationExtra: NavigationExtras = {
      state: {
        index: this.index
      }
    }   

    this.router.navigate(['/poi-edit'], navigationExtra);
  }

  buttonReport(id) {
    console.log(id);
    this.router.navigate(['/poi-report',id]);
  }

  buttonHistory(id){
    console.log(id);
    this.router.navigate(['/history',id]);
  }
}
