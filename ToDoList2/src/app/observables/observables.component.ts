import { Component,OnDestroy,OnInit } from '@angular/core';
import { interval, Observable, Subscription, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.scss'
})
// export class ObservablesComponent implements OnInit {
//   myfirstObservable: Observable<number> | undefined;

//   ngOnInit(): void {


//     let variable1 = 1;

//     interval(1000).subscribe((value: number) => {
//       variable1 = variable1++;
//       console.log(`Interval emitted value: ${value}, variable1: ${variable1}`);
//     });

    // this.myfirstObservable = 
    // new Observable<number>((value) => {
    //   console.log('observable emmiting 10')
    //   value.next(10);
    //   console.log('observable emmiting 20')
    //   value.next(20)
    //   console.log('observable emmiting 30')
      // value.next(30)

      // console.log('observable emmiting error')
      // value.error(new Error('Something went wrong'));


    //   console.log('observable completing')
    //   value.complete();
    // }).subscribe({
    //   next: (value: number) => {
    //     console.log(`subscriber received value: ${value}`);
      
    //   },

    //   error:(err: any) => {
    //     console.error(`subscriber received error: ${err.message}`);
    //   },

//by the complete method its good practice to put any clean up or finalization code here
    //   complete: () => {
    //     console.log('subscriber r');
    //   }
    // });

//     this.myfirstObservable.subscribe({
//       next: (value: number) => {
//         console.log(`subscriber received value: ${value}`);
      
//       },

//       error:(err: any) => {
//         console.error(`subscriber received error: ${err.message}`);
//       },

// //by the complete method its good practice to put any clean up or finalization code here
//       complete: () => {
//         console.log('subscriber r');
//       }
// //     });
//   }


// }

export class ObservablesComponent implements OnInit, OnDestroy {
  myNumbersObservable !:Observable <number>;

emmitedNumbers: number[]= [];
currentStatus: string = 'idle';
poetentialError: string | null = null;

private mySubscription: Subscription | undefined;


ngOnInit(): void {
  console.log('ngOnInit called setting up observable');
  this.resetObservable()
}
 resetObservable(): void {
  if(this.mySubscription){
    this.mySubscription.unsubscribe();
    console.log('Unsubscribed from previous observable to prepare for reset');
  }
this.emmitedNumbers=[];
  this.currentStatus = 'idle';
  this.poetentialError = null;



  // created a new observable here 
  this.myNumbersObservable = new Observable<number>(subscriber => { 
console.log('Observable created, starting to emit numbers');
  setTimeout(() => {
        console.log('Observable: Emitting value 10');
        subscriber.next(10); 
      }, 1000); 

      setTimeout(()=>{
        console.log('Observable: Emitting value 20');
        subscriber.next(20);
      }, 2000);

      setTimeout(() => {
        console.log('Observable: Emitting value 30');
        subscriber.next(30);
      }, 3000);

      // Simulate an error after 3.5 seconds the observable will emit an error instead of completeing 
      // setTimeout(() => {
      //   console.log('observable: Emitting an error')
      //   subscriber.error(new Error('Something went wrong!'));
      // }, 3500);                                                  // uncomment this to test the error handling

      setTimeout(() => {
        console.log('Observable: Completing the stream');
        subscriber.complete();
      }, 4000); //we have this here to signal that its finished 

  });
 console.log ('observable has been defined and is ready to be subscribed to');
}
startObservable(): void {
  this.resetObservable();
  this.currentStatus = 'Active';
  console.log ('Attempting to subscribe to myNumbersObservable now...');


  this.mySubscription = this.myNumbersObservable.subscribe({
    next: (value: number) => {
      console.log(`Subscriber received value: ${value}`);
      this.emmitedNumbers.push(value);
    },
    error: (err: Error) => {
      console.error(`Subscriber received error: ${err.message}`);
      this.poetentialError = err.message;
      this.currentStatus = 'Error';
    },
    complete: () => {
      console.log('Subscriber received completion notification');
      this.currentStatus = 'Completed';
    }
  });
  console.log('Subscription to myNumbersObservable started');
}
ngOnDestroy(): void {
  if(this.mySubscription) {
    this.mySubscription.unsubscribe();
    console.log('Unsubscribed from myNumbersObservable to prevent memory leaks');
  }
}
}
