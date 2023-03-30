import { Observable, of, interval, take } from "rxjs";

const observer = {
  next: (x) => {
    console.log("x: ", x);
  },
  complete: () => {
    console.log("complete");
  },
  error: (err) => {
    console.log("err: ", err.message);
  },
};

// of(1, "tata", { a: 45 }).subscribe(observer);

const startWith = (nbr) => (obs) => {
  return new Observable((subscriber) => {
    subscriber.next(nbr);
    const subscription = obs.subscribe(subscriber);

    return () => {
      subscription.unsubscribe();
    };
  });
};

interval(1000).pipe(startWith(12), take(10)).subscribe(observer);
