import { Injectable } from "@angular/core";
import { Todos } from "./todos.model";
import { from, Observable } from "rxjs";


export type image = {
   value: string,
   viewValue: string
    }
    
  

@Injectable({
    providedIn: 'root',
})
export class StaticDataSource {
    private todos: Todos[] =[
        new Todos(1, "Make apple cider donuts", "2022-07-27", "2022-07-30", "00.jpg", "food is the key to healthy living",
        "Feeding the world in the decades leading up to 2050—decades that will see an increase in food demand spurred by population and income growth and stronger impacts of climate change on agriculture—will require increased and more sustainable agricultural production. ",
        "Pending", "Food and Drinks" ),

        new Todos(2, "Visit a winery", "2022-08-27", "2022-08-30", "01.jpg", "To travel is to learn",
        "Traveling fosters a medium to build human connections with one another by learning about culture, food, new sites, music, and the way people live their day to day lives in different parts of the world. It's the best on-site learning a person can get. The internet can only explain so much about a place. ",
        "Pending", "Travel" ),

        new Todos(3, "Curl up with a book for an afternoon of reading", "2022-07-27", "2022-08-30", "02.jpg", "Readers are leaders",
        "Reading is important because it makes you more empathetic, knowledgeable and stimulates your imagination. A study conducted by the University of Sussex showed that reading reduces stress by 68%. It helps in reducing tension and relaxing muscles which in turn helps people sleep better and stay healthy. ",
        "In progress", "Learning" ),
        new Todos(4, "Share with team members", "2022-08-27", "2022-08-30", "03.jpg", "To gain more knowledge you must share knowledge",
        "Sharing knowledge helps them connect, perform better, and become stronger as professionals. Some examples of advantages of knowledge sharing for your organization is that you can save money on training, and capture and keep know-how, even if one day employees decide to work somewhere else. ",
        "Completed", "Travel" ),



    ];

    images : image[] = [
     { value:'03.jpg', viewValue: 'Woman power'},
      {value: '00.jpg', viewValue: 'Inspiration'},
      {value: '01.jpg', viewValue: 'Family'},
      {value: '02.jpg', viewValue: 'Investment'},
      {value: '04.jpg', viewValue: 'Vaction'},
      {value: '05.jpg', viewValue: 'Study time'},
      {value: '06.jpg', viewValue: 'Nature at its best'},
      {value: '07.jpg', viewValue: 'Foodie'},
      {value: '08.jpg', viewValue: 'Space'},
      {value: '09.jpg', viewValue: 'Hard work'}
      
    ];
 

    getTodos(): Observable<Todos[]> {
        return from([this.todos]);
    }

    getImages(): Observable<image[]> {
      return from([this.images]);
  }
}